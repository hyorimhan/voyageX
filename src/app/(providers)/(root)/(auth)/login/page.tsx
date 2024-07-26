// import LoginForm from '@/components/auth/login/LoginForm';
// import Page from '@/components/pages/Page';
// import { createClient } from '@/supabase/client';

// const LoginPage = async () => {
//   const supabase = createClient();
//   const { data: userInfo } = await supabase.auth.getUser();

//   return (
//     <Page>
//       <LoginForm />
//     </Page>
//   );
// };

// export default LoginPage;
'use client';
import { useEffect } from 'react';
import LoginForm from '@/components/auth/login/LoginForm';
import Page from '@/components/pages/Page';
import { chatbot } from '@/services/chat';
import { initializeChannelService } from '@/services/chatUtils';

const LoginPage = () => {
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

  return (
    <Page>
      <LoginForm />
    </Page>
  );
};

export default LoginPage;
