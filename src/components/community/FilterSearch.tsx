import CategoryFilter from './CategoryFilter';
import Search from './Search';

function FilterAndSearch() {
  return (
    <div className='flex justify-between items-center'>
      <CategoryFilter />
      <div className=''>
        <Search />
      </div>
    </div>
  );
}

export default FilterAndSearch;
