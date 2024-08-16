import AccordionItems from './AccordionItems';

function Training() {
  return (
    <>
      <>
        <div className='text-2xl font-semibold mt-[88px]'>필수 훈련 과정</div>
        <div className='mt-2'>
          <span className='underline mr-1 '>
            (우주여행 전 필수 훈련 과정에 참여해야만 우주여행이 가능합니다.
          </span>
          모든 훈련은 NASA에서 주최하고 있습니다. 이 외 궁금한 점이 있으시면
          챗봇을 통해 문의바랍니다.)
        </div>
        <AccordionItems
          title={'기초 훈련'}
          contents={
            <ul>
              <li className='flex mt-10'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    신체 검사 및 건강 진단: 우주 여행에 적합한 신체 상태인지
                    확인
                  </li>
                  <li>
                    기초 체력 훈련: 유산소 운동, 근력 운동 등 전반적인 체력 향상
                  </li>
                </ul>
              </li>
            </ul>
          }
          containerStyle={'border-b border-b-black-700 mt-14'}
        />
        <AccordionItems
          title={'특수 훈련'}
          contents={
            <ul>
              <li className='flex mt-10'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    무중력 훈련: 무중력 상태에서의 움직임을 익히기 위해 무중력
                    비행기에서 훈련
                  </li>
                  <li>수중 훈련: 수중에서의 활동을 통해 무중력 환경을 체험</li>
                  <li>
                    가상 현실 훈련: 가상 현실 시스템을 이용하여 우주선 내부 및
                    외부 활동 시뮬레이션
                  </li>
                </ul>
              </li>
            </ul>
          }
          containerStyle={'border-b border-b-black-700'}
        />
        <AccordionItems
          title={'우주선 및 장비 사용 훈련'}
          contents={
            <ul>
              <li className='flex mt-10'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    우주선 조작 훈련: 기본적인 우주선 조작 방법 및 비상 상황
                    대처 방법
                  </li>
                  <li>
                    우주복 착용 및 사용 훈련: 우주복 착용 방법 및 사용법 익히기
                  </li>
                  <li>
                    생명 유지 시스템 훈련: 우주선의 생명 유지 장치 사용법과
                    유지관리 방법
                  </li>
                </ul>
              </li>
            </ul>
          }
          containerStyle={'border-b border-b-black-700'}
        />
        <AccordionItems
          title={'응급 상황 대처 훈련'}
          contents={
            <ul>
              <li className='flex mt-10'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    응급 의료 훈련: 우주에서 발생할 수 있는 응급 상황 대처법{' '}
                  </li>
                  <li>
                    화재 및 압력 손실 대처 훈련: 우주선 내 화재 발생 시와 압력
                    손실 상황 시 대처법
                  </li>
                  <li>탈출 훈련: 우주선에서 긴급 탈출 시 필요한 절차와 방법</li>
                </ul>
              </li>
            </ul>
          }
          containerStyle={'border-b border-b-black-700'}
        />
        <AccordionItems
          title={'심리적 안정 훈련'}
          contents={
            <ul>
              <li className='flex mt-10'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    스트레스 관리 훈련: 장기간의 우주 여행에서 발생할 수 있는
                    스트레스 관리 방법
                  </li>
                  <li>
                    팀워크 및 커뮤니케이션 훈련: 다른 승무원들과의 효과적인 소통
                    및 협력 방법
                  </li>
                </ul>
              </li>
            </ul>
          }
          containerStyle={'border-b border-b-black-700'}
        />
      </>
    </>
  );
}

export default Training;
