# Heart2Heart ❤️

**A Full-Stack Web Application for Heart Health Management**

Heart2Heart is a specialized platform designed to empower patients with heart disease or those at risk. It combines AI-driven guidance, medication tracking, and personalized daily health tasks to improve cardiovascular wellness.

![Heart2Heart Demo](https://github.com/user-attachments/assets/2e1d8d62-b233-4d3f-b0da-d3571e2a305f)

## Features ✨

### 1. **AI-Powered Heart Health Chatbot**
- Integrated with OpenAI API for intelligent, context-aware conversations
- Provides medically-informed guidance (Note: Not a substitute for professional medical advice)
- Answers questions about heart-healthy habits, symptoms, and lifestyle tips

### 2. **Smart Medication Tracker**
- Add medications with dosage, frequency, and reminders
- Visual calendar interface with Tailwind CSS
- Mobile-friendly notifications system (future implementation)

### 3. **Personalized Daily Task Generator**
- Initial health questionnaire assessing lifestyle and risk factors
- OpenAI-powered recommendation engine generates daily tasks
- Progress tracking and achievement system

## Tech Stack 🛠️

**Frontend**
- Next.js 15 (App Router)
- Tailwind CSS for styling
- NextAuth.js for session management

**Backend**
- FastAPI (Python)
- Uvicorn ASGI server
- JWT authentication

**Database**
- PostgreSQL hosted on [Neon.tech](https://neon.tech)

**AI Integration**
- OpenAI GPT-4o API
- Custom prompt engineering for medical safety

**Infrastructure**
- Dockerized development/production environment

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker (optional)
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/heart2heart.git
   cd heart2heart
   ```
2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
3. **Backend Setup**
   ```bash
   cd ../backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
### Configuration
**Frontend (.env.local)**
```env
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@neon-host/dbname
JWT_SECRET=your-jwt-secret-key
OPENAI_API_KEY=sk-your-openai-key
```
**Backend (.env)**
```env
DATABASE_URL=postgresql://user:pass@neon-host/dbname
JWT_SECRET=your-jwt-secret-key
OPENAI_API_KEY=sk-your-openai-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Running Locally
1. **Start Backend**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
**Visit http://localhost:3000**

### Docker Deployment 🐳
```bash
docker compose up --build
```

Important Notice: This application is not a substitute for professional medical advice. Always consult a healthcare provider for medical decisions.

Developed with ❤️ for heart health awareness
