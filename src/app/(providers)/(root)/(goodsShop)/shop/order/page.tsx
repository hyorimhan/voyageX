import Page from '@/components/pages/Page';
import OrderForm from '@/components/order/OrderForm';

const OrderPage = () => {
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-lg font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <OrderForm isTour={false} />
      </Page>
    </>
  );
};

export default OrderPage;
