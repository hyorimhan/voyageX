import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface Props {
  member: string;
  name: string;
  tasks: string | React.ReactNode;
  icon: React.ReactNode;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function Card({ member, name, tasks, icon }: Props) {
  return (
    <>
      <div className='p-4 relative z-0 group'>
        <motion.div
          whileHover={{ scale: 1.03, zIndex: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          variants={cardVariants}
          className='relative z-10'
          style={{
            boxShadow:
              '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
            transformOrigin: '10% 60%',
          }}
        >
          <div className='w-[300px] sm:w-[280px] sm:h-[280px] cursor-pointer hover:scale-105 flex flex-col items-center justify-center h-[300px] border-2 rounded-full bg-primary-100 border-primary-50'>
            <Image
              src={member}
              alt='member_img'
              width={100}
              height={100}
              className='mx-auto '
            />
            <div className='z-90 sm:mt-2 sm:text-2xl text-primary-600 text-[28px] text-center font-yangpyeong font-semibold'>
              {name}
            </div>
            <div className='lg:text-xl sm:text-lg z-90 px-[52.5px] text-primary-600 text-center lg:font-medium'>
              {tasks}
            </div>
            <div className='text-lg z-90  text-black-900 mx-auto flex justify-center'>
              {icon}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Card;
