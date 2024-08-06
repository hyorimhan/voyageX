import Page from '@/components/pages/Page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GOODS SHOP',
  description: 'Voyage X의 기념품 구매 페이지',
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Page>{children}</Page>;
}
