import React from 'react';

const PasswordChangePage = () => {
  return (
    <div>
      <p className='text-2xl mb-9'>비밀번호 변경</p>
      <div className='flex flex-col pr-80'>
        <div className='flex flex-col mb-7 gap-2'>
          <label>현재 비밀번호</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='비밀번호를 입력해주세요'
            type='password'
          />
        </div>
        <div className='flex flex-col mb-7 gap-2'>
          <label>신규 비밀번호</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='신규 비밀번호를 입력해주세요'
            type='password'
          />
        </div>
        <div className='flex flex-col mb-4 gap-2'>
          <label>신규 비밀번호 확인</label>
          <input
            className='text-black rounded-lg h-14 p-7'
            placeholder='입력하신 비밀번호를 다시 한 번 입력해주세요'
            type='password'
          />
        </div>
        <button className='bg-slate-500 h-14 rounded-lg'>회원정보 수정</button>
      </div>
    </div>
  );
};

export default PasswordChangePage;
