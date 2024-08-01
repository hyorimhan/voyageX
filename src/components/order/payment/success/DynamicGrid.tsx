import React, { JSXElementConstructor, ReactElement } from 'react';

function DynamicRow({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-wrap gap-4'>
      {React.Children.map(children, (child, index) =>
        // 자식 요소에 고유의 키를 부여
        React.cloneElement(child as React.ReactElement, { key: index }),
      )}
    </div>
  );
}

export default DynamicRow;
