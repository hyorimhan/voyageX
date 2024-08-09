import { useState } from 'react';
import AccordionImg from '../../tourContents/AccordionImg';

function Terms() {
  const [readMore, setReadMore] = useState(false);

  const clickToggle = () => {
    const currentScroll = window.scrollY;
    setReadMore(!readMore);

    setTimeout(() => {
      window.scrollTo(0, currentScroll);
    }, 0);
  };
  return (
    <>
      <div className='text-2xl font-semibold mt-[88px] '>약관</div>
      <div className='mt-6 mb-52'>
        <ul
          className={`space-y-6 ${
            readMore ? '' : 'line-clamp-6 overflow-hidden'
          }`}
        >
          <ul className='space-y-2'>
            <li>1. 서문</li>
            <li>
              우주여행사는 고객에게 최상의 우주 여행 경험을 제공하는 것을 목표로
              합니다. 본 약관은 우주여행사와 고객 간의 계약 조건을 명시하며,
              고객은 우주여행사의 서비스를 이용함으로써 본 약관에 동의하게
              됩니다.
            </li>
          </ul>

          <ul>
            <ul className='space-y-2'>
              <li>2. 계약의 성립</li>
              <ul>
                <li>2.1 예약 및 계약 절차</li>
                <li>
                  고객은 우주여행사의 웹사이트를 통해 여행을 예약할 수 있습니다.
                  예약 시, 고객은 개인 정보와 여행 일정 및 옵션을 제공해야
                  합니다. 예약은 우주여행사가 확인 메일을 발송한 시점에
                  확정됩니다.
                </li>
              </ul>
              <ul>
                <li>2.2 계약의 성립 시기와 방법</li>
                <li>
                  계약은 우주여행사가 예약을 확인하고 고객이 첫 번째 결제를
                  완료한 시점에 성립됩니다. 고객은 계약 성립 후 7일 이내에 총
                  여행 요금의 50%를 결제해야 하며, 나머지 금액은 여행 출발 30일
                  전까지 완납해야 합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>3. 여행 요금 및 결제</li>
              <ul>
                <li>3.1 여행 요금의 구성</li>
                <li>
                  여행 요금은 기본 요금, 추가 요금, 세금 및 기타 비용으로
                  구성됩니다. 기본 요금에는 우주 여행 및 필수 훈련이 포함됩니다.
                  추가 요금에는 개인 맞춤형 서비스 및 옵션이 포함됩니다.
                </li>
              </ul>
              <ul>
                <li>3.2 결제 방법과 일정</li>
                <li>
                  고객은 신용카드, 은행 송금 또는 기타 지정된 결제 방법을 통해
                  요금을 지불할 수 있습니다. 첫 번째 결제는 계약 성립 후 7일
                  이내에, 최종 결제는 출발 30일 전까지 완료되어야 합니다.
                </li>
              </ul>
              <ul>
                <li>3.3 환불 정책</li>
                <li className='text-error-900'>
                  고객이 여행을 취소할 경우, 환불은 불가합니다. 결제 시 충분히
                  고려 후 결제해야 합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>4. 여행 일정 및 서비스</li>
              <ul>
                <li>4.1 여행 일정 및 세부 내용</li>
                <li>
                  여행 일정은 계약 체결 시 확정되며, 고객에게 상세한 일정표가
                  제공됩니다. 일정은 사전 교육, 우주 여행, 귀환 및 후속 조치로
                  구성됩니다.
                </li>
              </ul>
              <ul>
                <li>4.2 포함된 서비스와 제공 조건</li>
                <li>
                  포함된 서비스에는 우주 비행, 숙박, 식사 및 훈련이 포함됩니다.
                  모든 서비스는 계약에 명시된 대로 제공되며, 불가항력적인 이유로
                  변경될 수 있습니다.
                </li>
              </ul>
              <ul>
                <li>4.3 여행 일정의 변경 및 취소 조건</li>
                <li>
                  우주여행사는 안전 및 기타 불가피한 이유로 일정 변경을 할 수
                  있습니다. 변경 시 고객에게 즉시 통보하며, 대체 일정 또는
                  환불을 제공합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>5. 여행자의 의무</li>
              <ul>
                <li>5.1 여행자의 건강 상태 및 적합성 확인</li>
                <li>
                  고객은 우주여행에 적합한 건강 상태임을 확인하고, 의료 검진을
                  받아야 합니다. 건강 상태가 부적합할 경우, 우주여행사는 여행을
                  취소할 수 있습니다.
                </li>
              </ul>
              <ul>
                <li>5.2 사전 교육 및 훈련 참가</li>
                <li>
                  고객은 출발 전에 필수 교육 및 훈련에 참가해야 합니다. 훈련
                  불참 시 여행이 취소될 수 있으며, 이에 따른 환불은 불가합니다.
                </li>
              </ul>
              <ul>
                <li>5.3 안전 규정 준수</li>
                <li>
                  고객은 우주여행사의 모든 안전 규정을 준수해야 합니다. 안전
                  규정을 위반할 경우, 고객은 책임을 지게 됩니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>6. 위험 및 책임 한계</li>
              <ul>
                <li>6.1 우주 여행의 고유한 위험성</li>
                <li>
                  우주 여행은 신체적, 심리적 위험을 수반합니다. 고객은 이러한
                  위험을 인지하고 동의해야 합니다.
                </li>
              </ul>
              <ul>
                <li>6.2 회사의 책임 범위 및 한계</li>
                <li>
                  우주여행사는 고객의 안전을 최우선으로 하지만, 불가항력적인
                  상황에서 발생하는 사고에 대해서는 책임을 지지 않습니다. 고객은
                  여행자 보험 및 생명 보험을 가입해야 합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>7. 취소 및 환불 정책</li>
              <ul>
                <li>7.1 여행사의 취소 정책</li>
                <li>
                  우주여행사는 안전 및 운영상의 이유로 여행을 취소할 수
                  있습니다. 이 경우 고객에게 전액 환불 또는 대체 일정을
                  제공합니다.
                </li>
              </ul>
              <ul>
                <li>7.2 고객의 취소 및 환불 조건</li>
                <li>고객의 취소 시 환불 조건은 3.3 항에 따릅니다.</li>
              </ul>
              <ul>
                <li>7.3 불가항력 상황에서의 조치</li>
                <li>
                  천재지변, 정부 규제 등 불가항력적인 상황에서는 일정이
                  변경되거나 취소될 수 있습니다. 이 경우 환불 또는 대체 일정이
                  제공됩니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>8. 개인정보 보호</li>
              <ul>
                <li>8.1 수집하는 개인정보의 항목</li>
                <li>
                  우주여행사는 고객의 이름, 연락처, 건강 정보 등 필요한
                  개인정보를 수집합니다.
                </li>
              </ul>
              <ul>
                <li>8.2 개인정보의 이용 목적과 방법</li>
                <li>
                  수집된 개인정보는 서비스 제공, 안전 관리 및 법적 요구 사항
                  준수를 위해 사용됩니다.
                </li>
              </ul>
              <ul>
                <li>8.3 개인정보 보호 조치</li>
                <li>
                  우주여행사는 고객의 개인정보를 보호하기 위해 적절한 보안
                  조치를 취합니다. 개인정보는 고객의 동의 없이 제3자에게
                  제공되지 않습니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>9. 분쟁 해결</li>
              <ul>
                <li>9.1 분쟁 발생 시 해결 절차</li>
                <li>
                  분쟁이 발생할 경우, 고객과 우주여행사는 우선적으로 협의하여
                  해결을 시도합니다. 협의가 실패할 경우 중재 절차를 따릅니다.
                </li>
              </ul>
              <ul>
                <li>9.2 준거법 및 관할 법원</li>
                <li>
                  본 약관은 대한민국 법률에 따르며, 분쟁 발생 시
                  서울중앙지방법원을 관할 법원으로 합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <ul>
            <ul className='space-y-2'>
              <li>10. 기타</li>
              <ul>
                <li>10.1 약관의 변경</li>
                <li>
                  우주여행사는 본 약관을 변경할 수 있으며, 변경된 약관은
                  웹사이트에 게시됩니다. 변경된 약관은 게시된 후 30일 이후부터
                  적용됩니다.
                </li>
              </ul>
              <ul>
                <li>10.2 고객에게 고지할 사항</li>
                <li>
                  중요한 변경 사항이나 공지사항은 고객에게 이메일을 통해
                  고지됩니다.
                </li>
              </ul>
            </ul>
          </ul>
        </ul>
        <button onClick={clickToggle} className='mt-8 w-full text-lg mx-auto'>
          {readMore ? (
            <>
              <div className='flex'>
                <div>{'접기'}</div>
                <AccordionImg isEnter={readMore} />
              </div>
            </>
          ) : (
            <>
              <div className='flex'>
                <div>{'더보기'}</div>
                <AccordionImg isEnter={readMore} />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default Terms;
