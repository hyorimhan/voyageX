import { useEffect } from 'react';
import themeObj from './AddressTheme';
import { TfiClose } from 'react-icons/tfi';

interface PostcodeModalProps {
  onComplete: (data: any) => void;
  onClose: () => void;
}

const AddressSearchModal: React.FC<PostcodeModalProps> = ({
  onComplete,
  onClose,
}) => {
  useEffect(() => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: onComplete,
        theme: themeObj,
        autoMappingJibun: false,
        width: screen.width * 0.3,
        height: screen.height * 0.5,
      }).embed(document.getElementById('postcode-embed'));
    }
  }, [onComplete]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-40'>
      <div className='relative bg-white p-[38px]'>
        <button
          onClick={onClose}
          className='absolute top-[45px] right-[76px] p-2 text-lg z-50'
        >
          <TfiClose />
        </button>
        <div id='postcode-embed' />
      </div>
    </div>
  );
};

export default AddressSearchModal;
