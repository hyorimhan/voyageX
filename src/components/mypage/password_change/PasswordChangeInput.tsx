'use client';

import EyeOffIcon24px from '@/components/common/icons/24px/EyeOffIcon24px';
import EyeOnIcon24px from '@/components/common/icons/24px/EyeOnIcon24px';
import { ChangeEvent, useState } from 'react';

type InputProps = {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

const PasswordChangeInput = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='flex flex-col gap-1 h-[102px]'>
      <label>{label}</label>
      <div className='relative'>
        <input
          className={`text-black rounded-lg h-14 p-7 w-full ${
            error
              ? 'border-red-500'
              : 'border-black-400 hover:border-black-600 focus:border-primary-600'
          }`}
          placeholder={placeholder}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
        />
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 text-black'
        >
          {showPassword ? <EyeOnIcon24px /> : <EyeOffIcon24px />}
        </button>
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default PasswordChangeInput;
