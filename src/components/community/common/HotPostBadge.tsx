import FireIcon16px from '@/components/common/icons/16px/FireIcon16px';

export function HotPostBadge() {
  return (
    <div className='text-[12px] inline-block px-[7px] py-[5px] rounded-[50px] border-primary-100 border-[1px] bg-primary-50 text-black-700 sm:px-[6px] sm:py-[4px] sm:border-primary-50 sm:text-primary-600'>
      <div className='flex items-center'>
        <div>
          <FireIcon16px />
        </div>
        HOT
      </div>
    </div>
  );
}
