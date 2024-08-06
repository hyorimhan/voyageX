import PaymentWidget from '@/components/order/payment/PaymentWidget';
import { orbitron } from '../../../../../../../../public/fonts/orbitron';

const PaymentPage = () => {
  return (
    <>
      <h1
        className={`border-b-[1px] border-white text-xl font-bold text-white mt-20 py-4 ${orbitron.className}`}
      >
        결제하기
      </h1>
      <PaymentWidget />
    </>
  );
};

export default PaymentPage;
