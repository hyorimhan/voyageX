export type PayResult = {
  approvedAt: string;
  balanceAmount: number;
  cancels?: any;
  card?: {
    acquireStatus: string;
    acquirerCode: string;
    amount: number;
    approveNo: string;
    cardType: string;
    installmentPlanMonths: number;
    interestPayer: string;
    isInterestFree: boolean;
    issuerCode: string;
    number: string;
    ownerType: string;
    useCardPoint: boolean;
  };
  cashReceipt?: any;
  cashReceipts?: any;
  checkout: {
    url: string;
  };
  country: string;
  cultureExpense: boolean;
  currency: string;
  discount?: any;
  easyPay?: {
    amount: number;
    discountAmount: number;
    provider: string;
  };
  failure?: any;
  giftCertificate?: any;
  isPartialCancelable: boolean;
  lastTransactionKey: string;
  mId: string;
  method: string;
  mobilePhone?: any;
  orderId: string;
  orderName: string;
  paymentKey: string;
  receipt: {
    url: string;
  };
  requestedAt: string;
  secret: string;
  status: string;
  suppliedAmount: number;
  taxExemptionAmount: number;
  taxFreeAmount: number;
  totalAmount: number;
  transfer?: any;
  type: string;
  useEscrow: boolean;
  vat: number;
  version: string;
  virtualAccount?: any;
};
