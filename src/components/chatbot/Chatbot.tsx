'use client';
import { useEffect } from 'react';
import { initializeChannelService } from './ChatbotUtils';

function Chatbot() {
  useEffect(() => {
    initializeChannelService();
  }, []);
  return null;
}

export default Chatbot;
