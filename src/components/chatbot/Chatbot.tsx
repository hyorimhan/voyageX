'use client';
import { useEffect } from 'react';
import { initializeChannelService } from './ChatbotUtils';
import { chatbot } from '@/services/chat';

function Chatbot() {
  useEffect(() => {
    const initializeChatbot = async () => {
      try {
        await chatbot();
        const chatbotResponse = await initializeChannelService();
        console.log('Chatbot response:', chatbotResponse);
      } catch (error) {
        console.error('Channel.io initialization error:', error);
      }
    };

    initializeChatbot();
  }, []);
  return null;
}

export default Chatbot;
