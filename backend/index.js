require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./Models/db");

const aiRoutes = require("./Routes/ai.js");
const authRoutes = require("./Routes/AuthRouter");
const verify = require("./Routes/verify");
const historyRouter = require("./Routes/historyRouter");
const Google = require("./Routes/Google");

const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://gemini-chat-ebxa4jhj2-aayushbhatt28306-6142s-projects.vercel.app",
  "https://gemini-chat-bot-alpha.vercel.app",
];

// ✅ Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/ai", aiRoutes);

app.use("/api/auth", Google);
app.use("/auth", authRoutes);
app.use("/verify", verify);
app.use("/history", historyRouter);

// ✅ Debug logs (only dev mode)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    if (req.method === "POST") {
      console.log(`${req.method} ${req.url}`);
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
    }
    next();
  });
}

// ✅ Default routes
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/health", (req, res) =>
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  })
);

// ✅ Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Backend Successfully Connected...!`)
});