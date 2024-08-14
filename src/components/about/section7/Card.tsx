import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Props {
  member: string;
  name: string;
  tasks: string;
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
      <motion.div
        className=' flex items-center justify-center relative pt-5 '
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className='text-10xl p-5  w-[300px] h-[430px] flex items-center justify-center bg-white rounded-2xl'
          variants={cardVariants}
          style={{
            boxShadow:
              '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
            transformOrigin: '10% 60%',
          }}
        >
          <div className='font-yuna'>
            <Image
              src={member}
              alt='member_img'
              width={100}
              height={100}
              className='mx-auto '
            />
            <div className='z-90 text-primary-600 text-5xl text-center'>
              {name}
            </div>
            <div className='text-3xl z-90 text-black-800 text-center'>
              {tasks}
            </div>
            <div className='text-lg z-90  text-black-800 mx-auto flex justify-center'>
              {icon}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Card;
