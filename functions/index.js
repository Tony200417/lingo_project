const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Support both prefixed (/api) and non-prefixed routes for flexibility
const router = express.Router();

// API Chat endpoint (Server-side Gemini proxy)
router.post("/chat", async (req, res) => {
  try {
    const { message, language } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // In production (Firebase), use Firebase Secrets or Config
    const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";
    
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
  } catch (error) {
    console.error("Gemini API Error in Functions:", error);
    res.status(500).json({ 
      error: "Hubo un error al conectar con el tutor de IA.",
      details: error.message 
    });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "LingoFast API Function" });
});

// Apply the router to both /api and / to handle Hosting rewrites and direct calls
app.use("/api", router);
app.use("/", router);

// Export the Express app as a Firebase function named 'api'
exports.api = functions.https.onRequest(app);
