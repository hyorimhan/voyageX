import Page from '@/components/pages/Page';
import DetailPage from '@/components/community/read/DetailPage';

const PostDetailPage = ({ params }: { params: { postId: string } }) => {
  return <DetailPage params={params} />;
};

export default PostDetailPage;
