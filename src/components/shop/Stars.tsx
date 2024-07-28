import { HiStar } from 'react-icons/hi2';

interface StarsProps {
  ratingAvg: number;
}

function Stars({ ratingAvg }: StarsProps) {
  return (
    <span className='flex flex-row items-center text-xl text-black-50'>
      <HiStar />
      {ratingAvg}
    </span>
  );
}

export default Stars;
