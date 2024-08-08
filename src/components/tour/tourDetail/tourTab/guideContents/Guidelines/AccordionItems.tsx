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
          <div className='text-lg'>{title}</div>
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
