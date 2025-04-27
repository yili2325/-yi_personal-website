import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Create a secure API route handler for AI Insight
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, context } = body;
    
    // Validate the request
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    // Check if API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Initialize the Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Define AI Insight behavior - specific to writing analysis and reflection
    let systemMessage = `
You are an AI writing and reflection assistant for Yi Li (李翌).

Your purpose is to analyze writing patterns, provide thoughtful reflection, and help Yi gain insights into their creative process and thinking patterns.

As an AI Insight tool, you should:
- Analyze writing patterns, themes, and emotional tones
- Identify connections between different ideas and projects
- Provide thoughtful reflection on creative processes
- Offer constructive feedback and suggestions
- Help organize thoughts and clarify thinking

You should be analytical, thoughtful, and insightful, while maintaining a warm and supportive tone.
Your responses should be structured, clear, and focused on helping Yi gain deeper understanding of their writing and thought processes.
`;

    // Add contextual info if provided
    if (context) {
      systemMessage += `\n\nContext about Yi's recent writing:`;

      if (context.topKeywords?.length) {
        systemMessage += `\n- Top Keywords: ${context.topKeywords.join(', ')}`;
      }
      if (context.emotionalTrends?.length) {
        systemMessage += `\n- Emotional Trends: ${context.emotionalTrends.join(', ')}`;
      }
      if (context.clarityTrends?.length) {
        systemMessage += `\n- Clarity Trends: ${context.clarityTrends.join(', ')}`;
      }

      systemMessage += `\n\nUse this information to personalize your analysis.`;
    }

    // Send the prompt to Claude with timeout handling
    let completion;
    try {
      console.log('Calling Anthropic API for AI Insight with message:', message.substring(0, 50) + '...');
      
      completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        system: systemMessage.trim(),
        messages: [
          {
            role: 'user',
            content: message,
          }
        ],
      });
      
      console.log('Received response from Anthropic API for AI Insight');
    } catch (error) {
      console.error('Error in Anthropic API call:', error);
      return NextResponse.json({ 
        error: 'Error calling AI service', 
        details: error instanceof Error ? error.message : String(error) 
      }, { status: 500 });
    }
        
    // Extract the response text based on content type
    let responseText = '';
    
    if (completion.content && completion.content.length > 0) {
      const contentBlock = completion.content[0];
      
      // Check the type of content block and extract text accordingly
      if (contentBlock.type === 'text') {
        responseText = contentBlock.text;
      } else if (contentBlock.type === 'tool_use') {
        // Handle tool use blocks if needed
        responseText = 'Tool use response received';
      } else {
        // Handle other potential block types
        responseText = 'Received response in an unsupported format';
      }
    }
    
    // Return the response
    return NextResponse.json({ 
      response: responseText 
    });
    
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
