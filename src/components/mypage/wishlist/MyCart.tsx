function MyCart() {
  const cartList = [
    {
      id: '123',
      상품이름: '티셔츠',
      상품사진:
        'data:image/png;base64,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',
      상품개수: 1,
      가격: 60200,
    },
    {
      id: '1234',
      상품이름: '바지',
      상품사진:
        'data:image/png;base64,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',
      상품개수: 2,
      가격: 30000,
    },
    {
      id: '12345',
      상품이름: '옷1',
      상품사진:
        'data:image/png;base64,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',
      상품개수: 1,
      가격: 20000,
    },
    {
      id: '12346',
      상품이름: '옷2',
      상품사진:
        'data:image/png;base64,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',
      상품개수: 3,
      가격: 10000,
    },
  ];
  return (
    <>
      <div>
        <div className='flex flex-row justify-between items-center mb-4'>
          <div className='flex flex-row items-center gap-4'>
            <button className='w-5 h-5 border-2 border-black-50 rounded'></button>
            <span className='text-base'>전체 (1/5)선택</span>
          </div>
          <button className='bg-primary-400 text-xs rounded p-1'>
            선택 삭제
          </button>
        </div>
        <ul className='flex flex-col gap-4'>
          {cartList.map((item) => (
            <li
              key={item.id}
              className='border-2 border-white p-4 rounded-lg grid grid-cols-[minmax(0,0.2fr)_minmax(0,0.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.5fr)]'
            >
              <button className='w-5 h-5 border-2 border-black-50 rounded self-center'></button>
              <div className='w-20 h-24 self-center'>
                <img
                  className='w-full h-full'
                  src={item.상품사진}
                  alt={item.상품이름}
                />
              </div>
              <div className='self-center'>
                <span className='text-base'>{item.상품이름}</span>
              </div>
              <div className='self-center flex flex-row gap-2 text-sm'>
                <button>-</button>
                <span>{item.상품개수}</span>
                <button>+</button>
              </div>
              <div className='self-center'>
                <span className='text-base'>{item.가격.toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className='border-t-2 border-white my-4'>
          <div className='flex flex-row justify-evenly p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 주문금액</span>
              <span className='text-lg'>100,000</span>
            </div>
            <div className='self-center'>
              <span className='text-lg'>+</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 배송비</span>
              <span className='text-lg'>0</span>
            </div>
            <div className='self-center'>
              <span className='text-lg'>=</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 결제금액</span>
              <span className='text-lg'>100,000</span>
            </div>
          </div>
        </div>
        <section className='flex flex-row gap-4 mb-20'>
          <button className='border-2 border-primary-600 w-1/2 rounded-lg p-4 text-base'>
            쇼핑 계속하기
          </button>
          <button className='bg-primary-600 w-1/2 rounded-lg p-4 text-base'>
            구매하기
          </button>
        </section>
      </div>
    </>
  );
}

export default MyCart;
