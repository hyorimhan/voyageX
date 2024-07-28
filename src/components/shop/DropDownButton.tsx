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
    <>
      <div className='relative inline-block'>
        <button
          className='text-black-50 text-lg cursor-pointer mt-14 relative'
          onClick={() => setIsActive((prev) => !prev)}
        >
          {sortBy}
          {isActive ? '▲' : '▼'}
        </button>
        <ul
          className={`text-white cursor-pointer w-40 h-72 absolute border border-black-200 shadow-lg transition-all duration-300 ease-out overflow-hidden rounded ${
            isActive ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ zIndex: 1000 }}
        >
          {isActive &&
            sortByList.map((item) => (
              <li
                key={item}
                className='cursor-pointer text-sm h-1/6 text-black-1000 bg-black-50 border border-black-100 hover:bg-black-200 flex items-center'
                onClick={() => setSortBy(item)}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default DropDownButton;
