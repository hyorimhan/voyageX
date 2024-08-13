'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import CheckBoxPressedIcon24px from '../common/icons/24px/CheckBoxPressedIcon24px';
import CheckBoxHoveredIcon24px from '../common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxDefaultIcon24px from '../common/icons/24px/CheckBoxDefaultIcon24px';
import { termsAndConditionsList } from '@/constants/shop';
import TermsAndConditionsItem from './TermsAndConditionsItem';
import ArrowDownWhiteIcon20px from '../common/icons/20px/ArrowDownWhiteIcon20px';
import ArrowUpWhiteIcon20px from '../common/icons/20px/ArrowUpWhiteIcon20px';

interface TermsAndConditionsPropsType {
  isAllAgree: string[];
  setIsAllAgree: Dispatch<SetStateAction<string[]>>;
}

function TermsAndConditions({
  isAllAgree,
  setIsAllAgree,
}: TermsAndConditionsPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  const [isView, setIsView] = useState(false);

  const handleToggleAllAgree = () => {
    if (isAllAgree.length < termsAndConditionsList.length) {
      setIsAllAgree(termsAndConditionsList.map((item) => item.id));
    } else {
      setIsAllAgree([]);
    }
  };

  return (
    <ul className='flex flex-col items-start gap-2 w-full'>
      <div className='flex flex-row w-full'>
        <button
          onClick={handleToggleAllAgree}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isAllAgree.length === 2 ? (
            <CheckBoxPressedIcon24px />
          ) : isHovered ? (
            <CheckBoxHoveredIcon24px />
          ) : (
            <CheckBoxDefaultIcon24px />
          )}
        </button>
        <p className='w-full text-sm self-center text-white flex items-center justify-between'>
          [필수] 주문 내역에 대한 필수 동의
          <button onClick={() => setIsView((prev) => !prev)}>
            {isView ? <ArrowUpWhiteIcon20px /> : <ArrowDownWhiteIcon20px />}
          </button>
        </p>
      </div>
      {isView &&
        termsAndConditionsList.map((item) => (
          <TermsAndConditionsItem
            key={item.id}
            item={item}
            isAllAgree={isAllAgree}
            setIsAllAgree={setIsAllAgree}
          />
        ))}
    </ul>
  );
}

export default TermsAndConditions;
