import { useEffect, useRef, useState } from "react"

const useVideoLoaded = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const checkVideoLoaded = () => {
        if (videoElement.readyState >= 3) {
          setVideoLoaded(true);
        }
      };
      checkVideoLoaded();
    }
  }, []);
  return { videoRef, videoLoaded }
}

export default useVideoLoaded