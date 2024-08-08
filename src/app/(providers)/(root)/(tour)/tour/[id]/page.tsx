import Page from '@/components/pages/Page';
import TourDetail from '@/components/tour/tourDetail/TourDetail';
import { tourProps } from '@/types/tourPropsType';
import MainPage from '../../../(main)/page';

const TourDetailPage = ({ params }: tourProps) => {
  return (
    <Page>
      <TourDetail params={params} />
      {/* TODO 메인페이지를 다른 곳에서 export 해서 쓰시면 안됩니다  */}
      <MainPage tourId={params.id} />
    </Page>
  );
};

export default TourDetailPage;
