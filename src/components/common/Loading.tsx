import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <InfinitySpin width='200' color='#947cff' />
    </div>
  );
};

export default Loading;
