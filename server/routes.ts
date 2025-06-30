import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userLoginSchema, adminLoginSchema } from "@shared/schema";
import session from "express-session";

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

  const httpServer = createServer(app);
  return httpServer;
}
