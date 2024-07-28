import Page from '@/components/pages/Page';
import TourDetail from '@/components/tour/tourDetail/TourDetail';
import { tourProps } from '@/types/tourPropsType';

const TourDetailPage = ({ params }: tourProps) => {
  return (
    <Page>
      <TourDetail params={params} />
    </Page>
  );
};

export default TourDetailPage;
