import Page from '@/components/pages/Page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문 및 결제',
  description: 'Voyage X의 여행상품 티켓을 주문하고 결제하는 페이지',
};

export default function TourPayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Page>{children}</Page>;
}
