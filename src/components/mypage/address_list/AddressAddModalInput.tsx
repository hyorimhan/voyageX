'use client';

import React, { ChangeEvent } from 'react';

type AddressAddModalInputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
  onClick?: () => void;
};

const AddressAddModalInput = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  readOnly,
  onClick,
}: AddressAddModalInputProps) => {
  return (
    <div className='flex flex-col'>
      <label className='text-black-200 mb-1'>{label}</label>
      <div>
        <input
          className={`text-black-1000 rounded-lg h-[59px] py-5 px-6 w-full ${
            error
              ? 'border-error-900 border-2 text-black-1000 focus:outline-error-900'
              : 'border-black-200 border-2 hover:border-black-500 focus:border-black-500 focus:border-2 focus:text-black-1000 focus:outline-black-500'
          }`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          onClick={onClick}
        />
      </div>
      {error && <p className='text-red-500 text-sm ml-3'>{error}</p>}
    </div>
  );
};

export default AddressAddModalInput;
