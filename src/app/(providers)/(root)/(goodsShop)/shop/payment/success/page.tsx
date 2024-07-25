import Page from '@/components/pages/Page';
import SuccessPayment from '@/components/shop/order/payment/SuccessPayment';

const SuccessPage = () => {
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <SuccessPayment />
      </Page>
    </>
  );
};

export default SuccessPage;
