import { Dispatch, SetStateAction, useState } from 'react';

interface DropDownButtonProps {
  sortByList: string[];
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

function DropDownButton(props: DropDownButtonProps) {
  const { sortByList, sortBy, setSortBy } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='relative inline-block'>
      <button
        className='text-white cursor-pointer w-32 py-2 rounded'
        onClick={() => setIsActive((prev) => !prev)}
      >
        {sortBy}
        {isActive ? '▲' : '▼'}
      </button>
      <ul
        className={`text-white cursor-pointer w-32 absolute border border-gray-300 shadow-lg transition-all duration-300 ease-out overflow-hidden rounded ${
          isActive ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isActive &&
          sortByList.map((item) => (
            <li
              key={item}
              className='cursor-pointer w-full bg-white text-black hover:bg-gray-500'
              onClick={() => setSortBy(item)}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropDownButton;
