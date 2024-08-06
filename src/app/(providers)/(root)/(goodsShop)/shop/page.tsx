import GoodsList from '@/components/shop/GoodsList';
import { orbitron } from '../../../../../../public/fonts/orbitron';

const ShopPage = () => {
  return (
    <>
      <h1
        className={`border-b-2 border-white text-4xl font-bold text-white mt-20 py-4 ${orbitron.className}`}
      >
        GOODS SHOP
      </h1>
      <GoodsList />
    </>
  );
};

export default ShopPage;
