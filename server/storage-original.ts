import { 
  users, 
  accounts, 
  transactions, 
  admins,
  type User, 
  type InsertUser,
  type UserSignup,
  type Account,
  type InsertAccount,
  type Transaction,
  type InsertTransaction,
  type Admin,
  type InsertAdmin
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account>;
  private transactions: Map<number, Transaction>;
  private admins: Map<number, Admin>;
  private currentUserId: number;
  private currentAccountId: number;
  private currentTransactionId: number;
  private currentAdminId: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.transactions = new Map();
    this.admins = new Map();
    this.currentUserId = 1;
    this.currentAccountId = 1;
    this.currentTransactionId = 1;
    this.currentAdminId = 1;

    // Initialize admin user
    this.createAdmin({
      username: "Double0Seven!!",
      password: "James007!!",
      isActive: true,
    });

    // Initialize some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create sample users
    const user1 = await this.registerUser({
      username: "john.anderson",
      email: "john.anderson@email.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "John",
      lastName: "Anderson",
      dateOfBirth: "1985-06-15",
      phone: "(555) 123-4567",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      driversLicenseNumber: "D123456789",
      driversLicenseExpiry: "2028-06-15",
      driversLicenseState: "NY",
    });

    const user2 = await this.registerUser({
      username: "sarah.mitchell",
      email: "sarah.mitchell@email.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "Sarah",
      lastName: "Mitchell",
      dateOfBirth: "1990-03-22",
      phone: "(555) 234-5678",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      driversLicenseNumber: "D987654321",
      driversLicenseExpiry: "2027-03-22",
      driversLicenseState: "CA",
    });

    const user3 = await this.registerUser({
      username: "david.chen",
      email: "david.chen@email.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "David",
      lastName: "Chen",
      dateOfBirth: "1988-11-05",
      phone: "(555) 345-6789",
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      driversLicenseNumber: "D456789123",
      driversLicenseExpiry: "2029-11-05",
      driversLicenseState: "IL",
    });

    // Create sample accounts
    const account1 = await this.createAccount({
      userId: user1.id,
      accountNumber: "****1234",
      accountType: "checking",
      balance: "5250.75",
      status: "active",
    });

    const account2 = await this.createAccount({
      userId: user1.id,
      accountNumber: "****1235",
      accountType: "savings",
      balance: "12500.00",
      status: "active",
    });

    const account3 = await this.createAccount({
      userId: user2.id,
      accountNumber: "****5678",
      accountType: "checking",
      balance: "3750.25",
      status: "active",
    });

    const account4 = await this.createAccount({
      userId: user3.id,
      accountNumber: "****9012",
      accountType: "checking",
      balance: "8900.50",
      status: "active",
    });

    // Create sample transactions
    await this.createTransaction({
      accountId: account1.id,
      type: "deposit",
      amount: "2500.00",
      description: "Salary deposit",
    });

    await this.createTransaction({
      accountId: account1.id,
      type: "withdrawal",
      amount: "150.00",
      description: "ATM withdrawal",
    });

    await this.createTransaction({
      accountId: account2.id,
      type: "deposit",
      amount: "5000.00",
      description: "Transfer from checking",
    });
  }

  // User operations
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
      createdAt: new Date(),
      isActive: insertUser.isActive ?? true
    };
    this.users.set(id, user);
    return user;
  }

  async registerUser(signupData: UserSignup): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id,
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      dateOfBirth: signupData.dateOfBirth,
      phone: signupData.phone,
      address: signupData.address,
      city: signupData.city,
      state: signupData.state,
      zipCode: signupData.zipCode,
      driversLicenseNumber: signupData.driversLicenseNumber,
      driversLicenseExpiry: signupData.driversLicenseExpiry,
      driversLicenseState: signupData.driversLicenseState,
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

  // Account operations
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

  // Transaction operations
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
      timestamp: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  // Admin operations
  async getAdmin(id: number): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const admin: Admin = { ...insertAdmin, id };
    this.admins.set(id, admin);
    return admin;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async registerUser(signupData: UserSignup): Promise<User> {
    // Remove confirmPassword from the data before inserting
    const { confirmPassword, ...userData } = signupData;
    
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userUpdate)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getAccount(id: number): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
    return account || undefined;
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return await db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async getAccountByNumber(accountNumber: string): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.accountNumber, accountNumber));
    return account || undefined;
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const [account] = await db
      .insert(accounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  async updateAccount(id: number, accountUpdate: Partial<InsertAccount>): Promise<Account | undefined> {
    const [account] = await db
      .update(accounts)
      .set(accountUpdate)
      .where(eq(accounts.id, id))
      .returning();
    return account || undefined;
  }

  async getAllAccounts(): Promise<Account[]> {
    return await db.select().from(accounts);
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.accountId, accountId));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(insertTransaction)
      .returning();
    return transaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions);
  }

  async getAdmin(id: number): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin || undefined;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db
      .insert(admins)
      .values(insertAdmin)
      .returning();
    return admin;
  }
}

// Clean export for Replit environment - no database dependencies
export { storage, type IStorage } from './storage-mem';
