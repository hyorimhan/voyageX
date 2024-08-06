import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex justify-center items-center fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[1000]'>
      <InfinitySpin width='200' color='#947cff' />
    </div>
  );
};

export default Loading;
