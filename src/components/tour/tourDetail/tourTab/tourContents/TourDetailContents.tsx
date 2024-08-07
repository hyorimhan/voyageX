import React from 'react';

function TourDetailContents({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='flex'>
      <div className='text-sm mb-2 mt-6 bg-primary-100 text-primary-500 w-[42px] h-6 items-center justify-center flex rounded-full text-[10px] mr-5'>
        {title}
      </div>
      <div className='mt-6 text-sm tracking-widest'>{description}</div>
    </div>
  );
}

export default TourDetailContents;
