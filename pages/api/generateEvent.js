// pages/api/generateEvent.js
import { Configuration, OpenAIApi } from 'openai';
import { generateRandomSound } from '../../utils/soundGenerator';
import generateRoom from '../../utils/roomGenerator';
import { generateTexture } from '../../utils/modelGenerator';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // OpenAI API Key for text generation
});
const openai = new OpenAIApi(configuration);

async function generateTexture(description) {
  const response = await fetch('https://api.deepai.org/api/text2img', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.DEEPAI_API_KEY, // DeepAI API Key for image generation
    },
    body: JSON.stringify({ text: description }),
  });

  const data = await response.json();
  return data.output_url; // Returning the generated texture URL
}

export default async function handler(req, res) {
  const { situation } = req.body;

  try {
    // Generate procedural room layout
    const room = generateRoom();

    // Generate AI-based textures for room
    const wallTexture = await generateTexture("dark, decaying wall texture");
    const floorTexture = await generateTexture("gritty, grimy floor texture");

    // Generate monster and event
    const prompt = `Generate a terrifying event in the following environment: ${JSON.stringify(room)}. Include a monster description and event details.`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });

    const event = response.data.choices[0].text.trim();

    // Determine if the event requires an object or ambient sound
    const soundType = event.includes('monster') ? 'object' : 'ambient';
    const sound = generateRandomSound(soundType);

    res.status(200).json({ room, event, wallTexture, floorTexture, sound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
