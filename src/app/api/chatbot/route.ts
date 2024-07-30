import { initializeChannelService } from '@/components/chatbot/ChatbotUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await initializeChannelService();
    return NextResponse.json({
      message: 'Channel.io initialized successfully',
    });
  } catch (error) {
    console.error('Channel.io initialization error:', error);
    return NextResponse.json(
      { error: 'Channel.io initialization failed' },
      { status: 500 },
    );
  }
}
