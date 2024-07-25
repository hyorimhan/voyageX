import Page from '@/components/pages/Page';
import GoodsList from '@/components/shop/GoodsList';

const ShopPage = () => {
  return (
    <>
      <Page>
        <h1 className='border-b-2 border-white text-4xl font-bold text-white mt-20 py-4'>
          GOODS SHOP
        </h1>
        <GoodsList />
      </Page>
    </>
  );
};

export default ShopPage;
