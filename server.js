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
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "deepseek-r1-distill-llama-70b",
        messages: messages,
        temperature: 0.6,
        max_tokens: 4096,
        top_p: 0.95,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Groq Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Groq API:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "API request failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
