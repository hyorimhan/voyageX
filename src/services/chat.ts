// export const chatbot = async () => {
//   try {
//     const response = await fetch('/api/chatbot/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Chatbot response:', data);
//     return data;
//   } catch (error) {
//     console.error('Error while fetching chatbot data:', error);
//     return null;
//   }
// };
