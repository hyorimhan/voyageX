import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (
  videoLoaded: boolean,
  sectionsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  useEffect(() => {
    if (videoLoaded && sectionsRef.current.length > 0) {
      sectionsRef.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
          });
        }
      });

      ScrollTrigger.refresh();
    }
  }, [videoLoaded, sectionsRef]);
};

export default useScrollTrigger;