import { 
  users, 
  accounts, 
  transactions, 
  admins,
  type User, 
  type InsertUser,
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
    const user1 = await this.createUser({
      username: "john.anderson",
      email: "john.anderson@email.com",
      password: "password123",
      firstName: "John",
      lastName: "Anderson",
      phone: "(555) 123-4567",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isActive: true,
    });

    const user2 = await this.createUser({
      username: "sarah.mitchell",
      email: "sarah.mitchell@email.com",
      password: "password123",
      firstName: "Sarah",
      lastName: "Mitchell",
      phone: "(555) 234-5678",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      isActive: true,
    });

    const user3 = await this.createUser({
      username: "david.chen",
      email: "david.chen@email.com",
      password: "password123",
      firstName: "David",
      lastName: "Chen",
      phone: "(555) 345-6789",
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      isActive: true,
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

export const storage = new MemStorage();
