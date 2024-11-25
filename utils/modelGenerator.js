// utils/modelGenerator.js

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

export { generateTexture };
