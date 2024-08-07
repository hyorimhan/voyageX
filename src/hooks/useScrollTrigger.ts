import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (
  videoLoaded: boolean,
  sectionRef: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  useEffect(() => {
    if (videoLoaded && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      ScrollTrigger.refresh();
    }
  }, [videoLoaded, sectionRef]);
};

export default useScrollTrigger;