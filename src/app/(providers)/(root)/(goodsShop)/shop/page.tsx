import GoodsList from '@/components/shop/GoodsList';
import { orbitron } from '../../../../../../public/fonts/orbitron';

const ShopPage = () => {
  return (
    <>
      <h1
        className={`sm:mx-5 border-b-[1px] border-white text-4xl font-bold text-white  py-4 ${orbitron.className}`}
      >
        GOODS SHOP
      </h1>
      <GoodsList />
    </>
  );
};

export default ShopPage;
