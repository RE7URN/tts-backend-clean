require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const allowedUsers = new Set();

// ✅ CORS CORRECTO (sin barra final)
app.use(cors({
  origin: "https://tts-project-joanmiii.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight para todas las rutas
app.options("*", cors());

// ✅ JSON parser
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
// 🟢 Ruta base de prueba
app.get("/", (req, res) => {
  res.send("TTS Backend is running!");
});

// 🟢 Ruta de comprobación de autorización
app.get("/api/allowed/:username", (req, res) => {
  const user = req.params.username.toLowerCase();
  res.json({ allowed: allowedUsers.has(user) });
});

// 🔊 Inicio del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});