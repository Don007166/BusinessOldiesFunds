import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  driversLicenseNumber: text("drivers_license_number").notNull(),
  driversLicenseExpiry: text("drivers_license_expiry").notNull(),
  driversLicenseState: text("drivers_license_state").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  accountNumber: text("account_number").notNull().unique(),
  accountType: text("account_type").notNull(), // checking, savings, credit, loan
  balance: decimal("balance", { precision: 12, scale: 2 }).default("0.00"),
  status: text("status").default("active"), // active, closed, suspended
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id").references(() => accounts.id).notNull(),
  type: text("type").notNull(), // deposit, withdrawal, transfer, payment
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isActive: boolean("is_active").default(true),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  cardType: text("card_type").notNull(), // 'debit' or 'credit'
  status: text("status").notNull().default("processing"), // 'processing', 'approved', 'declined'
  appliedAt: timestamp("applied_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
});

export const userSignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  driversLicenseNumber: z.string().min(1, "Driver's license number is required"),
  driversLicenseExpiry: z.string().min(1, "Driver's license expiry is required"),
  driversLicenseState: z.string().min(1, "Driver's license state is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const userLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

export const insertCardSchema = createInsertSchema(cards).omit({
  id: true,
  appliedAt: true,
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = z.infer<typeof insertCardSchema>;
