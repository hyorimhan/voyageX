import React from 'react';

interface BadgeProps {
  type: 'read_time' | 'category';
  content: string | number;
}

function Badge({ type, content }: BadgeProps) {
  const badgeStyles =
    type === 'read_time'
      ? 'border border-primary-300 text-primary-300 rounded-full px-2 py-1 bg-backdrop-custom'
      : 'bg-primary-50 text-primary-700 rounded-full px-2 py-1';

  const displayContent =
    type === 'category' && typeof content === 'string'
      ? content.toUpperCase()
      : content;

  return (
    <div
      className={`inline-flex items-center gap-1 ${badgeStyles} font-medium text-[10px] whitespace-nowrap`}
    >
      {type === 'read_time' ? `${displayContent} MIN READ` : displayContent}
    </div>
  );
}

export default Badge;
