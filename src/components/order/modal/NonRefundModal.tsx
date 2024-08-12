import React from 'react';
import toast from 'react-hot-toast';

function NonRefundModal() {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } flex items-center justify-center mt-[10%]  bg-opacity-50 `}
      >
        <div className='bg-white max-w-3xl mt-[5%] w-full shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5'>
          <div className='p-6'>
            <p className='text-lg font-medium text-gray-900'>
              결제 이후 환불 및 취소 불가 동의
            </p>
            <div className='mt-4 text-sm text-gray-500 h-80 overflow-y-auto'>
              <div>
                <p>결제 이후 환불 및 취소 불가 동의</p>
                <p>
                  **제1조 (목적)**:
                  <p>
                    본 약관은 Voyage X (이하 &quot;회사&quot;)가 제공하는 우주
                    여행사 및 커뮤니티 사이트(이하 &quot;사이트&quot;)의 결제
                    이후, 환불 및 취소와 관련된 사항을 규정함을 목적으로 합니다.
                  </p>
                </p>
                <p>
                  **제2조 (결제)**:
                  <p>
                    1. 고객은 회사가 제공하는 결제 수단을 통해 서비스 이용
                    요금을 결제합니다.
                  </p>
                  <p>
                    2. 결제는 고객이 선택한 서비스에 대한 금액을 즉시
                    청구합니다.
                  </p>
                </p>
                <p>
                  **제3조 (환불 및 취소 불가)**:
                  <p>
                    1. 고객이 결제를 완료한 이후에는 어떠한 사유로도 환불 및
                    취소가 불가능합니다.
                  </p>
                  <p>
                    2. 고객은 결제 전에 본 약관을 충분히 숙지하고, 환불 및
                    취소가 불가능함을 확인한 후 결제를 진행해야 합니다.
                  </p>
                  <p>
                    3.단, 회사의 과실로 인한 서비스 제공 불가 또는 법률에 의해
                    환불이 요구되는 경우, 해당 규정에 따릅니다.
                  </p>
                </p>
                <p>
                  **제4조 (예외사항)**:
                  <p>
                    1. 고객의 의사와 무관한 오류로 인해 중복 결제가 이루어진
                    경우, 회사는 중복된 금액에 대해 환불 절차를 진행합니다.
                  </p>
                  <p>
                    2. 고객이 서비스 이용 전에 서비스를 제공받을 수 없음을
                    입증할 수 있는 특별한 사유가 있을 경우, 회사는 내부 심사를
                    통해 환불 여부를 결정할 수 있습니다.
                  </p>
                </p>
                <p>
                  **제5조 (개인정보의 보호 및 사용)**:
                  <p>
                    1. 본 약관은 고객이 결제 절차를 완료한 시점부터 효력을
                    발생합니다.
                  </p>
                  <p>
                    2. 회사는 필요에 따라 본 약관의 내용을 변경할 수 있으며,
                    변경된 약관은 홈페이지 또는 앱을 통해 공지합니다.
                  </p>
                </p>
                <p>
                  **제6조 (기타)**:
                  <p>
                    1. 본 약관에 명시되지 않은 사항은 관련 법령 및 회사의 정책에
                    따릅니다.
                  </p>
                  <p>
                    2. 본 약관에 동의하지 않는 경우, 고객은 서비스 결제를 진행할
                    수 없습니다.
                  </p>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => toast.remove(t.id)}
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

export default NonRefundModal;
