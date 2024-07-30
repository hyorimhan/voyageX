import { categories } from '@/utils/categories';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <div className='inline-block px-2 py-1 rounded-[30px] bg-primary-50 text-primary-500'>
      {categories[category]}
    </div>
  );
};

export default CategoryBadge;
