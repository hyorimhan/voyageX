import Page from '@/components/pages/Page';
import FailPayment from '@/components/shop/order/payment/FailPayment';

const FailPage = () => {
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <FailPayment />
      </Page>
    </>
  );
};

export default FailPage;
