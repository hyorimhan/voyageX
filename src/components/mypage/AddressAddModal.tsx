import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import AddressApiScript from './AddressApiScript';

interface AddressAddModalProps {
  onClose: () => void;
  onAddAddress: (address: any) => void;
}

declare global {
  interface Window {
    daum: any;
  }
}

const AddressAddModal: React.FC<AddressAddModalProps> = ({
  onClose,
  onAddAddress,
}) => {
  const [postcode, setPostcode] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [oldAddress, setOldAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [alias, setAlias] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [phone, setPhone] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>('');
  const [aliasError, setAliasError] = useState<string>('');
  const [recipientError, setRecipientError] = useState<string>('');

  const handleComplete = (data: any) => {
    let newAddress = data.roadAddress;
    let oldAddress = data.jibunAddress;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        newAddress += ` (${data.bname})`;
      }
      if (data.buildingName !== '') {
        newAddress +=
          newAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    setPostcode(data.zonecode);
    setNewAddress(newAddress);
    setOldAddress(oldAddress);
    setDetailAddress('');
  };

  const themeObj = {
    bgColor: '#B3B3B3', //바탕 배경색
    searchBgColor: '#4E367C', //검색창 배경색
    pageBgColor: '#f2f2f2', //페이지 배경색
    queryTextColor: '#FFFFFF', //검색창 글자색
    emphTextColor: '#4E367C', //강조 글자색
  };

  const handlePostCode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: handleComplete,
        theme: themeObj,
      }).open();
    } else {
      console.error('스크립트 로드가 완료되지 않았습니다');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (rawValue.length <= 3) {
      formattedValue = rawValue;
    } else if (rawValue.length <= 7) {
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else {
      formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
        3,
        7,
      )}-${rawValue.slice(7, 11)}`;
    }
    setPhone(formattedValue);

    if (!/^(\d{3}-\d{4}-\d{4})$/.test(formattedValue)) {
      setPhoneError('올바른 형식으로 입력해주세요 (000-0000-0000)');
    } else {
      setPhoneError('');
    }
  };

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAlias(value);

    if (value.length > 6) {
      setAliasError('주소별칭은 6자 이내로 입력해주세요');
    } else {
      setAliasError('');
    }
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);

    if (/[^a-zA-Z가-힣\s]/.test(value)) {
      setRecipientError('받으실분에는 특수기호, 숫자를 사용할 수 없습니다.');
    } else {
      setRecipientError('');
    }
  };

  const handleSave = () => {
    if (aliasError || recipientError || phoneError) {
      alert('옳바르게 작성되지 않은 항목이 있습니다.');
      return;
    }

    if (!alias || !recipient || !phone || !postcode || !newAddress) {
      alert('작성하지 않은 항목이 있습니다.');
      return;
    }

    const newAddressData = {
      alias,
      postcode,
      address: newAddress || oldAddress,
      oldAddress,
      detailAddress,
      recipient,
      phone,
    };
    onAddAddress(newAddressData);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-900 bg-opacity-50 z-30'>
      //🔥
      <AddressApiScript />
      <div className='bg-black-800 p-6 rounded-lg shadow-lg relative w-96'>
        <div className='flex justify-center items-center mt-3'>
          <p className='text-lg font-semibold'>국내 배송지 추가</p>
          <button className='absolute right-4 top-4' onClick={onClose}>
            <IoMdClose className='text-3xl' />
          </button>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-400 mb-1'>주소별칭</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400 text-sm'
              placeholder='6글자 이내로 입력해주세요'
              value={alias}
              onChange={handleAliasChange}
            />
            {aliasError && (
              <p className='text-error-900 text-xs mt-1'>{aliasError}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>받으실분</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400 text-sm'
              placeholder='이름을 입력해주세요'
              value={recipient}
              onChange={handleRecipientChange}
            />
            {recipientError && (
              <p className='text-error-900 text-xs mt-1'>{recipientError}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>휴대폰 번호</label>
            <input
              className='w-full px-3 py-4 border rounded-lg text-black-400 text-sm'
              placeholder='000-0000-0000'
              value={phone}
              onChange={handlePhoneChange}
            />
            {phoneError && (
              <p className='text-error-900 text-xs mt-1'>{phoneError}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-400 mb-1'>배송주소</label>
            <div className='flex gap-2'>
              <input
                className='px-3 py-4 border rounded-lg text-black-400 text-sm w-full'
                placeholder='.'
                value={newAddress || oldAddress || postcode}
                readOnly
              />
              <button
                className='px-4 py-2 bg-white text-black-900 text-sm rounded-lg w-48'
                onClick={handlePostCode}
              >
                우편번호 찾기
              </button>
              {/* //🔥 */}
            </div>
            <input
              className='mt-2 w-full px-3 py-4 border rounded-lg text-black-400 text-sm'
              placeholder='상세주소를 입력해주세요'
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </div>
        <button
          className='w-full mt-6 px-4 py-4 bg-primary-600 rounded-lg'
          onClick={handleSave}
        >
          배송지 저장
        </button>
      </div>
    </div>
  );
};

export default AddressAddModal;
