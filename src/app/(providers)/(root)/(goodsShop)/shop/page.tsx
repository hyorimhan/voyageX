import GoodsList from '@/components/shop/GoodsList';
import { orbitron } from '../../../../../../public/fonts/orbitron';

const ShopPage = () => {
  return (
    <>
      <h1
        className={`sm:mx-5 sm:mt-[94px] sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-white mb-4 ${orbitron.className}`}
      >
        GOODS SHOP
      </h1>
      <GoodsList />
    </>
  );
};

export default ShopPage;
