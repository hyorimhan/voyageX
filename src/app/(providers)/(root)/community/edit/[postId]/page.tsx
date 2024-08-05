import EditPost from '@/components/community/edit/EditPost';

const EditPage = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  return <EditPost postId={postId} />;
};

export default EditPage;
