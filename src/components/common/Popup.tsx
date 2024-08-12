import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import GenericModal from './GenericModal';
import Image from 'next/image';
import CheckBox from '../mypage/delete_account/CheckBox';

function Popup() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [checkModalBtn, setCheckModalBtn] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(['event']);

  const handleChange = (e: boolean) => {
    setCheckModalBtn(e);
  };

  const expiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  useEffect(() => {
    if (!cookies.event) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [cookies]);

  const handleCloseModal = () => {
    setIsOpen(false);
    if (checkModalBtn) {
      const expires = expiredDate(1);
      setCookies('event', 'true', { path: '/', expires });
    }
  };

  return (
    <div className={`fixed  bg-opacity-50 z-[999]`} onClick={handleCloseModal}>
      <GenericModal
        isOpen={isOpen}
        title='여행상품 & 굿즈샵의 모든 상품들은 실제로 결제되지 않습니다'
        content={
          <div className='w-full sm:w-full h-[58px]  '>
            <div>
              <div>
                <Image
                  src={'/images/ticket.png'}
                  alt='ticket_img'
                  width={800}
                  height={700}
                />
              </div>
              <div className='lg:text-lg my-5  '>
                여행상품은 결제하시면 위 예시처럼 티켓 이미지를 저장할 수
                있습니다
              </div>
              <div className='lg:text-lg my-5 '>
                알람은 뜨지만 실제로 돈이 빠져나가지 않으니 걱정말고
                결제해보세요!
              </div>
            </div>
          </div>
        }
        popupTitle={'text-white text-center'}
        popupWidth={'w-[700px]'}
        popupContent={'flex-grow'}
        popup={'h-[70%] sm:h-[550px]'}
        buttonText={'확인'}
        buttonAction={handleCloseModal}
        popupButton={
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex items-center '
          >
            <CheckBox checked={checkModalBtn} onChange={handleChange} />
            <label htmlFor='checkbox' className='p-2'>
              오늘 하루 보지 않기
            </label>
          </div>
        }
      />
    </div>
  );
}

export default Popup;
