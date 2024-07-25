function CustomerInfo() {
  return (
    <>
      <div className='border-2 border-white rounded-lg p-4'>
        <div className='py-4 mb-4'>
          <span className='text-xl'>주문자 정보</span>
        </div>
        <div className='flex flex-row items-start justify-between'>
          <div>
            <p>김철수</p>
            <p>010-1234-5678</p>
            <p>voyageX@gmail.com</p>
          </div>
          <div>
            <button className='bg-primary-400 rounded-lg p-2'>
              배송지 변경
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
