'use client';

import GenericModal from '@/components/common/GenericModal';
import { deleteGoodsOrderDetail } from '@/services/goods';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TourOrderDetailListProps = {
  order_id: string;
};

const GoodsOrderDetailDeleteBtn = ({ order_id }: TourOrderDetailListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteTourOrder = async () => {
    try {
      await deleteGoodsOrderDetail(order_id);
    } catch (error) {
      console.error('삭제오류', error);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteTourOrder();
    setIsModalOpen(false);
    router.push('/mypage/goods_orders');
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className='text-xs text-black-50 bg-black-600 rounded-[4px] py-2 px-3 hover:bg-black-400 active:bg-black-500'
      >
        내역 삭제하기
      </button>
      <GenericModal
        isOpen={isModalOpen}
        title='주문 상세내역 삭제'
        content={
          <>
            주문하신 상품목록이 전체 삭제되며 복구하실 수 없습니다.
            <br />
            주문내역을 삭제하시겠습니까?
          </>
        }
        buttonText='확인'
        buttonAction={confirmDelete}
        cancelText='취소'
        cancelAction={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GoodsOrderDetailDeleteBtn;
