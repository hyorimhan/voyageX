'use client';
import { Tour } from '@/types/tourPropsType';
import Image from 'next/image';
import Link from 'next/link';

function DetailCard({ tour }: { tour: Tour }) {
  return (
    <>
      <div className='  mt-40 flex '>
        <div className='flex w-[500px] h-[500px]'>
          <Image
            src={tour.planets.planet_img}
            alt={tour.planets.name!}
            width={500}
            height={500}
            className='m-6 '
          />
        </div>
        <div className='w-[504px] h-[552px] ml-16'>
          <div className='text-2xl mb-4'>
            {tour.planets.name} {tour.planets.english_name}
          </div>
          <div></div>
          <div className='text-sm mb-8'>{tour.tag}</div>
          <div className='text-lg mb-[12px]'>6박 7일 패키지</div>
          <div className='text-2xl mb-[32px]'>
            {tour.price?.toLocaleString()}원
          </div>
          <div className='text-[14px] border-t '>
            <div className=' border-b my-3  pb-3'>출발확정 2025.10.10</div>
            <div className=' border-b my-3  pb-3'>
              여행기간 2025.10.10 ~2025.10.20
            </div>
            <div className=' border-b my-3  pb-3 '>우주선 명 스타라이저</div>
            <div className=' border-b my-3  pb-3'>티켓 배송비 3000원</div>
          </div>
          <Link href={`/tour/payment/${tour.id}`}>
            <div className='h-[60px] bg-primary-600 rounded-lg justify-center flex items-center mt-[71px]'>
              구매하기
            </div>
          </Link>
        </div>
      </div>
      <div className='mt-12 border-black-600 border-t '>
        <div className='mt-12 text-2xl'>
          {tour.planets.name} 여행 패키지 일정
        </div>
        <div className='mt-6'>{tour.planets.title}</div>
        <div className='mt-6'>{tour.planets.description}</div>
      </div>

      <div>
        <h2>우주 여행 준비 가이드</h2>

        <h3>우주 여행 준비물</h3>
        <ul>
          <li>
            <h4>1. 개인용 준비물</h4>
            <ul>
              <li>
                의류: 우주복, 기본 속옷, 개인 취향의 티셔츠 및 바지 (우주복
                아래에 착용)
              </li>
              <li>신발: 우주복에 맞는 특수 신발</li>
              <li>세면도구: 치약, 칫솔, 개인용 타월, 간단한 스킨케어 제품</li>
              <li>약품: 개인적으로 필요한 약, 멀미약</li>
              <li>기타: 안대, 귀마개, 개인용 위생용품</li>
            </ul>
          </li>
          <li>
            <h4>2. 기술 장비</h4>
            <ul>
              <li>노트북 및 태블릿: 개인 연구 및 오락용</li>
              <li>카메라: 사진 촬영용</li>
              <li>헤드폰: 음악 감상 및 소음 차단용</li>
              <li>충전기 및 배터리: 모든 전자기기의 충전기 및 예비 배터리</li>
            </ul>
          </li>
          <li>
            <h4>3. 기타 준비물</h4>
            <ul>
              <li>
                책 및 오락거리: 장시간의 여정 동안 즐길 수 있는 도서나 게임
              </li>
              <li>기록용 노트 및 펜: 여행 기록 및 메모 용도</li>
              <li>개인 식품: 개인 기호에 맞는 스낵 및 식품 (가능한 경우)</li>
            </ul>
          </li>
        </ul>

        <h3>여행사가 제공하는 물품</h3>
        <ul>
          <li>
            <h4>1. 기본 제공 물품</h4>
            <ul>
              <li>우주복: 개인 맞춤형 우주복</li>
              <li>헬멧 및 장갑: 안전을 위한 필수 장비</li>
              <li>산소 공급 장치: 우주복과 연결된 산소 공급 시스템</li>
              <li>의료 키트: 응급 상황에 대비한 기본 의료 용품</li>
              <li>수면 장비: 수면용 안대 및 귀마개</li>
              <li>위생 용품: 일회용 타월, 비누, 치약, 칫솔 등</li>
            </ul>
          </li>
          <li>
            <h4>2. 식사 및 음료</h4>
            <ul>
              <li>
                우주 식품: 영양 균형이 맞는 우주 식품 패키지 (아침, 점심, 저녁
                및 스낵 포함)
              </li>
              <li>음료: 물, 주스 등 기본 음료</li>
            </ul>
          </li>
          <li>
            <h4>3. 안전 장비</h4>
            <ul>
              <li>구명 장비: 비상 상황 시 사용되는 구명 장비</li>
              <li>소화기: 화재 발생 시 사용</li>
            </ul>
          </li>
          <li>
            <h4>4. 편의 장비</h4>
            <ul>
              <li>탑승자 전용 가방: 개인 소지품을 보관할 수 있는 가방</li>
              <li>비디오/오디오 장비: 기록 및 오락용</li>
            </ul>
          </li>
        </ul>

        <h3>우주 여행 훈련 과정</h3>
        <ul>
          <li>
            <h4>1. 기초 훈련</h4>
            <ul>
              <li>
                신체 검사 및 건강 진단: 우주 여행에 적합한 신체 상태인지 확인
              </li>
              <li>
                기초 체력 훈련: 유산소 운동, 근력 운동 등 전반적인 체력 향상
              </li>
            </ul>
          </li>
          <li>
            <h4>2. 특수 훈련</h4>
            <ul>
              <li>
                무중력 훈련: 무중력 상태에서의 움직임을 익히기 위해 무중력
                비행기에서 훈련
              </li>
              <li>수중 훈련: 수중에서의 활동을 통해 무중력 환경을 체험</li>
              <li>
                가상 현실 훈련: 가상 현실 시스템을 이용하여 우주선 내부 및 외부
                활동을 시뮬레이션
              </li>
            </ul>
          </li>
          <li>
            <h4>3. 우주선 및 장비 사용 훈련</h4>
            <ul>
              <li>
                우주선 조작 훈련: 기본적인 우주선 조작 방법 및 비상 상황 대처
                방법
              </li>
              <li>
                우주복 착용 및 사용 훈련: 우주복 착용 방법 및 사용법 익히기
              </li>
              <li>
                생명 유지 시스템 훈련: 우주선의 생명 유지 장치 사용법과 유지
                관리 방법
              </li>
            </ul>
          </li>
          <li>
            <h4>4. 응급 상황 대처 훈련</h4>
            <ul>
              <li>
                응급 의료 훈련: 우주에서 발생할 수 있는 응급 상황에 대처하는
                방법 (응급처치, 심폐소생술 등)
              </li>
              <li>
                화재 및 압력 손실 대처 훈련: 우주선 내 화재 발생 시 대처법과
                압력 손실 상황에서의 대처법
              </li>
              <li>탈출 훈련: 우주선에서 긴급 탈출 시 필요한 절차와 방법</li>
            </ul>
          </li>
          <li>
            <h4>5. 심리적 준비</h4>
            <ul>
              <li>
                스트레스 관리 훈련: 장기간의 우주 여행에서 발생할 수 있는
                스트레스 관리 방법
              </li>
              <li>
                팀워크 및 커뮤니케이션 훈련: 다른 승무원들과의 효과적인 소통 및
                협력 방법
              </li>
            </ul>
          </li>
        </ul>

        <h3>우주 여행 제한 사항</h3>
        <ul>
          <li>
            <h4>1. 연령 제한</h4>
            <ul>
              <li>
                최소 연령: 우주 여행에 참여하기 위해서는 최소 만 18세 이상이어야
                합니다.
              </li>
              <li>
                최대 연령: 건강 상태에 따라 다르지만, 일반적으로 만 65세 이상은
                신체 검사 결과에 따라 제한될 수 있습니다.
              </li>
            </ul>
          </li>
          <li>
            <h4>2. 건강 제한</h4>
            <ul>
              <li>
                기본 건강 상태: 심혈관 질환, 호흡기 질환, 심각한 정신 질환 등이
                있는 경우 우주 여행이 제한될 수 있습니다.
              </li>
              <li>
                신체 검사: 모든 참가자는 사전에 철저한 신체 검사를 받아야 하며,
                결과에 따라 여행 참여 여부가 결정됩니다.
              </li>
            </ul>
          </li>
        </ul>

        <h3>우주 여행 중 주의사항</h3>
        <ul>
          <li>
            우주 여행 중에는 정기적인 건강 점검을 받아야 하며, 충분한 수면을
            취하고 균형 잡힌 식사를 유지해야 합니다. 수분을 충분히 섭취하는 것도
            중요합니다.
          </li>
          <li>
            우주복은 반드시 착용해야 하며, 우주 외부 활동 시에는 특히 주의가
            필요합니다. 모든 안전 장비를 올바르게 사용하고, 안전 수칙을 철저히
            준수해야 합니다.
          </li>
          <li>
            미리 계획된 일정에 따라 활동하며, 비상 상황에 대비한 훈련을 수시로
            반복해야 합니다. 임의로 우주선 내에서의 행동을 변경하거나 계획되지
            않은 행동을 하지 않도록 주의합니다.
          </li>
          <li>
            우주에서의 생활은 지구와 다르므로 스트레스가 발생할 수 있습니다.
            이를 해소하기 위해 명상, 음악 감상 등 다양한 방법을 사용하며,
            팀원들과의 지속적인 소통을 통해 심리적 안정을 도모해야 합니다.
          </li>
          <li>
            화재, 압력 손실, 의료 응급 상황 등에 대비한 훈련을 수시로 반복하고,
            비상 탈출 절차를 숙지해야 합니다. 비상 상황 발생 시 침착하게 대처할
            수 있도록 준비합니다.
          </li>
        </ul>

        <p>
          이 가이드를 통해 우주 여행을 준비하고 필요한 훈련을 체계적으로 받을 수
          있습니다. 우주 여행은 특별한 경험인 만큼 철저한 준비와 훈련이
          필요합니다. 안전하고 즐거운 우주 여행을 위해 준비물을 꼼꼼히 챙기고,
          훈련을 성실히 이수하세요.
        </p>
      </div>
    </>
  );
}

export default DetailCard;
