# 🎓 LearnPro — EdTech Dashboard (Frontend)

> A modern, responsive EdTech dashboard built with **React**, featuring authentication, course enrollment, progress tracking, dark mode, and comprehensive user profiles.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Google_Analytics-GA4-E37400?logo=google-analytics" />
  <img src="https://img.shields.io/badge/Sentry-Monitoring-362D59?logo=sentry" />
  <img src="https://img.shields.io/badge/Status-Live-success" />
</p>

---

## 🌐 Live Demo

🔗 **Live URL:** [https://edtech-dashboard-frontend.vercel.app/](https://edtech-dashboard-frontend.vercel.app/)

🎥 **Demo Video:** [Watch on Google Drive](https://drive.google.com/file/d/1iYq5c36Uf5TnRDTsTJKlU4racMxGCuRc/view?usp=sharing)

---

## 🚀 Features

### 🔐 Authentication & User Management
* ✅ **Signup / Login / Logout**: Secure user authentication
* 👤 **User Profile Management**: Edit and view personal information
* 🔒 **Protected Routes**: Redirect to login with memory of intended destination
* 💾 **LocalStorage Persistence**: Seamless session management

### 📚 Course Management
* 🔍 **Course Browsing**: Advanced search and filtering capabilities
* 🎯 **Course Enrollment**: Easy one-click enrollment system
* 📊 **Progress Tracking**: Per-user course completion tracking
* 📈 **Learning Dashboard**: Personalized learning statistics and insights

### 🎨 User Experience
* 🌙 **Dark Mode**: Global dark/light theme toggle
* 🔔 **Toast Notifications**: Real-time feedback with react-hot-toast
* ⏳ **Skeleton Loaders**: Beautiful loading states for better UX
* 📱 **Responsive UI**: Fully optimized for all devices
* ⚡ **Performance-Optimized**: Lazy-loaded images and optimized DOM

### 📊 Analytics & Monitoring
* 📈 **Google Analytics (GA4)**: Comprehensive user behavior tracking
* 🛡️ **Sentry Frontend**: Production crash monitoring and error tracking
* 🔍 **Real-time Insights**: User engagement and performance metrics

---

## 🛠️ Tech Stack

### **Frontend Framework**
* ⚛️ **React 18**: Modern React with hooks
* 🛣️ **React Router v6**: Client-side routing
* 🎨 **Tailwind CSS**: Utility-first styling framework

### **State & Storage**
* 💾 **LocalStorage**: Client-side data persistence
* 🔄 **React State**: Component-level state management

### **UI & Notifications**
* 🔔 **react-hot-toast**: Toast notifications
* 🎭 **Custom Components**: Reusable UI components
* 🖼️ **Lazy Loading**: Optimized image loading

### **Analytics & Monitoring**
* 📊 **Google Analytics (GA4)**: User behavior tracking
* 🛡️ **Sentry**: Frontend error monitoring

### **Deployment & Performance**
* ☁️ **Vercel**: CI/CD enabled deployment
* 🚀 **CDN-based Assets**: Fast global delivery
* ⚡ **Performance Optimized**: Lighthouse audited

---

## 📊 Performance Metrics

### 🏆 Lighthouse Scores

| Metric | Score |
|--------|-------|
| ⚡ **Performance** | 88 |
| ♿ **Accessibility** | 87 |
| ✅ **Best Practices** | 77 |
| 🔍 **SEO** | 92 |

### ⚡ Performance Optimizations

* 🚀 **Lazy-loaded Course Images**: Reduced initial load time
* 🚀 **Optimized DOM Size**: Efficient rendering
* 🚀 **CDN-based Asset Delivery**: Vercel edge network
* 🚀 **Code Splitting**: React Router lazy loading
* 🚀 **Lighthouse Audited**: Continuous performance monitoring

---

## 📂 Project Structure

```plaintext
learnpro-edtech-frontend/
│
├── public/
│   ├── index.html              # Main HTML file
│   ├── logo112.png             # App logo
│   └── manifest.json           # PWA manifest
│
├── src/
│   ├── assets/                 # Images, icons, static files
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── CourseCard.jsx      # Course display card
│   │   ├── CourseDetailsSkeleton.jsx  # Loading skeleton
│   │   ├── Footer.jsx          # App footer
│   │   └── Navbar.jsx          # Navigation bar
│   │
│   ├── pages/                  # Application Pages (Routes)
│   │   ├── About.jsx           # About page
│   │   ├── CourseDetails.jsx   # Individual course view
│   │   ├── Courses.jsx         # All courses listing
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── NotFound.jsx        # 404 error page
│   │   ├── Profile.jsx         # User profile
│   │   └── Signup.jsx          # Registration page
│   │
│   ├── routes/                 # Routing Configuration
│   │   └── ProtectedRoutes.jsx # Route protection logic
│   │
│   ├── utils/                  # Helper Functions
│   │   └── auth.js             # Authentication utilities
│   │
│   ├── App.css                 # Global styles
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Tailwind imports
│   ├── index.js                # App entry point
│   └── setupTests.js           # Test configuration
│
├── screenshots/                # App screenshots
│   ├── Homepage.png
│   ├── Dashboard.png
│   ├── Loginpage.png
│   ├── Coursepage.png
│   ├── Profilepage.png
│   ├── course-details.png
│   ├── analytics-active.png
│   └── lighthouse-performance.png
│
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── package-lock.json           # Locked dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

---

## 📁 Folder Overview

| Folder | Description |
|--------|-------------|
| 📦 **components/** | Reusable UI components (Navbar, Footer, Cards, Loaders) |
| 📄 **pages/** | Application pages mapped to routes |
| 🛣️ **routes/** | Protected routing logic and route guards |
| 🔧 **utils/** | Authentication helpers and utility functions |
| 🎨 **assets/** | Static images, icons, and media files |

---

## 🗃️ System Architecture Diagram

```plaintext
┌───────────────────────────────┐
│       User (Browser)          │
└───────────────┬───────────────┘
                │
                ▼
┌──────────────────────────────────────────┐
│          React SPA (LearnPro)            │
│                                          │
│  ┌──────────────┐   ┌─────────────────┐ │
│  │   App.jsx    │──▶│ React Router    │ │
│  │              │   │ (Routes Layer)  │ │
│  └──────────────┘   └─────────────────┘ │
│              │                           │
│              ▼                           │
│  ┌───────────────────────────────────┐  │
│  │          Pages Layer              │  │
│  │  Home | Courses | CourseDetails   │  │
│  │  Login | Signup | Dashboard       │  │
│  │  Profile | About | NotFound       │  │
│  └───────────────────────────────────┘  │
│              │                           │
│              ▼                           │
│  ┌────────────────────────────────────┐ │
│  │        Components Layer            │ │
│  │  Navbar | Footer | CourseCard      │ │
│  │  Loader | Skeleton | ProtectedRoute│ │
│  └────────────────────────────────────┘ │
│              │                           │
│              ▼                           │
│  ┌───────────────────────────────────┐  │
│  │        Utils / State Layer        │  │
│  │  auth.js                          │  │
│  │  • signupUser                     │  │
│  │  • loginUser                      │  │
│  │  • logoutUser                     │  │
│  │  • getUser / isAuthenticated      │  │
│  └───────────────────────────────────┘  │
│              │                           │
│              ▼                           │
│  ┌───────────────────────────────────┐  │
│  │      Browser Storage Layer        │  │
│  │  localStorage                     │  │
│  │  • users                          │  │
│  │  • currentUser                    │  │
│  │  • enrolledCourses_<email>        │  │
│  │  • courseProgress_<email>         │  │
│  └───────────────────────────────────┘  │
└──────────────────────────────────────────┘
                │
                ▼
        ┌───────────────┐
        │  External     │
        │  Services     │
        ├───────────────┤
        │ • Google      │
        │   Analytics   │
        │ • Sentry      │
        │ • Backend API │
        └───────────────┘
```

---

## 🔐 Authentication Logic

### 🔑 How It Works

1. **User Registration**
   - Users stored in LocalStorage under `users` key
   - Password hashing (client-side)
   - Email validation

2. **User Login**
   - Credential verification against LocalStorage
   - JWT-like session token generation
   - Current user stored in `currentUser` key

3. **Per-User Data**
   - Enrollments: `enrolledCourses_<email>`
   - Progress: `courseProgress_<email>`
   - Personalized dashboard data

4. **Protected Routes**
   - Redirect to login if not authenticated
   - Memory of intended destination
   - Auto-redirect after successful login

5. **Logout**
   - Clears `currentUser` from LocalStorage
   - Preserves user account data
   - Redirects to homepage

---

## 🧪 Demo Credentials

🆕 **Create Your Own Account**  
Use the Signup page to create a new account with your email and password.

🔓 **Test Credentials**  
You can create and use any test credentials for demonstration purposes.

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage Screenshot](./screenshots/Homepage.png)

The landing page introduces **LearnPro**, showcasing featured courses, platform statistics, and clear navigation for learners.

---

### 📊 Dashboard
![Dashboard Screenshot](./screenshots/Dashboard.png)

The personalized dashboard displays enrolled courses, learning progress, statistics, and the learner's activity streak.

---

### 🔐 Login Page
![Login Page Screenshot](./screenshots/Loginpage.png)

Secure authentication page allowing users to log in using saved credentials with validation and toast feedback.

---

### 📚 Courses Page
![Courses Page Screenshot](./screenshots/Coursepage.png)

Browse all available courses with filtering, search functionality, and detailed course information.

---

### 👤 Profile Page
![Profile Page Screenshot](./screenshots/Profilepage.png)

The profile page allows users to view and update their personal information, manage account details, and securely log out of the application.

---

### 📘 Course Details Page
![Course Details Screenshot](./screenshots/course-details.png)

Detailed course view including instructor info, syllabus highlights, enrollment status, and protected enroll functionality.

---

### 📊 Google Analytics Dashboard
![Google Analytics Screenshot](./screenshots/analytics-active.png)

Real-time user behavior tracking and engagement metrics powered by Google Analytics (GA4).

---

### ⚡ Lighthouse Performance Score
![Lighthouse Score Screenshot](./screenshots/lighthouse-performance.png)

Performance audit showing excellent scores across all metrics: Performance (88), Accessibility (87), Best Practices (77), and SEO (92).

---

## ⚙️ Installation & Setup

### 📥 Clone Repository

```bash
git clone https://github.com/aditya32193213/edtech-dashboard.git
cd edtech-dashboard-frontend
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Stripe Integration
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Backend API URL
REACT_APP_API_BASE_URL=https://edtech-dashboard-backend.onrender.com/api

# Sentry Monitoring
REACT_APP_SENTRY_DSN=your_frontend_sentry_dsn

# Google Analytics (Optional)
REACT_APP_GA_TRACKING_ID=your_ga4_tracking_id
```

### ▶️ Run Development Server

```bash
npm start
```

🌍 App runs on: `http://localhost:3000`

### 🏗️ Build for Production

```bash
npm run build
```

### 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🧪 Testing

### 🔍 Run Tests

```bash
npm test
```

### 📊 Check Coverage

```bash
npm run test:coverage
```

---

## 📌 Future Enhancements

### 🚀 Planned Features

* 🔗 **Full Backend Integration**: Connect to Node.js + MongoDB backend
* 🎥 **Real Video Progress**: Track actual video playback progress
* 👨‍💼 **Admin Dashboard**: Course management and user analytics
* 💳 **Payment Gateway**: Complete Stripe integration for paid courses
* 📜 **Certificate Download**: Auto-generated certificates on course completion
* 📱 **Mobile App**: React Native version for iOS and Android
* 🌐 **Internationalization**: Multi-language support
* 🔔 **Push Notifications**: Real-time course updates
* 💬 **Live Chat Support**: In-app messaging system
* 🎓 **Quiz System**: Interactive assessments and exams

---

## 🛡️ Monitoring & Analytics

### 📊 Google Analytics (GA4)

LearnPro uses **Google Analytics 4** for comprehensive tracking:

- 👥 **User Engagement**: Page views, session duration, bounce rates
- 🎯 **Conversion Tracking**: Course enrollments, signup completions
- 📈 **Real-time Analytics**: Live user activity monitoring
- 🌍 **Geographic Insights**: User location and demographics
- 📱 **Device Analytics**: Desktop vs mobile usage patterns

### 🛡️ Sentry Integration

**Sentry** provides production error monitoring:

- 🐛 **Error Tracking**: Capture runtime errors and exceptions
- 📍 **Source Maps**: Precise error location in production code
- 🚨 **Real-time Alerts**: Instant notifications for critical issues
- 📊 **Performance Monitoring**: Track slow components and API calls
- 🔍 **Session Replay**: Visual reproduction of user sessions with errors

---

## ☁️ Deployment

### 🚀 Vercel Deployment

LearnPro is deployed on **Vercel** with the following benefits:

* ✅ **Automatic CI/CD**: Git push triggers automatic deployment
* 🌐 **Global CDN**: Fast content delivery worldwide
* 🔒 **HTTPS by Default**: Automatic SSL certificates
* 📊 **Analytics Built-in**: Performance and visitor insights
* 🔄 **Preview Deployments**: Test branches before merging
* ⚡ **Edge Network**: Optimized for React applications

**Deployment Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on every push

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 **Fork the Repository**
2. 🌿 **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit Your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. 🔃 **Open a Pull Request**

### 📋 Contribution Guidelines

* Write clean, documented code
* Follow existing code style
* Add tests for new features
* Update README for significant changes
* Ensure all tests pass before PR

---

## 🧑‍💻 Author

**Aditya**  
🚀 Full Stack Developer | React Specialist | EdTech Enthusiast  
🔗 GitHub: [@aditya32193213](https://github.com/aditya32193213)

---

## ⭐ Support

If you like this project, please ⭐ **star the repository**.  
Your support helps me grow as a developer ✨

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

* ⚛️ **React Team** for the amazing framework
* 🎨 **Tailwind CSS** for the utility-first approach
* 📊 **Google Analytics** for analytics platform
* 🛡️ **Sentry** for error monitoring
* ☁️ **Vercel** for seamless deployment
* 💳 **Stripe** for payment processing

---

## 📞 Contact & Support

* 🐛 **Report Issues**: [GitHub Issues](https://github.com/aditya32193213/edtech-dashboard/issues)
* 💬 **Discussions**: [GitHub Discussions](https://github.com/aditya32193213/edtech-dashboard/discussions)
* 📧 **Email**: Contact via GitHub profile

---

<p align="center">
  <strong>Made with ❤️ by <a href="https://github.com/aditya32193213">Aditya</a></strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Portfolio-Ready-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Production-Live-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Open%20Source-❤️-red?style=for-the-badge" />
</p>