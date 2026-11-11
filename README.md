# 🚇 NextStop 下一站

> *Skip the small talk. Meet halfway on the MTR.*

**NextStop** is a bilingual (English & Traditional Chinese) dating web application (PWA) specifically tailored for young working professionals in Hong Kong (ages 22–35). Instead of endless swiping based on location tracking, NextStop connects commuters based on their daily MTR routes, industries, and verified professional status.

## ✨ Current Features

*   **🌏 Bilingual UI:** Seamless real-time toggle between English and Traditional Chinese (繁中).
*   **⚡ 60-Second Onboarding:** Skip the endless questionnaires. Users set up their profile using their Work MTR line, industry, and a short bio.
*   **🎨 Victoria Harbour Design System:** A custom, aesthetic UI theme featuring *Warm Alabaster*, *Victoria Harbour Teal*, and *Sunset Coral*.
*   **🔐 Secure Authentication:** Full email/password login flow powered by Supabase Auth with Row Level Security (RLS) data protection.
*   **🃏 Discovery Deck:** A mobile-optimized, full-screen swipe deck rendering live user profiles directly from the backend database.

## 🛠️ Tech Stack

This project is built using a modern, zero-cost, lightweight tech stack:

*   **Frontend:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** React Router v7

## 🚀 Local Development

To run this project locally on your machine:

**1. Clone the repository:**
```bash
git clone https://github.com/logicalwong/NextStop.git
cd NextStop
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up Supabase (Environment Variables):**
Create a `.env.local` file in the root directory and add your Supabase connection details:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**4. Start the development server:**
```bash
npm run dev
```

## 📍 Roadmap (Upcoming Phases)
- [x] Phase 1: App Shell & Bilingual UI
- [x] Phase 2: Database Schema & Authentication Flow
- [ ] Phase 3: Swipe Gestures & Animation
- [ ] Phase 4: Matching Logic & Chat Interface
- [ ] Phase 5: PWA Deployment

---
*Designed and built in Hong Kong.* 🇭🇰
