import Script from 'next/script';

const AddressApiScript: React.FC = () => {
  return (
    <Script
      src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      strategy='afterInteractive'
      // onLoad={() => console.log('스크립트 로드 완료')}
    />
  );
};

export default AddressApiScript;
