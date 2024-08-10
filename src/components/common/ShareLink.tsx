import Image from 'next/image';
import GenericModal from './GenericModal';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

function ShareLink() {
  const pathname = usePathname();
  const fullUrl = `${window.location.origin}${pathname}`;

  const [show, setShow] = useState(false);
  const copyUrl = async () => {
    await navigator.clipboard.writeText(fullUrl);
    toast.success('url이 복사되었습니다');
  };
  return (
    <>
      <button onClick={() => setShow(!show)}>
        <Image
          src={'/icons/32px/shareIcon.svg'}
          alt='share'
          width={32}
          height={32}
        />
        {show && (
          <GenericModal
            isOpen={show}
            title='공유하기'
            content={
              <div className='w-[352px] h-[58px] '>
                <input
                  onClick={(e) => e.stopPropagation()}
                  className='w-full h-full rounded-lg text-black-1000'
                  value={pathname}
                  readOnly
                />
              </div>
            }
            buttonText='URL 복사'
            buttonAction={copyUrl}
          />
        )}
      </button>
    </>
  );
}

export default ShareLink;
