import StarTrueIcon24px from '../common/icons/24px/StarTrueIcon24px';

interface StarsPropsType {
  ratingAvg: number;
}

function Stars({ ratingAvg }: StarsPropsType) {
  return (
    <span className='flex flex-row items-center text-xl text-black-50'>
      <StarTrueIcon24px />
      {ratingAvg.toFixed(1)}
    </span>
  );
}

export default Stars;
