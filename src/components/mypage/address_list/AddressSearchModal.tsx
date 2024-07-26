import DaumPostcodeEmbed from 'react-daum-postcode';
import themeObj from './AddressTheme';
import Modal from './ModalForm';

interface PostcodeModalProps {
  onComplete: (
    postcode: string,
    newAddress: string,
    oldAddress: string,
  ) => void;
  onClose: () => void;
}

const AddressSearchModal: React.FC<PostcodeModalProps> = ({
  onComplete,
  onClose,
}) => {
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

    onComplete(data.zonecode, newAddress, oldAddress);
  };

  return (
    <Modal onClose={onClose}>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        autoClose={false}
        defaultQuery=''
        style={{ width: '100%', height: '100%' }}
        autoMappingJibun={false}
        theme={themeObj}
      />
    </Modal>
  );
};

export default AddressSearchModal;
