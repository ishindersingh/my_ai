require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      console.log("Received message:", messages);
  
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-4o-mini",
          messages: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("OpenRouter Response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error calling OpenRouter API:", error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data || "API request failed" });
    }
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
