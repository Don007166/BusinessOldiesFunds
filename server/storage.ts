// Clean storage implementation for Replit environment
// This replaces the original storage.ts with memory-only storage to avoid database dependencies

export { storage, type IStorage } from './storage-mem';