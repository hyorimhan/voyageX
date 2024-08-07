import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import AccordionImg from '../tourContents/AccordionImg';
import Checklist from './Guidelines/Checklist';
import Training from './Guidelines/Training';
import Precautions from './Guidelines/Precautions';
import Terms from './Guidelines/Terms';

function GuideContents() {
  return (
    <Accordion allowMultiple>
      <Checklist />
      <Training />
      <Precautions />
      <Terms />
    </Accordion>
  );
}

export default GuideContents;
