# Alomgir Hossain — Developer Portfolio 🚀

A professional, fully responsive portfolio website showcasing my skills, experience, education, and projects as a Full-Stack Developer.

---

## 🔗 Live Links

| | Link |
|---|---|
| **Live Website** | [https://protfolio-ecru-eight.vercel.app](#) |
| **GitHub Repository** | [https://github.com/HeyAlomgir/Protfolio](#) |

---

## ✨ Features

- 🧭 Fully responsive navbar with smooth scroll navigation to all sections
- 👤 Hero section with professional photo, animated typewriter designation, and social links
- 📄 One-click Resume download with progress toast feedback
- 📝 About Me section covering my journey, focus areas, and personality
- 🛠 Interactive Skills section with categorized tabs (Frontend / Backend / Tools) and animated proficiency bars
- 🧩 Services section with detailed modal for each service (features, description)
- 🎓 Education timeline with icons, loaded dynamically from JSON
- 💼 Projects section — at least 3 projects in card format, each linking to a detailed project page with tech stack, live link, GitHub link, challenges, and future improvements
- 📬 Contact section with email, phone, and WhatsApp
- 🌗 Dark / Light mode support across the entire site
- 🎬 Smooth Framer Motion animations throughout (scroll reveals, hover effects, shimmer, floating elements)
- 📱 Fully responsive across mobile, tablet, and desktop

---

## 🛠 Tech Stack

- **Next.js** (App Router) + **JavaScript**
- **Tailwind CSS** + **HeroUI** component library
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **react-fast-marquee** for the scrolling skills showcase
- **typewriter-effect** for the animated designation text
- Data-driven sections (Services, Education) powered by static JSON files

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── services.json
│   ├── education.json
│   └── Alomgir_Resume.pdf
├── src/
│   ├── app/
│   │   ├── page.jsx              # Home page assembling all sections
│   │   └── projects/[id]/        # Individual project detail pages
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Services.jsx
│       ├── Modals.jsx
│       ├── Education.jsx
│       ├── Projects.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
└── ...
```

---

## ⚙️ Getting Started (Local Setup)

### Prerequisites
- Node.js 18+

### 1. Clone the repository
```bash
git clone <repo-url> portfolio
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 📬 Contact

- **Email:** alomgirhosssain71@gmail.com
- **LinkedIn:** [linkedin.com/in/alomgir-hossain-web](https://www.linkedin.com/in/alomgir-hossain-web/)
- **GitHub:** [github.com/HeyAlomgir](https://github.com/HeyAlomgir)

---

## 👤 Author

Built with ❤️ by **Alomgir Hossain**, Full-Stack Developer.