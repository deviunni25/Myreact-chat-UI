// server/server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// A simple POST route for chat messages
app.post("/api/message", (req, res) => {
  const userMessage = req.body.message;

  // bot reply logic
  let reply = "I'm just a simple bot 😅";
  if (userMessage.toLowerCase().includes("hello")) {
    reply = "Hey there! 👋";
  } else if (userMessage.toLowerCase().includes("how are you")) {
    reply = "I'm doing great! Thanks for asking 😄";
  } else if (userMessage.toLowerCase().includes("bye")) {
    reply = "Goodbye! 👋 Have a nice day!";
  }

  res.json({ reply });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

