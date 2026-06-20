import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Handle document upload
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileBuffer = req.file.buffer;
      const mimeType = req.file.mimetype;
      const base64Data = fileBuffer.toString("base64");
      const customInstruction = req.body.instruction;

      const prompt = customInstruction
        ? `You are LegalEaseAI, an expert Document Analyst. Please follow the user's specific instruction regarding this document.\nUser Instruction: ${customInstruction}\nIf the instruction asks for an analysis, format the output nicely using Markdown.`
        : `You are LegalEaseAI, an expert Document Analyst.
Your task:
1. Simplify the provided document.
2. Do not guess anything or make assumptions.
3. Highlight all key points. Do not forget or leave any out.
4. Do not include or guess any information outside the contents of the file.
Return the output in clear, readable Markdown format.`;

      const response = await getAI().models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      res.json({ result: response.text, originalFileName: req.file.originalname, mimeType, base64Data });
    } catch (error: any) {
      console.error("Upload API Error:", error);
      res.status(500).json({ error: error.message || "Error processing document" });
    }
  });

  // API route for chat interaction over a document
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, chatHistory, base64Data, mimeType } = req.body;
      
      const systemInstruction = `You are NotebookLM, a helpful Knowledge Assistant. The user has uploaded an attached document. 
Your goal is to answer questions strictly based on the document context provided. 
If the information cannot be found in the document, say so.`;

      const historyContext = (chatHistory || []).map((msg: any) => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const parts: any[] = [];
      if (base64Data && mimeType) {
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      }
      if (historyContext) {
        parts.push({ text: `Previous conversation:\n${historyContext}\n\n` });
      }
      parts.push({ text: `User asks: ${message}` });

      const response = await getAI().models.generateContent({
        model: 'gemini-3.5-flash',
        contents: {
          parts: parts
        },
        config: {
          systemInstruction: systemInstruction
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: error.message || 'Error processing request' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
