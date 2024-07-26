import { formType } from '@/types/authFormType';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { checkboxValidate } from '../authValidate';
import TermsOfServiceModal from './modal/TermsOfServiceModal';
import privacyPolicyAndConsentModal from './modal/privacyPolicyAndConsentModal';

interface formProps {
  control: Control<formType>;
  setValue: UseFormSetValue<formType>;
  register: UseFormRegister<formType>;
}

function SignupCheckbox({ control, setValue, register }: formProps) {
  const age14 = useWatch({
    control,
    name: 'age14',
    defaultValue: false,
  });

  const terms = useWatch({
    control,
    name: 'terms',
    defaultValue: false,
  });

  const privacy = useWatch({
    control,
    name: 'privacy',
    defaultValue: false,
  });

  const allSelected = age14 && terms && privacy;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setValue('age14', isChecked);
    setValue('terms', isChecked);
    setValue('privacy', isChecked);
  };
  return (
    <>
      <div className='border-b-[1px] border-white my-2 pb-2'>
        <label className='font-bold'>
          <input
            type='checkbox'
            {...register('selectAll')}
            checked={allSelected}
            onChange={handleSelectAll}
            className='mr-2 text-black-50'
          />
          전체동의
        </label>
      </div>
      <div className='my-2 '>
        <label>
          <input
            type='checkbox'
            {...register('age14', checkboxValidate())}
            className='mr-2 text-black-50 '
          />
          [필수] 만 14세 이상입니다.
        </label>
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            {...register('terms', checkboxValidate())}
            className='mr-2 text-black-50 '
          />
          [필수] Voyage X 이용약관 동의
          <button
            type='button'
            onClick={() => TermsOfServiceModal()}
            className='ml-2 text-[13px] items-center text-black-50'
          >
            [상세]
          </button>
        </label>
      </div>

      <div className='my-2 '>
        <label>
          <input
            type='checkbox'
            {...register('privacy', checkboxValidate())}
            className='mr-2 text-black-50'
          />
          [필수] 개인정보 수집 및 이용동의
          <button
            type='button'
            onClick={() => privacyPolicyAndConsentModal()}
            className='ml-2 text-[13px] text-black-50'
          >
            [상세]
          </button>
        </label>
      </div>
    </>
  );
}

export default SignupCheckbox;
