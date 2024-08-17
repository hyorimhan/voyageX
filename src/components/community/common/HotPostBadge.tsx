import FireIcon16px from '@/components/common/icons/16px/FireIcon16px';

export function HotPostBadge() {
  return (
    <div className='text-[12px] inline-block px-[7px] py-[5px] rounded-[50px] border-black-200 border-[1px] bg-white text-black-700 sm:px-2 sm:py-1 sm:border-primary-50'>
      <div className='flex items-center'>
        <div className='sm:hidden'>
          <FireIcon16px />
        </div>
        HOT
      </div>
    </div>
  );
}
