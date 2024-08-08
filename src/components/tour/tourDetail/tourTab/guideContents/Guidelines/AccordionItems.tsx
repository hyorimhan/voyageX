import { AccordionItem } from '@szhsin/react-accordion';
import AccordionImg from '../../tourContents/AccordionImg';

function AccordionItems({
  contents,
  title,
  containerStyle,
}: {
  contents: React.ReactNode;
  title: string;
  containerStyle?: string;
}) {
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
