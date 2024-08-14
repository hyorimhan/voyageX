'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import CheckBoxPressedIcon24px from '../common/icons/24px/CheckBoxPressedIcon24px';
import CheckBoxHoveredIcon24px from '../common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxDefaultIcon24px from '../common/icons/24px/CheckBoxDefaultIcon24px';
import ArrowRightIcon16px from '../common/icons/16px/ArrowRightIcon16px';

interface TermsAndConditionsItem {
  item: { id: string; title: string; modal: () => string };
  isAllAgree: string[];
  setIsAllAgree: Dispatch<SetStateAction<string[]>>;
}

function TermsAndConditionsItem({
  item,
  isAllAgree,
  setIsAllAgree,
}: TermsAndConditionsItem) {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleAgree = (id: string) => {
    if (!isAllAgree.includes(id)) {
      setIsAllAgree((prev) => [...prev, id]);
    } else {
      setIsAllAgree((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <li className='w-full flex ml-3 gap-2'>
      <button
        onClick={() => handleToggleAgree(item.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isAllAgree.includes(item.id) ? (
          <CheckBoxPressedIcon24px />
        ) : isHovered ? (
          <CheckBoxHoveredIcon24px />
        ) : (
          <CheckBoxDefaultIcon24px />
        )}
      </button>
      <p className='w-full text-xs text-black-200 flex flex-row items-center justify-between'>
        {item.title}
        <button onClick={() => item.modal()} className='mr-3'>
          <ArrowRightIcon16px />
        </button>
      </p>
    </li>
  );
}

export default TermsAndConditionsItem;
