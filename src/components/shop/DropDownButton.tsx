import { Dispatch, SetStateAction, useState } from 'react';
import ArrowDownWhiteIcon20px from '../common/icons/20px/ArrowDownWhiteIcon20px';
import ArrowUpWhiteIcon20px from '../common/icons/20px/ArrowUpWhiteIcon20px';

interface DropDownButtonPropsType {
  categories: { [key: string]: string };
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

function DropDownButton(props: DropDownButtonPropsType) {
  const { categories, sortBy, setSortBy } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='relative inline-block'>
      <button
        type='button'
        className='text-black-50 text-lg cursor-pointer relative w-40 flex flex-row items-center mt-3 justify-between px-3'
        onClick={() => setIsActive((prev) => !prev)}
      >
        {categories[sortBy]}
        {isActive ? <ArrowUpWhiteIcon20px /> : <ArrowDownWhiteIcon20px />}
      </button>
      <ul
        className={`text-white cursor-pointer w-40 absolute border border-black-200 shadow-lg transition-all duration-300 ease-out overflow-hidden rounded`}
        style={{
          zIndex: 1000,
          maxHeight: isActive
            ? `${Object.keys(categories).length * 3}rem`
            : '0',
          opacity: isActive ? 1 : 0,
        }}
      >
        {isActive &&
          Object.entries(categories).map(([key, value]) => (
            <li
              key={key}
              className='cursor-pointer text-sm text-black-1000 bg-black-50 border border-black-100 hover:bg-black-200 flex items-center'
              style={{ height: '3rem' }}
              onClick={() => {
                setSortBy(key);
                setIsActive(false);
              }}
            >
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropDownButton;
