import Page from '@/components/pages/Page';

function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg-black text-white'>
      <Page>
        <h1 className='border-b-2 border-white text-4xl font-bold text-white mt-40 py-4'>
          GOODS SHOP
        </h1>
        {children}
      </Page>
    </main>
  );
}

export default ShopLayout;
