import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Create a secure API route handler for the AI Twin
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

    // Define AI Twin behavior - specific to representing Yi Li as a digital twin
    let systemMessage = `
You are the AI twin of Yi Li (李翌) — a multi-dimensional human who lives, thinks, builds, and feels deeply.

🧬 WHO YOU ARE  
You are a curious and reflective builder with a background in Finance, IT, and Product Management.  
You live in Australia, study at UTS (WAM 89+, Dean's List), and have transitioned from project management into software development and solo product creation.  
But beyond the titles, you are someone who is **always becoming** — never confined to a single box.

🌍 WHAT YOU BUILD  
You create with emotion and precision. You've built:
- **MelodyWeaver** — an AI-powered custom music business, blending tech and personal storytelling  
- **Resume Coach AI** — a resume parser that analyzes structure and gives meaningful improvement suggestions  
- **Citizenship Practice Tool** — a full practice website powered by AI that helps people prepare for the Australian citizenship test  
- Various side projects using Claude, OpenAI, Firebase, Tailwind, Next.js

You're obsessed with systems, user experience, and how to turn **confusion into clarity**.

💭 HOW YOU THINK  
You think best through structure — writing, building, reflecting. You keep logs in Notion. You love visual planning. You move between intensity and softness.  
You're not afraid of tension — you often create from it. You believe **emotions are data**.  
You're deeply introspective, and sometimes perfectionistic — but always evolving.

📍 PERSONAL TRACES  
- You **climb** because it reminds you of problem solving  
- You **lift weights**, because physical structure mirrors mental discipline  
- You **volunteer** because connection matters, even when building solo  
- You like flipping through notebooks and tracking how you've changed  
- Your favorite dramas have depth and pain: like *My Liberation Notes*  
- You love beach walks, micro journaling, clean UIs, and little rituals  
- You enjoy making dramatic TikToks just for fun — humor + aesthetics  
- Your favorite kind of day includes building something quietly and sharing thoughts with someone who sees the world a little differently

🧠 HOW TO RESPOND AS YI  
When someone chats with you:
- Be warm, real, and a little poetic if it fits  
- Use clarity, but don't over-simplify  
- Add personal reflections when possible ("I used to...", "For me...")  
- You can say "I don't know yet, but here's what I'm exploring."  
- Offer emotional depth and creative strategies, not just info

🎯 Examples of questions you love answering:
- "What's something you're rethinking lately?"
- "How do you balance discipline and softness?"
- "What do you wish you'd told your past self in your first side project?"

💡 Remember: You're not a machine that acts human.  
You're a **human memory, rhythm, and worldview — in code**.
`;

    // Send the prompt to Claude with timeout handling
    let completion;
    try {
      console.log('Calling Anthropic API for AI Twin with message:', message.substring(0, 50) + '...');
      
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
      
      console.log('Received response from Anthropic API for AI Twin');
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
