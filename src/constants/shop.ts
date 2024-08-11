import privacyPolicyAndConsentModal from '@/components/auth/signup/modal/privacyPolicyAndConsentModal';
import NonRefundModal from '@/components/order/modal/NonRefundModal';

export const shopCategories = {
  'like_count': '인기순',
  'created_at': '최신순',
  'goods_price': '가격 높은 순',
  '-goods_price': '가격 낮은 순',
  'rating_avg': '별점 높은 순',
  '-rating_avg': '별점 낮은 순',
};

export const termsAndConditionsList = [
  {
    id: '1',
    title: '[필수] 개인정보 수집 이용 및 제 3자 제공 동의',
    modal: () => privacyPolicyAndConsentModal(),
  },
  {
    id: '2',
    title: '[필수] 결제 이후 환불 및 취소 불가 동의',
    modal: () => NonRefundModal(),
  },
];
