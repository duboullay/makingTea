const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send("Erreur serveur");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Proxy en ligne sur le port", PORT));
