import { dummyPosts } from '@/data/dummyPost';

function PostList() {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='border-b-[0.4px] border-white'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              NO.
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              카테고리
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              제목
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              날짜
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              조회수
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              댓글수
            </th>
          </tr>
        </thead>
        <tbody className=''>
          {dummyPosts.map((post) => (
            <tr key={post.id}>
              <td className='px-6 py-4 whitespace-nowrap'>
                {String(post.id).padStart(5, '0')}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>{post.category}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{post.title}</td>
              <td className='px-6 py-4 whitespace-nowrap'>24.05.12</td>
              <td className='px-6 py-4 whitespace-nowrap'>2,930</td>
              <td className='px-6 py-4 whitespace-nowrap'>3</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
