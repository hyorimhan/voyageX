// import { formType } from '@/types/authFormType';
// import {
//   Control,
//   UseFormRegister,
//   UseFormSetValue,
//   useWatch,
// } from 'react-hook-form';

// import TermsOfServiceModal from './modal/TermsOfServiceModal';
// import privacyPolicyAndConsentModal from './modal/privacyPolicyAndConsentModal';
// // import { checkboxValidate } from '../AuthValidate';
// import CheckBox from '@/components/mypage/delete_account/CheckBox';

// interface formProps {
//   control: Control<formType>;
//   setValue: UseFormSetValue<formType>;
//   register: UseFormRegister<formType>;
// }

// function SignupCheckbox({ control, setValue, register }: formProps) {
//   const age14 = useWatch({
//     control,
//     name: 'age14',
//     defaultValue: false,
//   });

//   const terms = useWatch({
//     control,
//     name: 'terms',
//     defaultValue: false,
//   });

//   const privacy = useWatch({
//     control,
//     name: 'privacy',
//     defaultValue: false,
//   });

//   const allSelected = age14 && terms && privacy;

//   // const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const isChecked = e.target.checked;
//   //   setValue('age14', isChecked);
//   //   setValue('terms', isChecked);
//   //   setValue('privacy', isChecked);
//   // };

//   const handleSelectAll = (checked: boolean) => {
//     setValue('age14', checked);
//     setValue('terms', checked);
//     setValue('privacy', checked);
//   };
//   return (
//     <>
//       <div className='border-b my-2 pb-2'>
//         <label className='font-bold'>
//           {/* <input
//             type='checkbox'
//             {...register('selectAll')}
//             checked={allSelected}
//             onChange={handleSelectAll}
//             className='mr-2 hidden '
//           /> */}
//           <CheckBox onChange={(checked) => handleSelectAll(checked)} />
//           전체동의
//         </label>
//       </div>
//       <div className='my-2 '>
//         <label>
//           {/* <input
//             type='checkbox'
//             {...register('age14', checkboxValidate())}
//             className='mr-2 hidden'
//           /> */}
//           <CheckBox onChange={(checked) => setValue('age14', checked)} />
//           [필수] 만 14세 이상입니다.
//         </label>
//       </div>
//       <div>
//         <label>
//           {/* <input
//             type='checkbox'
//             {...register('terms', checkboxValidate())}
//             className='mr-2 hidden '
//           /> */}
//           <CheckBox onChange={(checked) => setValue('terms', checked)} />
//           [필수] Voyage X 이용약관 동의
//           <button
//             type='button'
//             onClick={() => TermsOfServiceModal()}
//             className='ml-2 text-xs items-center '
//           >
//             [상세]
//           </button>
//         </label>
//       </div>

//       <div className='my-2 '>
//         <label>
//           {/* <input
//             type='checkbox'
//             {...register('privacy', checkboxValidate())}
//             className='mr-2 hidden '
//           /> */}
//           <CheckBox onChange={(checked) => setValue('privacy', checked)} />
//           [필수] 개인정보 수집 및 이용동의
//           <button
//             type='button'
//             onClick={() => privacyPolicyAndConsentModal()}
//             className='ml-2 text-xs'
//           >
//             [상세]
//           </button>
//         </label>
//       </div>
//     </>
//   );
// }

// export default SignupCheckbox;

import { formType } from '@/types/authFormType';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';

import TermsOfServiceModal from './modal/TermsOfServiceModal';
import privacyPolicyAndConsentModal from './modal/privacyPolicyAndConsentModal';
// import { checkboxValidate } from '../AuthValidate';
import CheckBox from '@/components/mypage/delete_account/CheckBox';
import toast from 'react-hot-toast';

interface formProps {
  control: Control<formType>;
  setValue: UseFormSetValue<formType>;
  register: UseFormRegister<formType>;
}

// function SignupCheckbox({ control, setValue, register }: formProps) {
//   const age14 = useWatch({
//     control,
//     name: 'age14',
//     defaultValue: false,
//   });

//   const terms = useWatch({
//     control,
//     name: 'terms',
//     defaultValue: false,
//   });

//   const privacy = useWatch({
//     control,
//     name: 'privacy',
//     defaultValue: false,
//   });

//   const allSelected = age14 && terms && privacy;

//   const handleSelectAll = (checked: boolean) => {
//     setValue('age14', checked);
//     setValue('terms', checked);
//     setValue('privacy', checked);
//   };

//   return (
//     <>
//       <div className='border-b my-2 pb-2'>
//         <label className='font-bold'>
//           <CheckBox checked={allSelected} onChange={handleSelectAll} />
//           전체동의
//         </label>
//       </div>
//       <div className='my-2 '>
//         <label>
//           <CheckBox
//             checked={age14}
//             onChange={(checked) => setValue('age14', checked)}
//           />
//           [필수] 만 14세 이상입니다.
//         </label>
//       </div>
//       <div>
//         <label>
//           <CheckBox
//             checked={terms}
//             onChange={(checked) => setValue('terms', checked)}
//           />
//           [필수] Voyage X 이용약관 동의
//           <button
//             type='button'
//             onClick={() => TermsOfServiceModal()}
//             className='ml-2 text-xs items-center '
//           >
//             [상세]
//           </button>
//         </label>
//       </div>

//       <div className='my-2 '>
//         <label>
//           <CheckBox
//             checked={privacy}
//             onChange={(checked) => setValue('privacy', checked)}
//           />
//           [필수] 개인정보 수집 및 이용동의
//           <button
//             type='button'
//             onClick={() => privacyPolicyAndConsentModal()}
//             className='ml-2 text-xs'
//           >
//             [상세]
//           </button>
//         </label>
//       </div>
//     </>
//   );
// }

// export default SignupCheckbox;
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

  const handleSelectAll = () => {
    const newCheckedState = !allSelected;
    setValue('age14', newCheckedState);
    setValue('terms', newCheckedState);
    setValue('privacy', newCheckedState);
  };

  return (
    <>
      <div className='border-b my-2 pb-2'>
        <label className='font-bold flex'>
          <div>
            <CheckBox
              inputTypeCheckbox={true}
              checked={allSelected}
              onChange={handleSelectAll}
            />
          </div>
          전체동의
        </label>
      </div>
      <div className='my-2 '>
        <label className='flex'>
          <div>
            <CheckBox
              {...register('age14', {
                required: '체크박스를 모두 체크해주세요',
              })}
              checked={age14}
              onChange={(checked) => setValue('age14', checked)}
            />
          </div>
          [필수] 만 14세 이상입니다.
        </label>
      </div>
      <div>
        <label className='flex'>
          <div>
            <CheckBox
              {...register('terms', {
                required: '체크박스를 모두 체크해주세요',
              })}
              checked={terms}
              onChange={(checked) => setValue('terms', checked)}
            />
          </div>
          [필수] Voyage X 이용약관 동의
          <div>
            <button
              type='button'
              onClick={() => TermsOfServiceModal()}
              className='ml-2 text-xs items-center '
            >
              [상세]
            </button>
          </div>
        </label>
      </div>

      <div className='my-2 '>
        <label className='flex'>
          <div>
            <CheckBox
              {...register('privacy', {
                required: '체크박스를 모두 체크해주세요',
              })}
              checked={privacy}
              onChange={(checked) => setValue('privacy', checked)}
            />
          </div>
          [필수] 개인정보 수집 및 이용동의
          <div>
            <button
              type='button'
              onClick={() => privacyPolicyAndConsentModal()}
              className='ml-2 text-xs'
            >
              [상세]
            </button>
          </div>
        </label>
      </div>
    </>
  );
}
export default SignupCheckbox;
