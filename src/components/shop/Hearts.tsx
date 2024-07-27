'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

interface HeartsProps {
  goods_id: string;
}

function Hearts({ goods_id }: HeartsProps) {
  const handleLIkeGoods = async (goods_id: string) => {
    const response = await axios.post(
      `/api/goods/${goods_id}?user_id=a58935a0-edcf-4456-8c3b-7d7e90783262`,
    );
    return response;
  };
  return (
    <>
      <span
        className={`cursor-pointer text-3xl ${'text-black-50'}`}
        onClick={() => handleLIkeGoods(goods_id)}
      >
        <IoHeartOutline />
      </span>
    </>
  );
}

export default Hearts;
