'use client';

import React, { useState } from 'react';
import VideoSection from './VideoSection';
import PlanetSection from './PlanetSection';
import { Planet } from '@/services/tour';

interface ClientWrapperProps {
  planets: Planet[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ planets }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <VideoSection
        videoSrc='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/mainvideo%20(2).mp4?t=2024-08-16T07%3A58%3A43.247Z'
        heading='Voyage X'
        subHeading='상상을 현실로, 우주에서의 만남'
        source='https://kr.freepik.com/free-video/traveling-through-star-fields-space-distant-galaxy-2_179468#fromView=search&page=1&position=0&uuid=4946a633-a12e-4230-a49f-07ec1569be25'
        setVideoLoaded={setVideoLoaded}
      />
      <PlanetSection planets={planets} videoLoaded={videoLoaded} />
    </>
  );
};

export default ClientWrapper;