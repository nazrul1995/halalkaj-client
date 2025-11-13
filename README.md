🌐 HalalKaj

A full-stack freelance marketplace web application where users can explore, add, update, delete, and accept freelance jobs or tasks.
The platform allows authenticated users to manage their own job postings while also taking on others’ jobs — creating a dynamic, user-friendly, and halal freelancing ecosystem.

🚀 Live Links

🔗 Client (Frontend): https://helpful-dodol-b8038d.netlify.app/

🔗 Server (Backend): https://halalkaj-server.vercel.app/allJobs

🧩 Project Overview

HalalKaj demonstrates full-stack web development skills by integrating modern frontend, backend, and database technologies into a cohesive freelancing platform.

🧱 Tech Stack Overview

Frontend: React.js + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB Atlas

Authentication: Firebase Authentication

Data Fetching: Axios / TanStack Query

UI Enhancements: React Toastify, Framer Motion

Hosting: Netlify (Client) & Vercel (Server)

✨ Core Features

🔐 User Authentication (Firebase) – Login, Register, and Google Sign-In integrated.

🧑‍💻 Job Management (CRUD) – Add, Read, Update, and Delete jobs with image URLs.

🤝 Accept Jobs – Users can accept jobs posted by others.

🚫 Restriction Logic – Users cannot accept their own posted jobs.

🌗 Dark / Light Theme Toggle – Switch between two elegant UI themes.

⚡ Fully Responsive – Optimized for desktop, tablet, and mobile devices.

🎨 Dynamic Home Page – Displays the latest 6 jobs dynamically fetched from MongoDB.

🔍 Sorting & Filtering – Sort jobs based on posted date or category.

🔔 Custom Toast Notifications – Smooth feedback for success and error actions.

🧭 Private Routes – Secure routes for adding, updating, and viewing accepted jobs.

❌ Custom 404 Page – Friendly error page for invalid routes.

🧠 Technologies Used
Category	Tools / Libraries
Frontend	React.js, React Router, Tailwind CSS, Axios / TanStack Query, Framer Motion
Backend	Node.js, Express.js
Database	MongoDB Atlas
Authentication	Firebase Auth
Notifications	React Toastify / React Hot Toast
Hosting	Netlify (Client) & Vercel (Server)
🗂️ Folder Structure
HalalKaj/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── hooks/
│   ├── .env               # Firebase keys (hidden)
│   ├── package.json
│
└── server/                # Express Backend
    ├── index.js
    ├── routes/
    ├── models/
    ├── controllers/
    ├── .env               # MongoDB credentials (hidden)
    └── package.json

⚙️ Environment Variables

Both Firebase config and MongoDB credentials are hidden in .env files.

🖥️ Client (.env.local)
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

🌐 Server (.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

🧭 Main Routes Overview
Route	Description	Access
/	Home Page (Banner + Latest Jobs)	Public
/allJobs	All Jobs with Sort/Filter	Public
/addJob	Add New Job	Private
/myAddedJobs	View User’s Added Jobs	Private
/updateJob/:id	Update Existing Job	Private
/allJobs/:id	View Job Details	Private
/my-accepted-tasks	View Accepted Jobs	Private
/login / /register	User Authentication Pages	Public
📱 Responsiveness

The HalalKaj website is fully responsive and optimized for:

✅ Mobile Devices (≤480px)

✅ Tablets (≤768px)

✅ Desktops (≥1024px)

💡 Additional Functionalities

⏳ Real-time loading spinners during data fetch.

🚫 Prevents users from accepting their own jobs.

🕹️ Smooth animations with Framer Motion / GSAP.

🗓️ Sort and filter jobs by posted date.

🔔 Toast-based notifications for all CRUD actions.

🔒 Protected Routes

Accessible only to authenticated users:

/addJob  
/myAddedJobs  
/updateJob/:id  
/allJobs/:id  
/my-accepted-tasks

🧾 Commit Requirements

✅ Client-Side: Minimum 15 meaningful commits
✅ Server-Side: Minimum 8 meaningful commits

Each commit represents a distinct improvement — CRUD logic, UI updates, animations, or authentication enhancements.

👨‍💻 Developer Info

👤 Name: Independent Nazrul
📧 Email: independentnazrul@gmail.com

🌍 GitHub: Your GitHub Profile

🏁 Conclusion

HalalKaj is a complete MERN + Firebase based freelance marketplace that showcases professional full-stack capabilities — combining a beautiful frontend, secure backend, and smooth user experience.
It’s designed to promote a clean, responsive, and halal way of freelancing, empowering users to collaborate efficiently and ethically.