import React from 'react';
import Tilt from 'react-parallax-tilt';

type TicketWithAnimationProps = {
  children: React.ReactNode;
};

const TicketWithAnimation = ({ children }: TicketWithAnimationProps) => {
  return (
    <Tilt
      className='tilt-root'
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      transitionSpeed={1500}
      gyroscope={true}
    >
      <div
        className='tilt-inner'
        style={{
          width: '842px',
          height: '261px',
          borderRadius: '15px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {children}
      </div>
    </Tilt>
  );
};

export default TicketWithAnimation;
