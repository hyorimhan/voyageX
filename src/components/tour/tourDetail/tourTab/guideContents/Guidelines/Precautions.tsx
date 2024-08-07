import { AccordionItem } from '@szhsin/react-accordion';
import React from 'react';
import AccordionImg from '../../tourContents/AccordionImg';

function Precautions() {
  return (
    <AccordionItem
      header={({ state: { isEnter } }) => (
        <div className='flex'>
          <div className='text-2xl font-semibold'>주의 사항</div>
          <AccordionImg isEnter={isEnter} />
        </div>
      )}
      className='mt-14'
    >
      <ul className='list-disc pl-5 mt-6 space-y-2'>
        <li>우주 여행 중에는 정기적인 건강 점검을 받아야 합니다.</li>
        <li>
          우주복은 반드시 착용해야 하며, 우주 외부 활동 시에는 특히 주의가
          필요합니다.
        </li>
        <li>
          모든 안전 장비를 올바르게 사용하고, 안전 수칙을 철저히 준수해야
          합니다.
        </li>
        <li>
          미리 계획된 일정에 따라 활동하며, 비상 상황에 대비한 훈련을 수시로
          진행합니다.
        </li>
        <li>
          임의로 우주선 내에서의 행동을 변경하거나 계획되지 않은 행동을 하지
          않도록 주의합니다.
        </li>
        <li>
          우주에서의 생활은 지구와 다르므로 스트레스가 발생할 수 있습니다.
        </li>
        <li>
          화재, 압력 손실, 의료 응급 상황 등에 대비한 훈련을 수시로 진행합니다.
        </li>
        <li>
          여행 확정 시 전달드릴 가이드를 통해 우주 여행을 준비하고 필요한 훈련을
          체계적으로 받을 수 있습니다.
        </li>
        <li>우주 여행은 특별한 경험인 만큼 철저한 준비와 훈련이 필요합니다.</li>
        <li>
          안전하고 즐거운 우주 여행을 위해 준비물을 꼼꼼히 챙기고, 훈련을 성실히
          이수해주세요.
        </li>
      </ul>
    </AccordionItem>
  );
}

export default Precautions;
