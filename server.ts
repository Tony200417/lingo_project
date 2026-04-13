import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS for allowed domains with a more flexible approach
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        "https://ais-dev-mxwpdhc7dkxch3izssdpov-389625017028.us-west2.run.app",
        "https://ais-pre-mxwpdhc7dkxch3izssdpov-389625017028.us-west2.run.app",
        "https://ais-pre-mxwpdhc7dkxch3izssdpov-389625017028.web.app",
        "https://ais-pre-mxwpdhc7dkxch3izssdpov-389625017028.firebaseapp.com",
        "http://localhost:3000"
      ];
      
      // Allow any origin that ends with .run.app or .web.app or .firebaseapp.com
      if (allowedOrigins.indexOf(origin) !== -1 || 
          origin.endsWith('.run.app') || 
          origin.endsWith('.web.app') || 
          origin.endsWith('.firebaseapp.com')) {
        callback(null, true);
      } else {
        console.log(`[CORS] Origin ${origin} blocked.`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

  app.use(express.json());

  // Logging middleware for all requests
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Favicon route to stop 404 logs
  app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      time: new Date().toISOString()
    });
  });

  // Real API Chat endpoint (Server-side Gemini)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
      
      if (!apiKey || apiKey.includes('YOUR_') || apiKey.includes('TODO')) {
        return res.status(500).json({ 
          error: "La clave de API de Gemini no está configurada correctamente en el servidor.",
          code: "API_KEY_MISSING"
        });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `System Instruction: You are a friendly and encouraging language tutor for ${language === 'en' ? 'English' : 'Portuguese'}. 
      Your goal is to help the user learn the language through conversation. 
      Correct their mistakes gently, explain grammar points when relevant, and suggest new vocabulary. 
      Keep your responses concise and didactic. 
      Always respond in the target language (${language === 'en' ? 'English' : 'Portuguese'}) but you can provide translations in Spanish if the user seems confused.
      
      User Message: ${message}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ text: text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Hubo un error al conectar con el tutor de IA.",
        details: error.message 
      });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');

  // Serve static files from dist
  if (process.env.NODE_ENV === "production" || fs.existsSync(indexPath)) {
    console.log(`Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    
    // SPA Fallback: serve index.html for any non-API route
    app.get('*', (req, res) => {
      if (req.url.startsWith('/api/')) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.sendFile(indexPath);
    });
  } else {
    console.log("Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
