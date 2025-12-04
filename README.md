# Frontend Technical Assessment | Help Study Abroad | Admin Dashboard

A modern admin dashboard built with Next.js and React, featuring authentication, user management, and product management capabilities powered by the DummyJSON API.

## 🚀 Tech Stack

- **Next.js** - App Router with client components
- **React** - Latest React features
- **Material UI (MUI)** - Comprehensive UI component library
- **Zustand** - Lightweight state management
- **DummyJSON API** - RESTful API for authentication and data

## ✨ Features

### Authentication
- Secure login system using DummyJSON `/auth/login` endpoint
- Access token and user information stored in Zustand auth store
- Token persistence via localStorage with automatic reload on app start
- Smart root route redirects:
  - Authenticated users → `/dashboard`
  - Unauthenticated users → `/login`

### Protected Routes
- Custom `ProtectedRoute` wrapper component
- Authentication check using Zustand state
- Guards for all admin pages:
  - `/dashboard` - Admin dashboard home
  - `/users` - Users list view
  - `/users/[id]` - Individual user details
  - `/products` - Products list view
  - `/products/[id]` - Individual product details

### Users Management
- **List View**: Fetch users with `GET /users?limit=10&skip=0`
- **Search**: Real-time search using `GET /users/search?q=...`
- **Pagination**: Server-side pagination with `limit` and `skip` parameters
- **Responsive Table**: Displays name, email, gender, phone, and company information
- **Detail View**: Single user page with comprehensive data from `GET /users/{id}`

### Products Management
- **List View**: Fetch products with `GET /products?limit=10&skip=0`
- **Search**: Search functionality using `GET /products/search?q=...`
- **Category Filter**: Filter by category using:
  - `GET /products/categories` - Get all categories
  - `GET /products/category/{category}` - Filter by specific category
- **Pagination**: Server-side pagination support
- **Card Layout**: Beautiful card grid showing image, title, price, category, and rating
- **Detail View**: Comprehensive product page with images, description, brand, stock, and rating from `GET /products/{id}`

## 🗂️ State Management (Zustand)

### Why Zustand?
- **Minimal Bundle Size**: Very small API and bundle footprint
- **Simple Async Actions**: Clean async operations without middleware
- **Less Boilerplate**: Easier than Redux for small to medium dashboards
- **Perfect Fit**: Ideal for applications with a few state slices


## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with MUI ThemeProvider
│   ├── page.js                # Root route with redirect logic
│   ├── (auth)/
│   │   └── login/
│   │       └── page.js        # Login page
│   └── (protected)/
│       ├── dashboard/
│       │   └── page.js        # Admin dashboard home
│       ├── users/
│       │   ├── page.js        # Users list
│       │   └── [id]/
│       │       └── page.js    # Single user details
│       └── products/
│           ├── page.js        # Products list
│           └── [id]/
│               └── page.js    # Single product details
├── components/
│   └── ProtectedRoute.js      # Authentication guard component
├── store/
│   ├── authStore.js           # Authentication state
│   ├── usersStore.js          # Users management state
│   └── productsStore.js       # Products management state
└── app/
    └── globals.css            # Global styles
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url> help-study-abroad

# Navigate to project directory
cd help-study-abroad

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will run on `http://localhost:3000` (or your configured port).

## 🔐 Test Credentials

Use DummyJSON's built-in test users:

**Primary Test User:**
- Username: `emilys`
- Password: `emilyspass`

## ⚙️ Environment Variables

This project uses the public DummyJSON API directly from the client, so no private environment variables are required. The base URL `https://dummyjson.com` is configured in the code.



## 🎨 Performance & Responsiveness

- **Responsive Design**: MUI Grid, Container, and Box components ensure proper layouts across all device sizes
- **Optimized Rendering**: React hooks like `useCallback` and `useMemo` minimize unnecessary re-renders

## 📝 How to Run for Evaluation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

4. **Login:**
   You'll be redirected to `/login`. Use credentials: `emilys` / `emilyspass`

5. **Test Features:**
   - **Dashboard**: View the admin home page
   - **Users**: Test search, pagination, and view individual user details
   - **Products**: Test search, category filters, pagination, and product detail pages

