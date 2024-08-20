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
      const triggers = sectionsRef.current.map((section) => {
        if (section) {
          return ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            scrub: 1,
          });
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((trigger) => trigger?.kill());
      };
    }
  }, [videoLoaded, sectionsRef]);
};

export default useScrollTrigger;