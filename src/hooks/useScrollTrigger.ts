import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (videoLoaded: boolean, sectionsRef: React.RefObject<(HTMLDivElement | null)[]>) => {
  useEffect(() => {
    if (videoLoaded) {
      sectionsRef.current?.forEach((section) => {
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
  }, [videoLoaded]);
};

export default useScrollTrigger;