import PaymentWidget from '@/components/order/payment/PaymentWidget';
import Page from '@/components/pages/Page';

const PaymentPage = () => {
  return (
    <Page>
      <h1 className='border-b-[1px] border-white text-xl font-bold text-white mt-20 py-4'>
        결제하기
      </h1>
      <PaymentWidget />
    </Page>
  );
};

export default PaymentPage;
