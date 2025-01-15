import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIResponse {
  text: string;
  error?: string;
}

export async function generateAIContent(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;

  if (!apiKey) {
    return {
      text: '',
      error: 'GOOGLE_AI_KEY not found in environment variables'
    };
  }

  if (!prompt.trim()) {
    return {
      text: '',
      error: 'Prompt is required'
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      text
    };
  } catch (error) {
    console.error('Error generating AI content:', error);
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Failed to generate AI content'
    };
  }
}
