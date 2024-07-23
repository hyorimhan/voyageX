import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import Head from 'next/head';

interface AddressAddModalProps {
  onClose: () => void;
}

declare global {
  interface Window {
    daum: any;
  }
}

const AddressAddModal: React.FC<AddressAddModalProps> = ({ onClose }) => {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('스크립트로드 완료');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        fullAddress += ` (${data.bname})`;
      }
      if (data.buildingName !== '') {
        fullAddress +=
          fullAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setDetailAddress('');
  };

  const themeObj = {
    bgColor: '#B3B3B3', //바탕 배경색
    searchBgColor: '#4E367C', //검색창 배경색
    //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: '#f2f2f2', //페이지 배경색
    //textColor: "", //기본 글자색
    queryTextColor: '#FFFFFF', //검색창 글자색
    //postcodeTextColor: "", //우편번호 글자색
    emphTextColor: '#4E367C', //강조 글자색
    // outlineColor: '"', //테두리
  };

  const handlePostCode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: handleComplete,
        theme: themeObj,
      }).open();
    } else {
      console.error('Daum postcode script is not loaded yet.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <Head>
        <script src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></script>
      </Head>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative'>
        <div className='flex justify-center items-center mb-4'>
          <p className='text-lg font-semibold text-white'>국내 배송지 추가</p>
          <button className='absolute right-4 top-4' onClick={onClose}>
            <IoMdClose className='text-white' />
          </button>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-400 mb-1'>주소별칭</label>
            <input
              className='w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='6글자 이내로 입력해주세요'
            />
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>받으실분</label>
            <input
              className='w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='이름을 입력해주세요'
            />
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>휴대폰 번호</label>
            <input
              className='w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='이름을 입력해주세요'
            />
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>배송주소</label>
            <div className='flex space-x-2'>
              <input
                className='w-1/3 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
                placeholder='우편번호'
                value={postcode}
                readOnly
              />
              <button
                className='w-2/3 px-4 py-2 bg-gray-600 text-white rounded-lg'
                onClick={handlePostCode}
              >
                우편번호 찾기
              </button>
            </div>
            <input
              className='mt-2 w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='주소'
              value={address}
              readOnly
            />
            <input
              className='mt-2 w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder='상세주소를 입력해주세요'
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </div>
        <button className='w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg'>
          배송지 저장
        </button>
      </div>
    </div>
  );
};

export default AddressAddModal;
