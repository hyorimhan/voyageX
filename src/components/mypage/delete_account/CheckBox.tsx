'use client';

import { useState, useEffect } from 'react';
import CheckBoxDefaultIcon24px from '@/components/common/icons/24px/CheckBoxDefaultIcon24px';
import CheckBoxHoveredIcon24px from '@/components/common/icons/24px/CheckBoxHoveredIcon24px';
import CheckBoxPressedIcon24px from '@/components/common/icons/24px/CheckBoxPressedIcon24px';

type CheckBoxProps = {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  inputTypeCheckbox?: boolean;
};

const CheckBox = ({
  onChange,
  checked = false,
  inputTypeCheckbox = false,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedStatus = event.target.checked;
    setIsChecked(newCheckedStatus);
    onChange(newCheckedStatus);
  };

  const handleClick = () => {
    if (!inputTypeCheckbox) {
      const newCheckedStatus = !isChecked;
      setIsChecked(newCheckedStatus);
      onChange(newCheckedStatus);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='inline-block relative cursor-pointer'
    >
      {inputTypeCheckbox && (
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleInputChange}
          className='absolute left-0 top-0 w-6 h-6 opacity-0 cursor-pointer'
        />
      )}
      {isChecked ? (
        <CheckBoxPressedIcon24px />
      ) : isHovered ? (
        <CheckBoxHoveredIcon24px />
      ) : (
        <CheckBoxDefaultIcon24px />
      )}
    </div>
  );
};

export default CheckBox;
