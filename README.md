# DataViz

**Describe your data in English. Get the chart.**

**Live Demo:** [https://dataviz.venkateshraju.in/](https://dataviz.venkateshraju.in/)

DataViz is an AI-powered analytics tool that turns plain-English questions into clean, shareable charts and graphs. No SQL, no query languages, and no complex dashboards to navigate. Upload your dataset, ask a question the way you would ask a colleague, and let the AI build the right visualization for you.

## Features

- **No query language:** Just ask questions like "Show signups by week, split by plan".
- **Sensible by default:** The AI understands your data context and automatically picks the most effective chart type (bar, line, scatter, pie) for your question.
- **Refine on the fly:** Need to adjust the chart? Just ask a follow-up question like "Make it a pie chart" without starting over.
- **Agentic Pipeline:** Powered by LangGraph, the AI acts as an autonomous data analyst—writing the Pandas code, executing it safely in a constrained environment, and returning the exact visualization and insights.

## Tech Stack

**Frontend:**
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Start & Router](https://tanstack.com/router/latest)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Fully custom, premium UI with smooth micro-animations.

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- [LangGraph](https://python.langchain.com/docs/langgraph) & [LangChain](https://python.langchain.com/) for the agentic reasoning loop.
- [Groq](https://groq.com/) API for hyper-fast LLM inference.
- Pandas & Matplotlib for data processing and chart generation.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- A [Groq API Key](https://console.groq.com/keys)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your Groq API key:
   - Create a `.env` file in the `backend` directory.
   - Add your key: `GROQ_API_KEY=your_api_key_here`
4. Start the FastAPI server:
   ```bash
   uvicorn api:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Built By
[Venkatesh Raju](https://venkateshraju.in)
