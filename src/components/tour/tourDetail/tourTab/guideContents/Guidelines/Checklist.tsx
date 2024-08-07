import AccordionItems from './AccordionItems';

function Checklist() {
  return (
    <>
      <div className='text-2xl font-semibold'>필수 준비물</div>
      <AccordionItems
        title={'개인용 준비물'}
        contents={
          <ul>
            <li className='flex mt-10'>
              <ul className='list-disc pl-5 space-y-2'>
                <li>
                  의류: 기본 속옷, 개인 취향의 티셔츠 및 바지(우주복 아래에
                  착용)
                </li>
                <li>신발: 우주복에 맞는 특수 신발</li>
                <li>세면도구: 치약, 칫솔, 개인용 타월, 간단한 스킨케어 제품</li>
                <li>약품: 개인적으로 필요한 약, 멀미약</li>
                <li>기타: 안대, 개인용 위생용품</li>
              </ul>
            </li>
          </ul>
        }
        containerStyle={'border-b border-b-black-700 mt-8'}
      />
      <AccordionItems
        title={'여행사 제공 물품'}
        contents={
          <ul>
            <li className='flex mt-10'>
              <ul className='list-disc pl-5 space-y-2'>
                <li>우주복: 개인 맞춤형 우주복</li>
                <li>헬멧 및 장갑: 안전을 위한 필수 장비</li>
                <li>산소 공급 장치: 우주복과 연결된 산소 공급 시스템</li>
                <li>탑승자 전용 가방: 개인 소지품을 보관할 수 있는 가방</li>
              </ul>
            </li>
          </ul>
        }
        containerStyle={'border-b border-b-black-700'}
      />
    </>
  );
}

export default Checklist;
