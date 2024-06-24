const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai")

const app = express();
const port = 5000; 


const openai = new OpenAI({
  apiKey:"sk-proj-7LgJjLUcf8FUtKRqZ0giT3BlbkFJbLy2UEPGLwbNa1IBtTt6",
});

app.use(cors()); 
app.use(bodyParser.json());

app.post('/api/ask', async (req, res) => {
    const { query } = req.body;
    try {
        const completion = await openai.completions.create({
            model: "gpt-3.5-turbo",
            prompt: query,
            max_tokens: 30,
          });          
        const answer = completion.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).json({ error: 'Failed to fetch response' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
