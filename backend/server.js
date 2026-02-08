const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content:
              "You are Cupid, a fun Valentine's chatbot. Give short, romantic, playful replies with emojis, love advice, and poems. 💕",
          },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Groq error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI service error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
