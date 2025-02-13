import Planet16px from '@/components/common/icons/16px/Planet16px';
import { categories } from '@/utils/categories';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <div className='text-[12px] inline-block px-[6px] py-1 rounded-[30px] border-primary-300 border-[1px] bg-primary-100 text-primary-500 sm:border-primary-50 '>
      <div className='flex items-center'>
        <div>
          <Planet16px />
        </div>
        {categories[category]}
      </div>
    </div>
  );
};

export default CategoryBadge;
