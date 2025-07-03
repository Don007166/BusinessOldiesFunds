export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Account {
  id: number;
  userId: number;
  accountNumber: string;
  accountIdDisplay?: string;
  accountType: string;
  balance: string;
  status: string;
  createdAt: Date;
  transactions?: Transaction[];
}

export interface Transaction {
  id: number;
  accountId: number;
  type: string;
  amount: string;
  description?: string;
  timestamp: Date;
}

export interface Admin {
  id: number;
  username: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalCustomers: number;
  activeAccounts: number;
  totalDeposits: number;
  creditCards: number;
  totalBalance: number;
}

export interface AccountTypes {
  checking: number;
  savings: number;
  business: number;
  loan: number;
}
