'use client';

import ArrowDownWhiteIcon32px from '@/components/common/icons/32px/ArrowDownWhiteIcon32px';
import ArrowUpWhiteIcon32px from '@/components/common/icons/32px/ArrowUpWhiteIcon32px';
import { useState } from 'react';

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState<{ [key: number]: boolean }>(
    {},
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const FAQList = [
    {
      question: '배송은 얼마나 걸리나요?',
      answer:
        '보통 배송은 주문 후 3-5 영업일 정도 소요됩니다. 특별한 상황이나 지연이 발생할 경우 고객님께 사전에 알려드리겠습니다.',
    },
    {
      question: '반품 및 교환 절차는 어떻게 되나요?',
      answer:
        '제품을 받으신 후 30일 이내에는 반품 및 교환을 신청하실 수 있습니다. 자세한 절차는 반품 및 교환 안내 페이지에서 확인하실 수 있습니다.',
    },
    {
      question: '결제 수단으로 무엇을 사용할 수 있나요?',
      answer:
        '현재 우리 사이트에서는 토스페이를 통한 결제를 지원하고 있습니다.',
    },
    {
      question: '제품의 품질에 대해 어떤 보증이 있나요?',
      answer:
        '저희 제품은 제조 결함으로부터 1년 동안 보증이 제공됩니다. 보증 기간 내에 제품에 문제가 있을 경우 무상으로 수리 혹은 교환해 드립니다.',
    },
    {
      question: '회원 가입은 필수인가요?',
      answer:
        '회원 가입은 필수 사항입니다. 비회원으로는 제품을 구매하실 수 없습니다.',
    },
  ];

  return (
    <div className='mb-[215px] sm:mx-5'>
      <div className='w-full text-center text-3xl mb-[61px]'>
        <div className='flex text-2xl gap-2 font-bold sm:mx-5'>
          <p>자주 묻는 질문</p>
          <p>FAQ</p>
        </div>
      </div>
      {FAQList.map((faq, index) => (
        <div
          key={index}
          className={`${
            index !== FAQList.length - 1
              ? 'border-black-800 border-b-[1px]'
              : ''
          }`}
        >
          <div
            className='flex justify-between w-full flex-grow p-6 items-center cursor-pointer bg-black-900'
            onClick={() => toggleFAQ(index)}
          >
            <p>{faq.question}</p>
            {openIndexes[index] ? (
              <ArrowUpWhiteIcon32px />
            ) : (
              <ArrowDownWhiteIcon32px />
            )}
          </div>
          {openIndexes[index] && (
            <div
              className={`flex w-full flex-grow text-sm pb-6 pt-4 px-8 items-center bg-black-900`}
            >
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
