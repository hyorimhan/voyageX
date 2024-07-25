import Page from '@/components/pages/Page';
import PaymentWidget from '@/components/pay/PaymentWidget';

const PaymentPage = () => {
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <PaymentWidget />
      </Page>
    </>
  );
};

export default PaymentPage;
