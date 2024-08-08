import Page from '@/components/pages/Page';
import TourDetail from '@/components/tour/tourDetail/TourDetail';
import { tourProps } from '@/types/tourPropsType';
import MainPage from '../../../(main)/page';

const TourDetailPage = ({ params }: tourProps) => {
  return (
    <Page>
      <TourDetail params={params} />
      <MainPage tourId={params.id} />
    </Page>
  );
};

export default TourDetailPage;
