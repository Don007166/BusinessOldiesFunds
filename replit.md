# Bank of Finance - Business Oldies Funds

## Overview

Business Oldies Funds (BOF) is a full-stack banking application built with modern web technologies. The application provides both customer-facing banking services and administrative management capabilities. It features a React frontend with TypeScript, Express.js backend, and PostgreSQL database with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom BOF brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions for authentication
- **Development**: Hot reload with Vite integration
- **Build System**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Migrations**: Drizzle Kit for schema management
- **Session Store**: PostgreSQL session storage with connect-pg-simple
- **Development Storage**: In-memory storage implementation for development

## Key Components

### Authentication System
- **User Authentication**: Session-based authentication for customers
- **Admin Authentication**: Separate admin login system
- **Session Management**: Secure session handling with configurable secrets
- **Route Protection**: Client-side route guards for authenticated areas

### Database Schema
- **Users**: Customer information with profile data
- **Accounts**: Bank accounts linked to users with different types (checking, savings, credit, loan)
- **Transactions**: Financial transaction records with type and amount tracking
- **Admins**: Administrative user management

### UI Component System
- **Design System**: Complete shadcn/ui implementation with BOF brand theming
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Interactive Elements**: Modals, forms, navigation, and data tables

## Data Flow

1. **Client Requests**: React frontend makes API calls through TanStack Query
2. **Server Processing**: Express.js routes handle business logic and data validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with proper error handling
5. **State Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL hosting
- **Radix UI**: Headless UI component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: TypeScript-first schema validation

### Development Tools
- **Replit Integration**: Cartographer plugin for Replit environment
- **Error Handling**: Runtime error overlay for development
- **Type Safety**: Comprehensive TypeScript configuration

## Deployment Strategy

### Development
- **Hot Reload**: Vite development server with Express integration
- **Error Handling**: Comprehensive error boundaries and logging
- **Session Storage**: In-memory storage for development testing

### Production
- **Build Process**: Vite builds frontend, ESBuild bundles backend
- **Static Assets**: Frontend served from Express static middleware
- **Database**: PostgreSQL with connection pooling
- **Session Persistence**: Database-backed session storage

### Environment Configuration
- **Database URL**: PostgreSQL connection string
- **Session Secret**: Configurable session encryption key
- **Node Environment**: Development/production mode switching

## Changelog
```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Updated contact information throughout the application:
  - Support agent: Smith
  - Email: smithwilliams@oldiesfoundation.info
  - Address: Business Oldies Funds, 7720 Collins Street, Melbourne VIC 3000, Australia
  - Created professional contact modal for better user experience
- June 30, 2025. Added total balance display to admin dashboard:
  - Shows $100,000,000.00 as requested
  - Displays prominently in admin stats section
  - Formatted with proper currency display
- July 3, 2025. Migration from Replit Agent to Replit environment:
  - Set up PostgreSQL database with proper environment variables
  - Created admin user with credentials: Double0Seven!! / James007!!
  - Created Kelly Ann James user with custom ID KJ470021
  - Added business checking (****7854) and savings (****9326) accounts
  - Enhanced admin functionality with comprehensive navigation
  - Fixed all 404 navigation issues with proper button handlers
  - Verified credit functionality works immediately (tested $5000 credit)
  - Added AdminNavigation component for consistent admin interface
  - All features are now fully functional and tested
- July 3, 2025. Final enhancements and bug fixes:
  - Updated Kelly Ann James profile with complete Australian details:
    * Email: seantellelopez@gmail.com
    * Date of Birth: 21/03/1978
    * Address: 58 Benjamina Drive, Redbank Plains, Queensland 4301
    * Custom License ID: KJ470021
  - Enhanced business debit card functionality:
    * Card number: ****5847
    * Cardholder name: KELLY ANN JAMES
    * Expiry: 08/2029, CVV: 247
    * Fixed API field mapping from snake_case to camelCase
  - Improved customer details page:
    * Replaced placeholder with Australian flag profile picture
    * Changed Customer ID display from "2" to "99201"
    * Enhanced UI with premium banking aesthetics
    * Added comprehensive customer overview with card display
  - Complete admin interface refinement:
    * Professional banking vibes throughout
    * Enhanced navigation and user experience
    * All functionality tested and verified working
- July 4, 2025. Comprehensive transaction history implementation:
  - Generated realistic banking transaction history from 2020 to present
  - Added 5-15 transactions per month with authentic merchant names
  - Included multiple transaction types: card purchases, transfers, ATM withdrawals, direct deposits, online payments, bill payments
  - Created transaction reference numbers with proper formatting
  - Added comprehensive transaction history page (/transactions) with:
    * Advanced filtering by transaction type, account, date range
    * Search functionality for merchants and descriptions
    * Pagination for large transaction volumes
    * Transaction summary statistics
    * Professional banking UI with transaction icons and colors
  - Enhanced user dashboard with "View All History" button
  - Created separate API endpoints: /api/user/dashboard (recent) and /api/dashboard (complete history)
  - All transaction data includes realistic amounts, timestamps, and merchant information
- July 9, 2025. Replit Agent to Replit environment migration:
  - Successfully migrated from Replit Agent to standard Replit environment
  - Fixed Account ID display to show unique identifiers (7854 for business, 9326 for savings)
  - Enhanced cache invalidation system for real-time balance updates
  - Updated business checking account balance to $410,750.00 after admin credits ($235,000 credit applied)
  - Created additional savings card for Kelly Ann James:
    * Card number: ****9326 (matching savings account ID)
    * Purple-indigo gradient design with tree/growth symbol
    * SVGSK badge for savings card vs CHKDB for business debit
    * Expiry: 12/2028, CVV: 582
  - Fixed admin customer details page to show full Account IDs for administrative access
  - All banking functionality verified and working correctly
- July 10, 2025. Complete lending products implementation:
  - Created dedicated pages for all lending products: Home Loans, Auto Loans, Personal Loans, Credit Cards
  - Each page includes comprehensive application forms with proper field validation
  - Professional banking UI with hero sections, feature highlights, and rate displays
  - Success confirmation pages with next steps information
  - Updated footer navigation to properly link to all lending products
  - Connected home page auto loan section buttons to the dedicated auto loans page
  - All lending product pages fully functional with form submission and confirmation flows
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```