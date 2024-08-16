import { phoneValidate } from '@/utils/tourValidation';
import { useState, ChangeEvent } from 'react';

const AddressForm = (initialData: any) => {
  const [postcode, setPostcode] = useState<string>(initialData?.postcode || '');
  const [newAddress, setNewAddress] = useState<string>(
    initialData?.address || '',
  );
  const [oldAddress, setOldAddress] = useState<string>(
    initialData?.oldAddress || '',
  );
  const [detailAddress, setDetailAddress] = useState<string>(
    initialData?.detailAddress || '',
  );
  const [alias, setAlias] = useState<string>(initialData?.alias || '');
  const [recipient, setRecipient] = useState<string>(
    initialData?.recipient || '',
  );
  const [phone, setPhone] = useState<string>(initialData?.phone || '');
  const [phoneError, setPhoneError] = useState<string>('');
  const [aliasError, setAliasError] = useState<string>('');
  const [recipientError, setRecipientError] = useState<string>('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = phoneValidate(e);
    setPhone(formattedValue);

    if (!/^(\d{3}-\d{4}-\d{4})$/.test(formattedValue)) {
      setPhoneError('숫자만 사용하여 주세요.');
    } else {
      setPhoneError('');
    }
  };

  const handleAliasChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const value = rawValue.replace(/\s/g, '');

    if (/\s/g.test(rawValue)) {
      setAliasError('공백은 사용이 불가능 합니다.');
    } else if (value.length > 6) {
      setAliasError('6글자 이내로 입력해주세요.');
    } else {
      setAliasError('');
    }

    setAlias(value);
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const value = rawValue.replace(/\s/g, '');

    if (/\s/g.test(rawValue)) {
      setRecipientError('공백은 사용이 불가능 합니다.');
    } else if (/[^a-zA-Z가-힣]/.test(value)) {
      setRecipientError('특수기호나 숫자를 사용할 수 없습니다.');
    } else {
      setRecipientError('');
    }

    setRecipient(value);
  };

  return {
    postcode,
    setPostcode,
    newAddress,
    setNewAddress,
    oldAddress,
    setOldAddress,
    detailAddress,
    setDetailAddress,
    alias,
    aliasError,
    handleAliasChange,
    recipient,
    recipientError,
    handleRecipientChange,
    phone,
    phoneError,
    handlePhoneChange,
  };
};

export default AddressForm;
