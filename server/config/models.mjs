// File: server/config/models.mjs
import OpenAI from 'openai';
import MistralClient from '@mistralai/mistralai';

const initializeModels = async () => {
  try {
    const openai = {
      client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
      generateMessage: async (messages) => {
        const completion = await openai.client.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages
        });
        return completion.choices[0].message.content.trim();
      }
    };

    const mistral = {
      client: new MistralClient(process.env.MISTRAL_API_KEY),
      generateMessage: async (messages) => {
        const completion = await mistral.client.chat({
          model: 'mistral-tiny',
          messages
        });
        return completion.choices[0].message.content.trim();
      }
    };

    return { openai, mistral };
  } catch (error) {
    console.error('Error initializing models:', error);
    throw error;
  }
};

export default initializeModels;