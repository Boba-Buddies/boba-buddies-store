import { useQuery } from 'react-query';
import { useState } from 'react';
import { fetchAllReviews } from '../../../apis/reviews';
import LoadError from '../../../user/components/LoadError/LoadError';
import { ReviewForTable } from '../../../../models/Reviews';


const Reviews = () => {
  const { data: reviews, status: statusReviews } = useQuery(
    ['getReviews'],
    async () => {
      const fetchedReviews : ReviewForTable[] = await fetchAllReviews();
      return fetchedReviews
    }
  );

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('Newest first');

  // Filter and sort the reviews based on the current settings
  const filteredAndSortedReviews = reviews
    ?.filter((review) => {
      if (filter === 'enabled') return review.isEnabled;
      if (filter === 'disabled') return !review.isEnabled;
      return true;
    })
    .filter((review) => {
      return review.productName.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      // Implement sorting logic here...
      // For simplicity, let's use the createdAt as an example:
      if (sort === 'Newest first') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // Add more sorting logic as needed
    });

  return (
    <>
      <LoadError status={statusReviews} />
      {reviews && filteredAndSortedReviews && (
        <div>
          <input
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="Newest first">Newest first</option>
            <option value="Oldest first">Oldest first</option>
            <option value="High to low rating">High to low rating</option>
            <option value="Low to high rating">Low to high rating</option>
          </select>

          <table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>ProductName</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.userName}</td>
                  <td>{review.productName}</td>
                  <td>{review.rating}</td>
                  <td>{review.isEnabled ? 'Enabled' : 'Disabled'}</td>
                  <td>{review.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Reviews;
