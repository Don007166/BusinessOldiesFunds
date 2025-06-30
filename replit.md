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
  - Address: 8666 Nolan Loop, Belton Texas 76513
  - Created professional contact modal for better user experience
- June 30, 2025. Added total balance display to admin dashboard:
  - Shows $100,000,000.00 as requested
  - Displays prominently in admin stats section
  - Formatted with proper currency display
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```