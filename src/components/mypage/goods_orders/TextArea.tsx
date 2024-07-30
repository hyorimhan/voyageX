import React, { useRef, FormEventHandler } from 'react';

type ITextAreaProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalidMsg?: string;
  setInvalidMsg: (msg: string) => void; // 새로운 prop 추가
};

const TextArea: React.FC<ITextAreaProps> = ({
  placeholder,
  value,
  onChange,
  invalidMsg,
  setInvalidMsg, // 새로운 prop 추가
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const inputValue = (e.target as HTMLTextAreaElement).value;

    if (inputValue.length > 50) {
      setInvalidMsg('50자를 초과할 수 없습니다.');
      return;
    } else {
      setInvalidMsg('');
    }

    if (inputValue.match(/^\s+/)) {
      textarea.value = '';
      return;
    }

    onChange(inputValue);
  };

  const onBlur = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const trimmed = textarea.value.trim();
    onChange(trimmed);
  };

  return (
    <div className='relative'>
      <textarea
        className={`w-full border-none outline-none resize-none overflow-hidden text-sm font-medium h-[157px] p-4 rounded-lg text-black-400 bg-black-100 ${
          invalidMsg ? 'border-red-500' : 'border-gray-100'
        } focus:border-blue-500`}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onBlur={onBlur}
        ref={textareaRef}
        style={{
          height: '157px',
          lineHeight: '24px',
        }}
      />
      <p className='absolute bottom-4 right-4 text-xs text-gray-400'>
        50자 이내
      </p>
      {invalidMsg && (
        <p className='text-red-500 text-xs absolute left-3'>{invalidMsg}</p>
      )}
    </div>
  );
};

export default TextArea;
