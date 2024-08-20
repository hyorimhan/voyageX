'use client';

import { useState } from 'react';
import ArrowDownWhiteIcon32px from '@/components/common/icons/32px/ArrowDownWhiteIcon32px';
import ArrowUpWhiteIcon32px from '@/components/common/icons/32px/ArrowUpWhiteIcon32px';

type GoodsDetailsAccordionProps = {
  details: {
    [key: string]: string;
  };
};

const GoodsDetailsAccordion = ({ details }: GoodsDetailsAccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<{ [key: number]: boolean }>(
    {},
  );

  const toggleSection = (index: number) => {
    setOpenIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const detailsEntries = Object.entries(details);

  return (
    <div className='mt-8 flex flex-col mb-14 sm:mx-5'>
      {detailsEntries.map(([key, value], index) => (
        <div
          key={index}
          className={`${
            index !== detailsEntries.length - 1
              ? 'border-black-800 border-b-[1px]'
              : ''
          }`}
        >
          <div
            className='flex justify-between w-full flex-grow p-6 items-center cursor-pointer bg-black-900'
            onClick={() => toggleSection(index)}
          >
            <p>{key}</p>
            {openIndexes[index] ? (
              <ArrowUpWhiteIcon32px />
            ) : (
              <ArrowDownWhiteIcon32px />
            )}
          </div>
          {openIndexes[index] && (
            <div
              className={`flex w-full flex-grow text-sm pb-6 pt-4 px-8 items-center bg-black-900`}
            >
              <p>
                {value.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoodsDetailsAccordion;
