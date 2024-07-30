import Image from 'next/image';

const TourOrdersPage = () => {
  return (
    <div>
      <p className='text-2xl mb-6'>여행상품 주문/배송조회</p>
      <div className='mb-10'>
        <p className='mb-2'>2024. 07. 12. 금</p>
        <div className='flex h-56 w-full text-slate-950 font-bold '>
          <div className='bg-primary-200 rounded-2xl flex py-6 px-12 w-full '>
            <div className='flex-grow'>
              <p className='text-xl'>FROM</p>
              <p className='text-4xl'>SEOUL</p>
              <p className='text-xl'>KOREA EARTH</p>
              <p className='mt-4 text-xl'>JULY 08, 2029</p>
              <p className='text-xl'>11:30 AM</p>
            </div>
            <div className='ml-auto'>
              <p className='text-xl'>TO</p>
              <p className='text-4xl font-bold'>MOON</p>
              <p className='text-xl'>UNIVERSE</p>
              <p className='mt-4 text-xl'>JULY 08, 2029</p>
              <p className='text-xl'>11:30 AM</p>
            </div>
          </div>
          <div className=' border-dashed border-l-2 border-slate-950 bg-white h-52 mt-2'></div>

          <div className='bg-white rounded-2xl text-black w-96 p-6 flex flex-col'>
            <p className='mb-3 font-bold text-xl'>Boarding Pass</p>
            <div className='flex justify-between mb-1'>
              <div>
                <p className='text-sm'>FROM</p>
                <p className='text-2xl font-bold'>SEOUL</p>
                <p className='text-sm'>EARTH</p>
              </div>
              <div>
                <p className='text-sm'>TO</p>
                <p className='text-2xl font-bold'>MOON</p>
                <p className='text-sm'>UNIVERSE</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <Image
                src='/images/barcode.svg'
                alt='barcode'
                height={50}
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOrdersPage;
