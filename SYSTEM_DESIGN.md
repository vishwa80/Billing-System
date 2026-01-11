# 🏗️ System Design

## Summary
A professional, green-themed billing and inventory management dashboard for Mangalam Hardware. Features a robust credit/debt tracking system, PDF invoice generation, and a streamlined billing interface.

## 🔐 Authentication Decision
- **Needs Auth:** Yes ✅
- **Reasoning:** This is a financial application managing sales, customer debts, and business revenue. Access must be restricted to authorized personnel to protect sensitive financial data and prevent unauthorized record modification.

## 🎲 Design DNA
- **Seed:** mangalam-hardware
- **Layout:** Sidebar + Content with a fixed Dark Green top header bar as specifically requested.
- **Color Mood:** Professional Hardware Store Green
- **Primary Color:** #22B21F
- **Color Palette:** #711F73, #89208B, #1FAF9E, #1F83B5, #1F41BA
- **Animation:** Professional, crisp transitions. Rows fade in, modals slide up.

## Key Features
- Dark green professional header with branding
- Dynamic billing table with Green headers
- Automated GST and Subtotal calculations
- Customer Credit/Debt (Udhaar) tracking system
- One-click PDF Invoice generation (Print view)
- Real-time customer search and management
- Responsive dashboard layout

## Models
📦 **User** → `src/models/User.ts`
   Fields: email: String, password: String, role: String
📦 **Customer** → `src/models/Customer.ts`
   Fields: name: String, mobile: String, totalCredit: Number, totalPaid: Number
📦 **Bill** → `src/models/Bill.ts`
   Fields: billNo: String, customerId: ObjectId, customerName: String, customerMobile: String, items: Array, subtotal: Number, gst: Number, total: Number, paidAmount: Number, balance: Number, status: String

## API Routes
🔗 **GET** `/api/bills` → `src/app/api/bills/route.ts`
   Fetches all bills with pagination and sorting
🔗 **POST** `/api/bills` → `src/app/api/bills/route.ts`
   Creates a new bill and updates customer credit balance automatically
🔗 **GET** `/api/customers` → `src/app/api/customers/route.ts`
   Searches customers and retrieves credit info
🔗 **PUT** `/api/customers` → `src/app/api/customers/route.ts`
   Updates customer debt/payment status

## Pages
📄 `/` → `src/app/page.tsx` 🌐 Public
   Landing/Login page for the hardware shop staff
📄 `/dashboard` → `src/app/dashboard/page.tsx` 🔒 **PROTECTED** (user only)
   Main Billing Dashboard with the requested Green Table and Bill List
   ⚠️ **MUST WRAP WITH AUTH CHECK**: Redirect to /login if not authenticated
   🔗 **MUST FETCH FROM**: /api/bills, /api/stats
   ⚡ **MUST IMPLEMENT CRUD**: READ (forms, modals, buttons)
📄 `/bills/create` → `src/app/bills/create/page.tsx` 🔒 **PROTECTED** (user only)
   Form to create a new bill with items and calculations
   ⚠️ **MUST WRAP WITH AUTH CHECK**: Redirect to /login if not authenticated
   🔗 **MUST FETCH FROM**: /api/bills, /api/customers
   ⚡ **MUST IMPLEMENT CRUD**: CREATE (forms, modals, buttons)
📄 `/bills/[id]/print` → `src/app/bills/[id]/print/page.tsx` 🔒 **PROTECTED** (user only)
   Print-optimized Invoice View (PDF generation target)
   ⚠️ **MUST WRAP WITH AUTH CHECK**: Redirect to /login if not authenticated
   🔗 **MUST FETCH FROM**: /api/bills
   ⚡ **MUST IMPLEMENT CRUD**: READ (forms, modals, buttons)
📄 `/customers` → `src/app/customers/page.tsx` 🔒 **PROTECTED** (user only)
   Customer credit management interface
   ⚠️ **MUST WRAP WITH AUTH CHECK**: Redirect to /login if not authenticated
   🔗 **MUST FETCH FROM**: /api/customers
   ⚡ **MUST IMPLEMENT CRUD**: READ, UPDATE (forms, modals, buttons)

## 🔐 Authentication System (AI-Decided)
- **AuthProvider:** `src/contexts/AuthContext.tsx`
- **useAuth Hook:** `src/hooks/useAuth.ts`
- **Protected Wrapper:** `src/components/ProtectedRoute.tsx`
- **Middleware:** `src/middleware.ts`

⚠️ **IMPORTANT**: All protected pages (marked with 🔒) MUST:
1. Import useAuth hook and check authentication state
2. Redirect to /login if user is not authenticated
3. Show loading state while checking auth
4. Check user role if requiredRole is specified

## Components
🧩 **Header** → `src/components/Header.tsx`
   The specific dark-green header requested: 'Mangalam Hardware – Billing Dashboard'
🧩 **BillingTable** → `src/components/BillingTable.tsx`
   The main table with Green headers showing Bill No, Customer, Mobile, Subtotal, GST, Total, Invoice
🧩 **CreditStatusBadge** → `src/components/CreditStatusBadge.tsx`
   Visual indicator for Paid vs Credit bills

## 🎨 Layout Approach
Sidebar + Content with a fixed Dark Green top header bar as specifically requested.

## 🎯 UI Building Prompt
A clean, data-dense interface using a 'Mangalam Green' theme. The top navigation bar is a solid dark green (#1B5E20) with white text. Data tables feature emerald green headers (#2E7D32) with white text and alternating row colors (white/gray-50). Buttons are vibrant green (#22B21F) with shadow-sm hover:shadow-md. Cards have rounded-lg corners and subtle shadow-md. Inputs are crisp with green focus rings.

## 🏠 Landing Page Content Areas (2 areas)
1. **Hero Login**
   Secure login area with hardware shop branding
2. **Features Grid**
   Quick overview of system capabilities (Billing, Inventory, Credit)
