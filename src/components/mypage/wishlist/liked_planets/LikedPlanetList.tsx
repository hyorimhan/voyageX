import { useGetLikedToursByUser } from '@/hooks/apis/tours.api';
import { useRouter } from 'next/navigation';
import LikedPlanetItem from './LikedPlanetItem';
import Loading from '@/components/common/Loading';

interface LikedPlanetListPropsType {
  user_id: string;
}

function LikedPlanetList({ user_id }: LikedPlanetListPropsType) {
  const {
    data: likedTours,
    isError,
    isPending,
  } = useGetLikedToursByUser(user_id);

  const router = useRouter();

  const handleGoToItem = (id: string) => {
    router.push(`/tour/${id}`);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  return (
    <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {likedTours.length
        ? likedTours.map((item) => (
            <LikedPlanetItem
              key={item.id}
              user_id={user_id}
              item={item}
              handleGoToItem={handleGoToItem}
            />
          ))
        : '찜한 투어가 없습니다!'}
    </ul>
  );
}

export default LikedPlanetList;
