import { 
  type User, 
  type InsertUser,
  type UserSignup,
  type Account,
  type InsertAccount,
  type Transaction,
  type InsertTransaction,
  type Admin,
  type InsertAdmin,
  type Card,
  type InsertCard
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  registerUser(signupData: UserSignup): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Account operations
  getAccount(id: number): Promise<Account | undefined>;
  getAccountsByUserId(userId: number): Promise<Account[]>;
  getAccountByNumber(accountNumber: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: number, account: Partial<InsertAccount>): Promise<Account | undefined>;
  getAllAccounts(): Promise<Account[]>;

  // Transaction operations
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByAccountId(accountId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getAllTransactions(): Promise<Transaction[]>;

  // Admin operations
  getAdmin(id: number): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  // Card operations
  getCard(id: number): Promise<Card | undefined>;
  getCardsByUserId(userId: number): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  updateCard(id: number, card: Partial<InsertCard>): Promise<Card | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account>;
  private transactions: Map<number, Transaction>;
  private admins: Map<number, Admin>;
  private cards: Map<number, Card>;
  private currentUserId: number;
  private currentAccountId: number;
  private currentTransactionId: number;
  private currentAdminId: number;
  private currentCardId: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.transactions = new Map();
    this.admins = new Map();
    this.cards = new Map();
    this.currentUserId = 1;
    this.currentAccountId = 1;
    this.currentTransactionId = 1;
    this.currentAdminId = 1;
    this.currentCardId = 1;
    this.initializeSampleData();
  }

  private generateTransactionHistory() {
    const merchants = [
      "WALMART SUPERCENTER", "AMAZON.COM", "TARGET STORE", "STARBUCKS", "SHELL GAS STATION",
      "MCDONALD'S", "COSTCO WHOLESALE", "HOME DEPOT", "CVS PHARMACY", "GROCERY OUTLET",
      "NETFLIX.COM", "SPOTIFY", "APPLE ITUNES", "MICROSOFT", "ADOBE SYSTEMS",
      "UBER TRIP", "LYFT RIDE", "AIRBNB", "HOTELS.COM", "BOOKING.COM",
      "BEST BUY", "GAMESTOP", "VICTORIA'S SECRET", "H&M", "ZARA",
      "CHIPOTLE MEXICAN", "TACO BELL", "SUBWAY", "DOMINO'S PIZZA", "KFC",
      "EXXON MOBIL", "CHEVRON", "BP GAS STATION", "TEXACO", "CIRCLE K",
      "WALGREENS", "RITE AID", "WHOLE FOODS", "TRADER JOE'S", "SAFEWAY",
      "FEDEX OFFICE", "UPS STORE", "USPS", "DHL EXPRESS", "AMAZON DELIVERY",
      "VERIZON WIRELESS", "AT&T", "T-MOBILE", "COMCAST", "SPECTRUM",
      "ELECTRIC COMPANY", "WATER DEPARTMENT", "GAS UTILITY", "INTERNET PROVIDER",
      "MORTGAGE PAYMENT", "CAR PAYMENT", "INSURANCE PREMIUM", "CREDIT CARD PAYMENT"
    ];

    const transactionTypes = [
      { type: "card_purchase", prefix: "CARD PURCHASE" },
      { type: "transfer", prefix: "TRANSFER" },
      { type: "atm_withdrawal", prefix: "ATM WITHDRAWAL" },
      { type: "direct_deposit", prefix: "DIRECT DEPOSIT" },
      { type: "online_payment", prefix: "ONLINE PAYMENT" },
      { type: "bill_payment", prefix: "BILL PAYMENT" },
      { type: "check_deposit", prefix: "CHECK DEPOSIT" }
    ];

    let transactionId = 1;
    const startDate = new Date('2020-01-01');
    const endDate = new Date();
    
    // Generate transactions for both accounts
    [1, 2].forEach(accountId => {
      let currentDate = new Date(startDate);
      let runningBalance = accountId === 1 ? 50000 : 30000; // Starting balances
      
      while (currentDate <= endDate) {
        // Generate 5-15 transactions per month
        const transactionsThisMonth = Math.floor(Math.random() * 11) + 5;
        
        for (let i = 0; i < transactionsThisMonth; i++) {
          const randomDay = Math.floor(Math.random() * 28) + 1;
          const transactionDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), randomDay);
          
          if (transactionDate > endDate) break;
          
          const transactionTypeData = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
          const merchant = merchants[Math.floor(Math.random() * merchants.length)];
          
          let amount: number;
          let type: string;
          let description: string;
          
          // Generate realistic transaction amounts and descriptions
          if (transactionTypeData.type === "atm_withdrawal") {
            amount = Math.floor(Math.random() * 400) + 20; // $20-$420
            type = "withdrawal";
            description = `${transactionTypeData.prefix} - REF:${this.generateReference()}`;
          } else if (transactionTypeData.type === "direct_deposit") {
            amount = Math.floor(Math.random() * 3000) + 1500; // $1500-$4500
            type = "deposit";
            description = `${transactionTypeData.prefix} - SALARY - REF:${this.generateReference()}`;
            runningBalance += amount;
          } else if (transactionTypeData.type === "card_purchase") {
            amount = Math.floor(Math.random() * 300) + 5; // $5-$305
            type = "withdrawal";
            description = `${transactionTypeData.prefix} - ${merchant} - REF:${this.generateReference()}`;
          } else if (transactionTypeData.type === "transfer") {
            amount = Math.floor(Math.random() * 1000) + 50; // $50-$1050
            type = Math.random() > 0.5 ? "deposit" : "withdrawal";
            description = `${transactionTypeData.prefix} - ${type === "deposit" ? "FROM" : "TO"} ACCOUNT - REF:${this.generateReference()}`;
            if (type === "deposit") runningBalance += amount;
          } else {
            amount = Math.floor(Math.random() * 200) + 10; // $10-$210
            type = "withdrawal";
            description = `${transactionTypeData.prefix} - ${merchant} - REF:${this.generateReference()}`;
          }
          
          if (type === "withdrawal") {
            runningBalance -= amount;
          }
          
          // Ensure balance doesn't go negative
          if (runningBalance < 0) {
            runningBalance += amount;
            continue;
          }
          
          const transaction: Transaction = {
            id: transactionId++,
            accountId: accountId,
            type: type as "deposit" | "withdrawal",
            amount: amount.toFixed(2),
            description: description,
            timestamp: new Date(transactionDate)
          };
          
          this.transactions.set(transaction.id, transaction);
        }
        
        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });
  }

  private generateReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async initializeSampleData() {
    // Create admin user
    const admin: Admin = {
      id: 1,
      username: "Double0Seven!!",
      password: "James007!!", // In real app, this would be hashed
      isActive: true
    };
    this.admins.set(1, admin);
    this.currentAdminId = 2;

    // Create sample user - Kelly Ann James
    const sampleUser: User = {
      id: 2,
      username: "kellyjames",
      email: "seantellelopez@gmail.com",
      password: "password123", // In real app, this would be hashed
      firstName: "Kelly Ann",
      lastName: "James",
      dateOfBirth: "1978-03-21",
      phone: "+61 123 456 789",
      address: "58 Benjamina Drive",
      city: "Redbank Plains",
      state: "Queensland",
      zipCode: "4301",
      country: "Australia",
      driversLicenseNumber: "KJ470021",
      driversLicenseExpiry: "2029-03-21",
      driversLicenseState: "Queensland",
      isActive: true,
      createdAt: new Date('2024-01-15')
    };
    this.users.set(2, sampleUser);
    this.currentUserId = 3;

    // Create sample accounts for Kelly Ann James
    const businessAccount: Account = {
      id: 1,
      userId: 2,
      accountNumber: "301847562983741",
      accountIdDisplay: "****7854",
      accountType: "business",
      balance: "410750.00",
      status: "active",
      createdAt: new Date('2024-01-15')
    };
    this.accounts.set(1, businessAccount);

    const savingsAccount: Account = {
      id: 2,
      userId: 2,
      accountNumber: "507291648357962",
      accountIdDisplay: "****9326",
      accountType: "savings",
      balance: "89340.00",
      status: "active",
      createdAt: new Date('2024-01-15')
    };
    this.accounts.set(2, savingsAccount);
    this.currentAccountId = 3;

    // Generate comprehensive transaction history from 2020 to present
    this.generateTransactionHistory();
    this.currentTransactionId = this.transactions.size + 1;

    // Create sample cards for Kelly Ann James
    const businessCard: Card = {
      id: 1,
      userId: 2,
      cardType: "debit",
      cardNumber: "5847",
      cardHolderName: "KELLY ANN JAMES",
      expiryMonth: "08",
      expiryYear: "2029",
      cvv: "247",
      status: "active",
      appliedAt: new Date('2024-01-15'),
      issuedAt: new Date('2024-01-20')
    };
    this.cards.set(1, businessCard);

    const savingsCard: Card = {
      id: 2,
      userId: 2,
      cardType: "savings",
      cardNumber: "9326",
      cardHolderName: "KELLY ANN JAMES",
      expiryMonth: "12",
      expiryYear: "2028",
      cvv: "582",
      status: "active",
      appliedAt: new Date('2024-02-01'),
      issuedAt: new Date('2024-02-05')
    };
    this.cards.set(2, savingsCard);
    this.currentCardId = 3;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isActive: insertUser.isActive ?? true,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async registerUser(signupData: UserSignup): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...signupData, 
      id, 
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      dateOfBirth: "",
      driversLicenseNumber: "",
      driversLicenseExpiry: "",
      driversLicenseState: "",
      isActive: true,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(account => account.userId === userId);
  }

  async getAccountByNumber(accountNumber: string): Promise<Account | undefined> {
    return Array.from(this.accounts.values()).find(account => account.accountNumber === accountNumber);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = this.currentAccountId++;
    const account: Account = { 
      ...insertAccount, 
      id, 
      accountIdDisplay: insertAccount.accountIdDisplay ?? null,
      balance: insertAccount.balance ?? null,
      status: insertAccount.status ?? null,
      createdAt: new Date()
    };
    this.accounts.set(id, account);
    return account;
  }

  async updateAccount(id: number, accountUpdate: Partial<InsertAccount>): Promise<Account | undefined> {
    const account = this.accounts.get(id);
    if (!account) return undefined;
    
    const updatedAccount = { ...account, ...accountUpdate };
    this.accounts.set(id, updatedAccount);
    return updatedAccount;
  }

  async getAllAccounts(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(transaction => transaction.accountId === accountId);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      description: insertTransaction.description ?? null,
      timestamp: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getAdmin(id: number): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const admin: Admin = { 
      ...insertAdmin, 
      id,
      isActive: insertAdmin.isActive ?? null
    };
    this.admins.set(id, admin);
    return admin;
  }

  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async getCardsByUserId(userId: number): Promise<Card[]> {
    return Array.from(this.cards.values()).filter(card => card.userId === userId);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const card: Card = {
      ...insertCard,
      id,
      status: insertCard.status || "processing",
      appliedAt: new Date(),
      issuedAt: insertCard.status === "active" ? new Date() : null
    };
    this.cards.set(id, card);
    return card;
  }

  async updateCard(id: number, cardUpdate: Partial<InsertCard>): Promise<Card | undefined> {
    const card = this.cards.get(id);
    if (!card) return undefined;
    
    const updatedCard = { ...card, ...cardUpdate };
    this.cards.set(id, updatedCard);
    return updatedCard;
  }
}

export const storage = new MemStorage();