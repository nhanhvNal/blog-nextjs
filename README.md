# 📝 Blog Next.js

A modern blog application built with [Next.js](https://nextjs.org/), featuring authentication, server-rendered content, and optimized user experience using powerful tools like Tailwind CSS, NextAuth.js, and Server Actions.

## 🚀 Features

- 📰 Static blog listing with SSG (Static Site Generation)
- 📄 Blog post detail rendered with SSR (Server-Side Rendering)
- 🔒 Authentication with Google and Email (NextAuth.js)
- 🧠 User dashboard with Server Actions
- ✍️ Create, edit, and delete blog posts
- 🔗 Seamless navigation using `next/link`
- 🖼️ Optimized images via `next/image`
- 🚫 Middleware to restrict dashboard access if not logged in
- 🔍 SEO optimized with meta tags, Open Graph support, and web vitals
- ❌ Custom 404 page

## 🛠️ Tech Stack

- **Next.js** – React framework for building fullstack apps
- **TypeScript** – Strongly typed JavaScript
- **Tailwind CSS** – Utility-first styling
- **NextAuth.js** – Authentication and session management

## ⚙️ Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/nhanhvNal/blog-nextjs.git
cd blog-nextjs
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file and add the required environment variables:

```env
NEXTAUTH_SECRET=your_secret
DATABASE_URL=your_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 📦 Useful Scripts

```bash
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

> Made with ❤️ by [@nhanhvNal](https://github.com/nhanhvNal)
