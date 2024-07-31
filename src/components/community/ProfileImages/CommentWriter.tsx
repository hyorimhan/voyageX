import Image from 'next/image';

const CommentWriterIcon = () => {
  return (
    <div className='flex justify-center items-center rounded-full bg-[#EDF7EF] w-7 h-7'>
      <Image
        src='/icons/community/commentProfile.png'
        alt='comment Profile icon'
        width={26}
        height={26}
      />
    </div>
  );
};

export default CommentWriterIcon;
