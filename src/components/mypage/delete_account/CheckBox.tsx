'use client';

import { useState } from 'react';
import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';

type CheckBoxProps = {
  onChange: (checked: boolean) => void;
};

const CheckBox = ({ onChange }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    onChange(newCheckedStatus);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isChecked ? (
        <CheckBoxPressedIcon24px />
      ) : isHovered ? (
        <CheckBoxHoveredIcon24px />
      ) : (
        <CheckBoxDefaultIcon24px />
      )}
    </button>
  );
};

export default CheckBox;
