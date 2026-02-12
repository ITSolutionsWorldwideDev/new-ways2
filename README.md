# g-rollz
# 🛒 **G-rollz | Ecommerce Platform (Turborepo + Next.js)**

A modern, full-featured eCommerce web application built with **Next.js**, featuring product listings, cart functionality, authentication, and secure checkout.


---

## 🚀 Live Demo

👉 **Website:** https://www.g-rollz.nl/

---

## 📌 **Features**

- 🏠 Homepage with featured products
- 🔍 Product search and filtering
- 📄 Dynamic product pages
- 🛒 Shopping cart functionality
- ❤️ Wishlist support
- 🔐 User authentication (Login / Register)
- 💳 Secure checkout integration (Stripe/PayPal)
- 📦 Order management
- ⚡ Server-side rendering (SSR) & Static site generation (SSG)

### 🛍 **Website**
- 🧭 Modern, SEO-optimized storefront built with Next.js App Router  
- ⚡ High-performance product browsing and search  
- 🛒 Cart & checkout flows  
- 🌐 Internationalization (i18n)  
- 📱 Fully responsive UI with Tailwind CSS  

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Frontend:** React, Tailwind CSS / CSS Modules
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js / JWT
- **Payments:** Stripe API
- **State Management:** Redux Toolkit / Context API

- **TypeScript** | Type-safe development |
- **Tailwind CSS** | Styling |
- **React Query / SWR** | Data fetching |
- **Zustand / Redux** | State management |

---

## 📂 Project Structure

```
├── components/      # Reusable UI components
├── app/             # Next.js pages & API routes
│   ├── api/         # Backend API routes
├── public/          # Static assets
├── styles/          # Global styles
├── lib/             # Utility functions
├── models/          # Database models
└── README.md
```

---


## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/new-ways/g-rollz.git
cd g-rollz
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Create environment variables

Create a `.env.local` file in the root directory:

```
NODE_ENV=development
CLERK_SECRET_KEY=your_secret_key

# ORACLE NETSUITE CREDENTIALS

NS_ACCOUNT_ID=
NS_CONSUMER_KEY=
NS_CONSUMER_SECRET=
NS_TOKEN_ID=
NS_TOKEN_SECRET=


# VIVA CREDENTIALS

VIVA_SMART_CLIENT_ID=
VIVA_SMART_CLIENT_SECRET=
VIVA_MERCHANT_ID=
VIVA_API_KEY=
VIVA_SOURCE_CODE = 

NEXT_PUBLIC_BASE_URL = http://localhost:3000

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=


EMAIL_FROM=
RESET_PASSWORD_URL=http://localhost:3000/reset-password

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_RESET_SECRET=
JWT_RESET_EXPIRES_IN=

POSTGRES_URL=
PRISMA_DATABASE_URL=
DATABASE_URL2=your_database_url
DATABASE_URL=your_database_url

```

### 4️⃣ Run the development server

```bash
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Testing

```bash
npm run test
```

---

## 🌍 Deployment

You can deploy easily on:

- **Vercel** (Recommended for Next.js)

For Vercel deployment:

```bash
vercel
```

---

## 📌 Future Improvements

- Admin dashboard
- Product reviews & ratings
- Multi-vendor support
- Inventory management
- Internationalization (i18n)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---