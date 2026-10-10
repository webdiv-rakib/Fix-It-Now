# FixItNow 🔧
> **"Your Trusted Home Service Platform"** — A scalable, RESTful multi-role home services marketplace backend built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

---

## 📖 Overview

**FixItNow** powers a full-featured on-demand service marketplace connecting homeowners with skilled service professionals. The platform supports complete customer booking lifecycles, technician job management, Stripe checkout workflows, verified rating/review aggregation, and administrative moderation.

---

## 🛠️ Tech Stack

- **Runtime & Language:** Node.js, TypeScript
- **Web Framework:** Express.js
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Authentication & Security:** JWT (JSON Web Tokens), bcryptjs, CORS
- **Payment Gateway:** Stripe API (Checkout Sessions & Webhook/Verification)
- **Validation & Handling:** Zod / Custom validators, global async error middleware

---

## 🚀 Key Features

### 1. Multi-Role RBAC (Role-Based Access Control)
- **Customer:** Search & filter services, book appointments, make payments, track status, and write reviews.
- **Technician:** Manage public profiles, set pricing/availability, accept or decline jobs, and advance job stages.
- **Admin:** Platform-wide oversight of users, bookings, and service categories.

### 2. State Machine Booking Lifecycle
Bookings transition through a strict, validated workflow:
$$\text{REQUESTED} \longrightarrow \text{ACCEPTED} \longrightarrow \text{PAID} \longrightarrow \text{IN\_PROGRESS} \longrightarrow \text{COMPLETED}$$
*(Customers retain cancellation rights at any point before `IN_PROGRESS`).*

### 3. Stripe Checkout Integration
- Generates hosted Stripe Checkout sessions for accepted bookings.
- Atomic updates transition payment status (`PENDING` $\rightarrow$ `COMPLETED`) and booking status upon verification.

### 4. Verified Reviews & Rating Aggregation
- Customers can submit reviews only for `COMPLETED` bookings.
- Auto-calculates aggregate average ratings and review counts for technician profiles inside Prisma transactions.

---

## 📂 Project Structure

```text
src/
├── app.ts                  # Express application setup & middleware
├── server.ts               # Server bootstrapping & port listener
├── lib/
│   ├── prisma.ts           # Prisma client singleton instance
│   └── stripe.ts           # Stripe SDK configuration
├── middlewares/
│   ├── auth.ts             # JWT authentication & role-based guard
│   └── globalErrorHandler.ts
├── modules/
│   ├── Admin/              # Admin users, categories & booking oversight
│   ├── Auth/               # Registration, login & profile lookup
│   ├── Booking/            # Booking management & status workflow
│   ├── Category/           # Service category operations
│   ├── Payment/            # Stripe session creation & confirmation
│   ├── Review/             # Review creation & rating aggregation
│   ├── Service/            # Public service catalog with search/filter
│   └── Technician/         # Technician discovery & profile management
├── routes/
│   └── index.ts            # Central route dispatcher
└── utils/
    ├── catchAsync.ts       # Async error wrapper
    └── sendResponse.ts     # Standardized JSON response handler

⚙️ Environment Variables
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/fixitnow_db?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
JWT_EXPIRES_IN="7d"
STRIPE_SECRET_KEY="sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CLIENT_URL="http://localhost:3000"

📦 Installation & Setup
1. git clone [https://github.com/your-username/fix-it-now-backend.git](https://github.com/your-username/fix-it-now-backend.git)
cd fix-it-now-backend

2. npm install

3. npx prisma migrate dev --name init
    npx prisma generate

4. npm run dev

5. npm run build
npm start