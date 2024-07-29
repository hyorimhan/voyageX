import React from 'react';
import toast from 'react-hot-toast';

function privacyPolicyAndConsentModal() {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center justify-center bg-gray-500 bg-opacity-50 mt-[10%]`}
      >
        <div className='bg-white max-w-3xl w-full shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5'>
          <div className='p-6'>
            <p className='text-lg font-medium text-gray-900'>
              **개인정보 수집 및 이용 동의**{' '}
            </p>
            <div className='mt-4 text-sm text-gray-500 h-80 overflow-y-auto'>
              <div>
                <p>**개인정보 수집 및 이용 동의**</p>
                <p>**수집하는 개인정보의 항목**:</p>
                <p>
                  회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다:
                </p>
                <ul>
                  <li>
                    **필수 항목**: 이메일, 비밀번호, 이름, 전화번호, 배송지
                  </li>
                  <li>
                    **선택 항목**: 서비스 이용 기록, 접속 로그, 쿠키, 결제 정보
                  </li>
                </ul>
                <p>**개인정보의 수집 및 이용 목적**:</p>
                <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다:</p>
                <ul>
                  <li>서비스 제공 및 회원 관리</li>
                  <li>우주 여행 예약 및 관련 정보 제공</li>
                  <li>결제 및 환불 처리</li>
                  <li>고객 상담 및 민원 처리</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                  <li>마케팅 및 광고에 활용</li>
                </ul>
                <p>**개인정보의 보유 및 이용 기간**:</p>
                <p>
                  회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는
                  해당 정보를 지체 없이 파기합니다.
                </p>
                <ul>
                  <li>
                    **보존 항목**: 이메일, 비밀번호, 이름, 전화번호, 배송지
                  </li>
                  <li>
                    **보존 근거**: 회원 탈퇴 후에도 불법 이용 및 부정 가입
                    방지를 위해 필요한 경우
                  </li>
                  <li>**보존 기간**: 회원 탈퇴 후 1년</li>
                </ul>
                <p>**개인정보의 파기 절차 및 방법**:</p>
                <p>
                  회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는
                  해당 정보를 지체 없이 파기합니다.
                </p>
                <ul>
                  <li>
                    **파기 절차**: 회원이 회원가입 등을 위해 입력한 정보는
                    목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의
                    서류함) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된
                    후 혹은 즉시 파기됩니다.
                  </li>
                  <li>
                    **파기 방법**: 전자적 파일 형태의 정보는 기록을 재생할 수
                    없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된
                    개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                  </li>
                </ul>
                <p>**이용자의 권리와 그 행사 방법**:</p>
                <p>
                  이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수
                  있습니다:
                </p>
                <ul>
                  <li>
                    **개인정보 열람 요구**: 이용자는 언제든지 등록되어 있는
                    자신의 개인정보를 열람할 수 있습니다.
                  </li>
                  <li>
                    **개인정보 정정 요구**: 이용자는 언제든지 자신의 개인정보에
                    대해 정정을 요구할 수 있습니다.
                  </li>
                  <li>
                    **개인정보 처리 정지 요구**: 이용자는 언제든지 개인정보
                    처리의 정지를 요구할 수 있습니다.
                  </li>
                  <li>
                    **개인정보 삭제 요구**: 이용자는 언제든지 개인정보 삭제를
                    요구할 수 있습니다.
                  </li>
                </ul>
                <p>
                  이와 같은 권리 행사는 회사에 서면, 전화, 이메일 등을 통하여
                  하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
                </p>
                <p>**개인정보 보호를 위한 기술적/관리적 대책**:</p>
                <p>
                  회사는 이용자의 개인정보를 안전하게 관리하기 위하여 다음과
                  같은 대책을 강구하고 있습니다:
                </p>
                <ul>
                  <li>
                    **기술적 대책**: 개인정보를 처리함에 있어 개인정보가 분실,
                    도난, 유출, 위조, 변조 또는 훼손되지 않도록 보안프로그램을
                    설치하고 주기적인 갱신·점검을 실시합니다.
                  </li>
                  <li>
                    **관리적 대책**: 개인정보의 안전한 처리를 위하여
                    내부관리계획을 수립하고 시행하고 있습니다. 또한, 개인정보
                    접근 권한을 최소화하고 개인정보 취급자를 대상으로 교육을
                    시행하고 있습니다.
                  </li>
                </ul>
                <p>부칙 본 동의서는 2024년 7월 25일부터 적용됩니다.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className='border-t border-gray-200 p-4 flex items-center justify-center text-sm font-medium text-indigo-600 '
          >
            닫기
          </button>
        </div>
      </div>
    ),
    { duration: Infinity },
  );
}

export default privacyPolicyAndConsentModal;
