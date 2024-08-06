import React from 'react';
import TourGuideSWiper from './TourGuideSWiper';
import { Tour } from '@/types/tourPropsType';

function Contents({ tour }: { tour: Tour }) {
  return (
    <div>
      <div className='mt-12 text-2xl font-semibold'>
        {tour.planets?.name} 여행 패키지 일정
      </div>
      <div className='mt-6 font-medium'>{tour.planets?.title}</div>
      <div className='mt-6 font-medium'>{tour.planets?.description}</div>
      <div className='mt-6'>
        <ul>
          <li>
            1 DAY
            <ul>
              <li>아리조나 트레이닝 센터 내 조식</li>
              <li>무중력 적응훈련/Final</li>
              <li>중식(아리조나 현지식)</li>
              <li>우주선 탑승 및 이륙</li>
              <li>석식(특식 제공: 안심스테이크)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>2 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                지구 및 우주 사진촬영 진행(선택옵션: 전용망원경으로 촬영가능,
                $400/1장)
              </li>
              <li>중식(우주식)</li>
              <li>무중력에서 즐기는 보드게임 및 레크레이션</li>
              <li>석식(특식 제공: 샤브샤브)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>3 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>달 도착</li>
              <li>중식(우주식)</li>
              <li>
                달 내 무중력 탐험, 사진촬영 진행(선택옵션: 전용망원경으로
                촬영가능, $400/1장)
              </li>
              <li>석식(특식 제공: 달 현지식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>4 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                달 탐험 및 무중력 체험 2차(달 암초들 탐사작 진행) 및 중식(휴대용
                우주식)
              </li>
              <li>석식(특식 제공: 달 현지식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>5 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                달 탐험 및 무중력 체험 3차 진행(높이뛰기/멀리뛰기를 가라타나)
              </li>
              <li>중식(우주식)</li>
              <li>
                달 내 2차 촬영(선택옵션: 전용망원경으로 촬영가능, $400/1장) 및
                달 이착 준비
              </li>
              <li>석식(특식 제공: 삼겹살)</li>
              <li>이륙 - 우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>6 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>무중력에서 즐기는 보드게임 및 레크레이션 2차</li>
              <li>중식(우주식)</li>
              <li>
                지구와의 무전 커뮤니케이션 프로그램(강력추천 옵션: $80/1회)
              </li>
              <li>석식(특식 제공: 떡갈비 정식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>7 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                지구 및 우주 2차 사진촬영(선택옵션: 전용망원경으로 촬영가능,
                $400/1장) 및 지구 착륙 준비
              </li>
              <li>지구 착륙 후 석식(아리조나 현지식)</li>
              <li>아리조나 트레이닝 센터 내 휴식</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-4 '>
        <TourGuideSWiper />
      </div>
    </div>
  );
}

export default Contents;
