import StarTrueIcon20px from '../common/icons/20px/StarTrueIcon20px';

interface StarsPropsType {
  ratingAvg: number;
}

function Stars({ ratingAvg }: StarsPropsType) {
  return (
    <span className='flex flex-row items-center text-black-50 text-sm gap-1'>
      <StarTrueIcon20px />
      <p>{ratingAvg.toFixed(1)}</p>
    </span>
  );
}

export default Stars;
