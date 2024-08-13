import { propsText } from '@/types/tourPropsType';

function DetailInfo({ title, description, borderTop }: propsText) {
  return (
    <div className={`text-[14px] font-medium ${borderTop} `}>
      <div className=' border-b my-3 pb-3 flex'>
        <div className='w-20'>{title}</div> {description}
      </div>
    </div>
  );
}
export default DetailInfo;
