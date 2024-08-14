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
    <div className='flex flex-col h-[102px]'>
      <label>{label}</label>
      <div className='relative'>
        <input
          className={`text-black rounded-lg h-14 p-7 w-full ${
            error
              ? 'border-error-900 border-2 text-black-1000 focus:outline-error-900'
              : 'border-black-200 border-2 hover:border-black-500 focus:border-black-500 focus:border-2 focus:text-black-1000 focus:outline-black-500'
          }`}
          placeholder={placeholder}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
        />
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute right-6 top-1/2 transform -translate-y-1/2 text-black'
        >
          {showPassword ? <EyeOnIcon24px /> : <EyeOffIcon24px />}
        </button>
      </div>
      {error && <p className='text-error-900 text-sm ml-2'>{error}</p>}
    </div>
  );
};

export default PasswordChangeInput;
