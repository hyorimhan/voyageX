'use client';
import useAuthStore from '@/zustand/store/useAuth';

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  return <div></div>;
};

export default HomePage;
