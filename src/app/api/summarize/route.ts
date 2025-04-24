// src/app/api/summarize/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Summarize API called');
    const { text } = await request.json();
    
    if (!text) {
      console.error('No text provided');
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('API key not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }
    
    console.log('Calling Gemini API...');
    // Updated to use gemini-2.0-flash as shown in the quickstart guide
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Please summarize the following text in 2-3 sentences:\n\n${text}`
          }]
        }]
      }),
    });
    
    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json({ error: errorData.error?.message || 'Failed to summarize text' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Gemini API response:', data);
    
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated';
    
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}