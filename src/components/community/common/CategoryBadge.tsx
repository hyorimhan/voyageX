import { categories } from '@/utils/categories';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <div className='text-[10px] inline-block px-3 py-[6px] rounded-[30px] font-bold bg-primary-50 text-primary-500'>
      {categories[category]}
    </div>
  );
};

export default CategoryBadge;
