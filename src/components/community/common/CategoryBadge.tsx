import Planet16px from '@/components/common/icons/16px/Planet16px';
import { categories } from '@/utils/categories';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <div className='text-[12px] inline-block px-[7px] py-[5px] rounded-[30px] border-primary-300 border-[1px] bg-primary-100 text-primary-500 sm:px-2 sm:py-1 sm:rounded-xl sm:border-primary-50'>
      <div className='flex'>
        <div className='sm:hidden'>
          <Planet16px />
        </div>
        {categories[category]}
      </div>
    </div>
  );
};

export default CategoryBadge;
