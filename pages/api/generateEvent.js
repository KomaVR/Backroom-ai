// pages/api/generateEvent.js
import { Configuration, OpenAIApi } from "openai";
import generateRoom from '../../utils/roomGenerator';

const configuration = new Configuration({
  apiKey: process.env.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, // Your OpenAI API Key
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { situation } = req.body;

  try {
    // Generate procedural room
    const room = generateRoom();

    // Generate monster description and event
    const prompt = `Generate a terrifying event and monster in the following environment: ${JSON.stringify(room)}. The event should be sudden, terrifying, and unique. Include an AI-generated monster description that the player could encounter.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    const event = response.data.choices[0].text.trim();
    res.status(200).json({ room, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
