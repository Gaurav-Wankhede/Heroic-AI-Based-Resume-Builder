import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from '@/utils/generate-ai-content';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const content = await generateAIContent(prompt);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: 'Failed to generate AI content' }, { status: 500 });
  }
}
