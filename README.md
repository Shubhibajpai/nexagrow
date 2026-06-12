# NexaGrow — AI-Powered Digital Marketing Agency Website

> Clickseon Web Developer Technical Assessment — Full Stack Implementation

---

## 🚀 Live Demo

- **Frontend:** https://nexagrow.vercel.app
- **Admin Dashboard:** https://nexagrow.vercel.app/admin
- **Backend API:** https://nexagrow-api.railway.app

---

## 📁 Project Structure

```
nexagrow/
├── frontend/          # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── WhyUs.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── WeatherWidget.jsx   # Task 3 – API Integration
│   │   │   ├── ContactForm.jsx     # Task 2 – Lead Capture
│   │   │   ├── Chatbot.jsx         # Task 4 – AI Chatbot
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx           # Task 2 – Admin Dashboard
│   │   └── hooks/
│   │       └── useAnimateOnScroll.js
│   └── public/
│       ├── robots.txt              # Task 6 – SEO
│       └── sitemap.xml             # Task 6 – SEO
├── backend/           # Node.js + Express API
│   ├── routes/
│   │   ├── leads.js               # Task 2 – CRUD
│   │   ├── weather.js             # Task 3 – Weather API
│   │   └── chat.js                # Task 4 – AI Chatbot
│   ├── db/
│   │   └── database.js            # SQLite schema
│   └── server.js
├── n8n/
│   └── lead-capture-workflow.json # Task 5 – n8n Automation
└── README.md
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/nexagrow.git
cd nexagrow
npm run install:all
```

### 2. Backend Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys
```

Required keys:
- `OPENWEATHER_API_KEY` — free at [openweathermap.org](https://openweathermap.org/api)
- `ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com)
- `N8N_WEBHOOK_URL` — from your n8n workflow (optional)

### 3. Start Development Servers

```bash
# From root — starts both frontend and backend
npm run dev

# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## 🧪 Task Breakdown

### Task 1 — Modern Business Website
**Tech:** React 18, Tailwind CSS, Syne + Inter fonts, Lucide icons

- Premium responsive design with dark hero, animated sections, scroll-triggered reveals
- Sections: Hero → Services → About → Why Us → Testimonials → API Widget → Contact → Footer
- Fully mobile/tablet/desktop responsive
- Smooth CSS-based scroll animations via IntersectionObserver

### Task 2 — Lead Capture & Admin Dashboard
**Tech:** SQLite (better-sqlite3), Express.js, React state

- Contact form with 5 required fields + full client and server validation
- Data stored in SQLite database (`nexagrow.db`)
- Success message displayed on submission
- **Admin page** (`/admin`): view all leads, search, filter by service, export CSV
- Stats cards: total leads, this week, unique emails

### Task 3 — API Integration
**Tech:** OpenWeatherMap REST API, Axios, Express proxy

- Live weather widget with city search
- Displays: temperature, feels like, humidity, wind speed, visibility
- Proper error handling (city not found, API errors, network failures)
- Demo fallback mode when no API key is configured

### Task 4 — AI Chatbot
**Tech:** Rule-based engine + Anthropic Claude API fallback

- Floating chat widget (bottom-right)
- **Hybrid approach:**
  1. Rule-based matching for common queries (services, pricing, contact, results, timeline)
  2. Claude API fallback for complex/unmatched questions
- Chat history preserved in session (React state)
- Unread message badge
- Graceful degradation if no API key set

### Task 5 — Automation Workflow (n8n)
**File:** `n8n/lead-capture-workflow.json`

**Workflow:**
```
New Lead (Webhook) 
  → Add to Google Sheets
  → Send Email Notification to Team
  → Generate AI Summary (GPT/Claude)
  → Save Summary to Sheets
  → Respond to webhook
```

**Import instructions:**
1. Open n8n (local: `npx n8n` or cloud)
2. Go to **Workflows → Import from file**
3. Select `n8n/lead-capture-workflow.json`
4. Add your Google Sheets and SMTP credentials
5. Copy the webhook URL into your backend `.env` as `N8N_WEBHOOK_URL`
6. Activate the workflow

### Task 6 — Technical SEO & Performance
**Implemented:**
- ✅ Semantic HTML (header, main, section, footer, nav)
- ✅ H1→H6 heading hierarchy
- ✅ Meta title + description
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Card meta tags
- ✅ JSON-LD Schema markup (MarketingAgency)
- ✅ `robots.txt` with sitemap reference
- ✅ `sitemap.xml`
- ✅ Lazy loading via IntersectionObserver
- ✅ Google Fonts with `preconnect` preload
- ✅ Minimal JavaScript bundle (tree-shaken Lucide icons)
- ✅ Image optimization notes (use WebP, lazy loading on `<img>`)

---

## 🚢 Deployment

### Frontend → Vercel (free)
```bash
cd frontend
npm run build
# Push to GitHub → Connect to Vercel → auto-deploys
```

### Backend → Railway (free tier)
```bash
# Push backend/ to GitHub → Connect to Railway
# Set environment variables in Railway dashboard
```

---

## 🛠 Technology Decisions

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React 18 + Vite | Fast DX, component model ideal for this architecture |
| Styling | Tailwind CSS | Utility-first, no unused CSS in production build |
| Backend | Node.js + Express | Same language full-stack, minimal overhead |
| Database | SQLite (better-sqlite3) | Zero-config, file-based, perfect for this scale; swap to Postgres for production |
| Chat AI | Anthropic Claude | Best quality conversational AI, generous free tier |
| Weather API | OpenWeatherMap | Most widely used, reliable free tier (1000 calls/day) |
| Automation | n8n | Open source, self-hostable, visual workflow editor |
| Deployment | Vercel + Railway | Best free tiers for frontend + backend respectively |

---

## 📞 Contact

**NexaGrow** — hello@nexagrow.com
