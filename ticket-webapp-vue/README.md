<!-- ```markdown -->
# 🎟️ Ticket Management Web App (Vue Version)

## 🧩 Overview
This is the **Vue.js implementation** of the Multi-Framework Ticket Management Web App.  
It mirrors the React version in layout, functionality, and user flow — built using **Vue 3** and **Vue Router**.

---

## 🌟 Features
✅ **Landing Page**
- SVG wavy hero section and decorative circles  
- Buttons: “Login” and “Get Started”  
- Fully responsive grid and consistent footer  

✅ **Authentication**
- Login and Signup forms with validation  
- Error messages and toast notifications  
- Simulated authentication via `localStorage` (`ticketapp_session`)  
- Redirects to dashboard after login  

✅ **Dashboard**
- Displays total, open, in-progress, and closed tickets  
- Navigation to Ticket Manager  
- Logout clears session  

✅ **Ticket Manager (CRUD)**
- Add, edit, delete, and list tickets  
- Validates required fields  
- Uses localStorage for persistence  
- Color codes:
  - 🟩 Open → Green
  - 🟨 In Progress → Amber
  - ⬜ Closed → Gray  

✅ **Security & Validation**
- Redirect unauthorized users to login  
- Inline and toast feedback for validation  

---

## 🧱 Project Structure

ticket-webapp-vue/
├── src/
│ ├── assets/
│ ├── components/
│ ├── views/
│ ├── router/
│ └── main.js
└── public/


---

## ⚙️ Technologies Used
- **Vue 3**
- **Vue Router**
- **CSS3 (Flexbox & Grid)**

---

## 🚀 Setup Instructions
```bash
git clone https://github.com/yourusername/ticket-webapp-vue.git
cd ticket-webapp-vue
npm install
npm run dev

Visit → http://localhost:5173

👥 Test User

Email: user@example.com
Password: password123

🧾 Notes

CRUD and authentication handled with localStorage

Routing handled via vue-router

Same design language as React version

📚 Accessibility

Semantic structure, clear focus indicators, color contrast maintained