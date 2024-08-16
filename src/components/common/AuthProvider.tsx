// 'use client';

// import { userLoginInfo } from '@/services/auth';
// import useAuthStore from '@/zustand/store/useAuth';
// import { useEffect } from 'react';

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const saveUser = useAuthStore((state) => state.saveUser);

//   // useEffect(() => {
//   //   const {
//   //     data: { subscription },
//   //   } = supabase.auth.onAuthStateChange((_event, session) => {
//   //     if (session) {
//   //       saveUser(session.user);
//   //     } else {
//   //       saveUser(null);
//   //     }
//   //   });

//   //   return () => subscription.unsubscribe();
//   // }, [saveUser]);

//   useEffect(() => {
//     const loginInfo = async () => {
//       const userInfo = await userLoginInfo();
//       saveUser(userInfo);
//     };
//     loginInfo();
//   }, []);

//   return children;
// }
