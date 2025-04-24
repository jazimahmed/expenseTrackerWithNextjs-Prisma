# 📊 Expense Tracker App (Nextjs & Prisma)

## 📸 Screenshots

![Dashboard Screenshot](https://i.ibb.co/k6W9bvCj/app-dash-2.png)
![Mobile View or Second Screenshot](https://i.ibb.co/GQnBWLFK/image.png)

---


A full-stack MERN application to track daily, monthly, and categorized expenses. The app supports currency conversion, filtering, authentication(Nextauth), and detailed analytics with a modern UI.

---

## 🚀 Features

- ✅ User registration and login (sesson based)
- ✅ Add, edit, and delete expenses
- ✅ Filter expenses by category, date range
- ✅ Currency conversion (INR, LKR, USD, and more)
- ✅ Monthly expense summary with year/month selector
- ✅ Responsive UI with Tailwind CSS
- ✅ Redux Toolkit for global state management
- ✅ Protected routes and session based access
- ✅ Dark mode UI (tailwind-based)
- ✅ csv Download option
- ✅ Smooth scrollable dropdowns for long currency lists
- ✅ Loading indicators and user-friendly messages

---

---

## 🛠️ Tech Stack

- **Frontend && Backend** Nextjs, Tailwind CSS, Redux Toolkit
- **Database:** MongoDB with prisma
- **Auth:** nextauth
- **Other:** Axios, dotenv, bcrypt, Nextauth, recharts, toastify etc

---

## 🧑‍💻 Getting Started

### 1. **Clone the repo**

```bash
git clone https://github.com/jazimahmed/expenseTrackerWithNextjs-Prisma.git
cd expenseTrackerWithNextjs-Prisma
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```
### 3. **Setup Environment Variables**
Add the following in `.env` (env should under root folder):

```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```
### 4. **Setup Prisma**

```bash
npx prisma generate
npx prisma db push
```
### 5. **run the app**

```bash
npm run dev
# or
yarn dev
```
### 6. **open the browser**

```bash
Go to: http://localhost:3000
```



---

## 🙌 Author

**Jazim Ahmed**  
📧 mohamedjazim800@gmail.com  
🔗 [GitHub](https://github.com/jazimahmed)

---

## ⭐ Give a Star!

If you found this helpful or interesting, feel free to star the repo ✨
