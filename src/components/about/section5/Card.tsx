import Image from 'next/image';

interface Props {
  member: string;
  name: string;
  tasks: string;
  icon: React.ReactNode;
}

function Card({ member, name, tasks, icon }: Props) {
  return (
    <>
      <div className='w-[335px] flex flex-col items-center justify-center h-[335px] border-2 rounded-full bg-primary-100 border-primary-50'>
        <Image
          src={member}
          alt='member_img'
          width={100}
          height={100}
          className='mx-auto '
        />
        <div className='z-90 text-primary-600 text-[28px] text-center font-yangpyeong font-semibold'>
          {name}
        </div>
        <div className='text-xl z-90 px-[52.5px] text-primary-600 text-center font-medium'>
          {tasks}
        </div>
        <div className='text-lg z-90  text-black-900 mx-auto flex justify-center'>
          {icon}
        </div>
      </div>
    </>
  );
}

export default Card;
