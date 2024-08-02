import EditPost from '@/components/community/edit/EditPost';

const EditPage = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  return (
    <div className='font-pretendard'>
      <EditPost postId={postId} />
    </div>
  );
};

export default EditPage;
