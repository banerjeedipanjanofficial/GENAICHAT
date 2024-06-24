const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai")

const app = express();
const port = 5000; // Choose an appropriate port

// Replace with your OpenAI API key
// const configuration = new Configuration({
//     apiKey: 'sk-proj-R9OHklcugcN0bJj0onQZT3BlbkFJ1UZKcmkufxjbxF6pJBZl',
// });


const openai = new OpenAI({
  apiKey: "sk-proj-QA5SQFymlOycQhYK6576T3BlbkFJBsgsAcEsWbGqhWG7ExbC"// This is also the default, can be omitted
});

// const openai = new OpenAIApi('sk-proj-R9OHklcugcN0bJj0onQZT3BlbkFJ1UZKcmkufxjbxF6pJBZl');

// Middleware
app.use(cors()); // Allow Cross-Origin requests
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
