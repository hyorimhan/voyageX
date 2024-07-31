import Image from 'next/image';

const PostWriterIcon = () => {
  return (
    <div className='flex justify-center items-center rounded-full bg-primary-100 w-7 h-7'>
      <Image
        src='/icons/community/writerProfile.png'
        alt='writer profile icon'
        width={26}
        height={26}
      ></Image>
    </div>
  );
};

export default PostWriterIcon;
