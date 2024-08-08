import { AccordionItem } from '@szhsin/react-accordion';
import AccordionImg from '../../tourContents/AccordionImg';
import { propsText } from '@/types/tourPropsType';

function AccordionItems({ contents, title, containerStyle }: propsText) {
  return (
    <AccordionItem
      header={({ state: { isEnter } }) => (
        <div className='flex'>
          <div className='text-lg w-full sm:w-[255px] md:w-[600px] lg:w-[1056px] mx-auto text-left'>
            {title}
          </div>
          <AccordionImg isEnter={isEnter} />
        </div>
      )}
      className={` bg-black-900 p-6 ${containerStyle}`}
    >
      {contents}
    </AccordionItem>
  );
}

export default AccordionItems;
