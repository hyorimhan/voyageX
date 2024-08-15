import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Planet = {
  id: string;
  planet_img: string;
  price?: number;
};

const useSlideAnimation = (
  videoLoaded: boolean,
  planets: Planet[],
  currentSlide: number,
  visiblePlanetsCount: number,
  planetsRef: React.RefObject<(HTMLDivElement | null)[]>,
) => {
  useEffect(() => {
    const animatePlanets = () => {
      const radius = 500; // 고리 반경
      const angleStep = (2 * Math.PI) / planets.length; // 각 행성 사이의 각도

      planetsRef.current?.forEach((planetElement, index) => {
        if (planetElement) {
          const adjustedIndex =
            (index + (planets.length - Math.floor(visiblePlanetsCount / 2))) %
            planets.length;
          const angle = (adjustedIndex - currentSlide) * angleStep; // 각 행성의 위치 계산
          const xPos = radius * Math.sin(angle); // x 좌표
          const yPos = 0; // y 좌표
          const zPos = radius * Math.cos(angle); // z 좌표
          const isVisible =
            (index >= currentSlide &&
              index < currentSlide + visiblePlanetsCount) || // visiblePlanetsCount 개수만큼 행성이 보이도록 조건식
            (index < currentSlide &&
              index + planets.length < currentSlide + visiblePlanetsCount);
          const isActive =
            index ===
            (currentSlide + Math.floor(visiblePlanetsCount / 2)) %
              planets.length;
          const scale = isActive ? 2 : 1;
          const zIndex = isActive ? 10 : 0;
          const opacity = isVisible ? (isActive ? 1 : 0.5) : 0;

          gsap.to(planetElement, {
            x: xPos,
            y: yPos,
            z: zPos,
            scale: scale,
            zIndex: zIndex,
            opacity: opacity,
            duration: 1,
            ease: 'power2.inOut',
          });

          // 디버깅을 위한 로그 추가
          const planet = planets[index]; // planets 배열의 요소 가져오기
          const tourPrice: number | undefined = planet.price;
        }
      });
    };

    if (videoLoaded && planets.length > 0) {
      animatePlanets();
    }

    ScrollTrigger.refresh();
  }, [currentSlide, videoLoaded, planets]);
};

export default useSlideAnimation;
