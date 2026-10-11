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

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user (`CUSTOMER`, `TECHNICIAN`) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current authenticated user profile |

---

### 🔍 Services & Technicians (Public)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/services` | Public | Filter services by `type`, `location`, `rating` |
| `GET` | `/api/services/:id` | Public | Get single service details |
| `GET` | `/api/technicians` | Public | Filter technicians by `skills`, `location`, `rating` |
| `GET` | `/api/technicians/:id` | Public | View technician profile and recent reviews |
| `GET` | `/api/categories` | Public | View all service categories |

---

### 📅 Bookings (`/api/bookings`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings` | Customer | Create a new service booking |
| `GET` | `/api/bookings` | Customer | Get customer's booking history |
| `GET` | `/api/bookings/:id` | Customer / Tech | Get detailed view of a specific booking |
| `PUT` | `/api/bookings/cancel/:id` | Customer | Cancel pending booking (before `IN_PROGRESS`) |
| `GET` | `/api/bookings/technician-bookings` | Technician | View assigned jobs |
| `PUT` | `/api/bookings/update-booking-status/:id` | Technician | Update status (`ACCEPTED`, `IN_PROGRESS`, `COMPLETED`) |

---

### 💳 Payments (`/api/payments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create` | Customer | Generate Stripe checkout session for accepted job |
| `POST` | `/api/payments/confirm` | Customer | Verify completed Stripe session & advance status |
| `GET` | `/api/payments` | Customer | Get customer payment history |
| `GET` | `/api/payments/:id` | Customer / Admin | Get specific payment transaction receipt |

---

### ⭐ Reviews (`/api/reviews`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reviews` | Customer | Review a completed booking (1–5 rating + comment) |
| `GET` | `/api/reviews/technician/:id` | Public | Fetch all reviews and aggregate score for a technician |

---

### 🛡️ Admin Moderation (`/api/admin`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | Admin | Get list of all registered platform users |
| `PATCH` | `/api/admin/users/:id` | Admin | Update user account status (ban / unban) |
| `GET` | `/api/admin/bookings` | Admin | Get all platform bookings with status filters |
| `GET` | `/api/admin/categories` | Admin | List all categories |
| `POST` | `/api/admin/categories` | Admin | Create a new service category |