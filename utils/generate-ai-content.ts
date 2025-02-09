import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface AIResponse {
  text: string;
  error?: string;
}

export async function generateAIContent(prompt: string, retries = 3): Promise<AIResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;

  if (!apiKey) {
    console.error('GOOGLE_AI_KEY not found in environment variables');
    return {
      text: '',
      error: 'API key not configured'
    };
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-lite-preview-02-05',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048, // Increased for longer responses
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      const result = await model.generateContent([
        { text: prompt }
      ]);

      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Empty response from AI');
      }

      return { text };
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === retries - 1) {
        return {
          text: '',
          error: error instanceof Error ? error.message : 'Failed to generate AI content'
        };
      }
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return {
    text: '',
    error: 'Maximum retries exceeded'
  };
}
