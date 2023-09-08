import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import {
  fetchAllReviews,
  fetchReviewById,
} from '../../../apis/reviews'
import LoadError from '../../../user/components/LoadError/LoadError'
import { Review, ReviewForTable } from '../../../../models/Reviews'
import {
  formatDateToDDMMYYYY,
  format24HourTo12Hour,
} from '../../../utils/formatDate/formatDate'
import { useAuth0 } from '@auth0/auth0-react'
import ReviewPopup from '../../components/ReviewPopup/ReviewPopup'

const Reviews = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('Newest first')
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 20

  const { data: reviews, status: statusReviews, refetch } = useQuery(
    ['getReviews'],
    async () => {
      const token = await getAccessTokenSilently()
      const fetchedReviews: ReviewForTable[] = await fetchAllReviews(token)
      return fetchedReviews
    },
  )

  const fetchAndShowReviewDetails = async (reviewId: number) => {
    const token = await getAccessTokenSilently()
    const review = await fetchReviewById(reviewId, token)
    setSelectedReview(review)
  }


  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter, sort])


  const filteredAndSortedReviews = reviews
    ?.filter((review) => {
      if (filter === 'enabled') return review.isEnabled
      if (filter === 'disabled') return !review.isEnabled
      return true
    })
    .filter((review) => {
      return review.productName.toLowerCase().includes(search.toLowerCase())
    })
    .sort((a, b) => {
      switch (sort) {
        case 'Newest first':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'Oldest first':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case 'High to low rating':
          return b.rating - a.rating
        case 'Low to high rating':
          return a.rating - b.rating
        default:
          return 0 
      }
    })

  const lastIndex = currentPage * reviewsPerPage
  const firstIndex = lastIndex - reviewsPerPage
  const currentReviews = filteredAndSortedReviews?.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(
    (filteredAndSortedReviews?.length ?? 0) / reviewsPerPage,
  )

  const closeReviewPopup = () => {
    setSelectedReview(null);
    refetch()
  }

  return (
    <>
      {selectedReview && (
        <ReviewPopup
          reviewId={selectedReview.reviewId}
          closeReviewPopup={closeReviewPopup}
        />
      )}
      <LoadError status={statusReviews} />
      {reviews && currentReviews && filteredAndSortedReviews && (
        <div className="flex justify-center">
          <div className="p-4" style={{ width: '1000px' }}>
            {/* SEARCH */}
            <div className="border p-2 rounded flex justify-between items-center">
              <div className="flex items-center">
                <input
                  className="border p-2 rounded mr-2"
                  type="text"
                  placeholder="Search for a product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* FILTER */}
                <p className="mx-2 font-semibold">Showing:</p>
                <select
                  className="border p-2 rounded"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                >
                  <option value="all">All</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>

                {/* SORT */}
                <p className="mx-2 font-semibold">Filter by:</p>
                <select
                  className="border p-2 rounded"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value="...">...</option>
                  <option value="Newest first">Newest first</option>
                  <option value="Oldest first">Oldest first</option>
                  <option value="High to low rating">High to low rating</option>
                  <option value="Low to high rating">Low to high rating</option>
                </select>
              </div>

              {/* PAGINATION */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col justify-center mx-2 font-semibold">
                  Showing {firstIndex + 1}-
                  {Math.min(lastIndex, filteredAndSortedReviews.length)} of{' '}
                  {filteredAndSortedReviews.length}
                </div>
                <div className="flex justify-center">
                  <button
                    className={`${
                      currentPage === 1
                        ? 'bg-gray-300 cursor-default'
                        : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 rounded`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {'<'}
                  </button>
                  <button
                    className={`${
                      currentPage === totalPages
                        ? 'bg-gray-300 cursor-default'
                        : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 rounded ml-2`}
                    disabled={lastIndex >= filteredAndSortedReviews.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="divTable bg-white mt-4 border border-gray-300">
              <div className="divRow bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <div
                  className="divCell py-3 px-8"
                  style={{ minWidth: '200px' }}
                >
                  UserName
                </div>
                <div
                  className="divCell py-3 px-8"
                  style={{ minWidth: '300px' }}
                >
                  Product
                </div>
                <div
                  className="divCell py-3 px-8"
                  style={{ minWidth: '100px' }}
                >
                  Rating
                </div>
                <div
                  className="divCell py-3 px-8"
                  style={{ minWidth: '100px' }}
                >
                  Status
                </div>
                <div
                  className="divCell py-3 px-8"
                  style={{ minWidth: '200px' }}
                >
                  Date Created
                </div>
              </div>

              <div className="divBody text-gray-600 text-sm font-light">
                {currentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="divRow border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => fetchAndShowReviewDetails(review.id)}
                  >
                    <div
                      className="divCell py-3 px-8 text-left whitespace-nowrap"
                      style={{ minWidth: '200px' }}
                    >
                      {review.userName}
                    </div>
                    <div
                      className="divCell py-3 px-8 text-left"
                      style={{ minWidth: '300px' }}
                    >
                      {review.productName}
                    </div>
                    <div
                      className="divCell py-3 px-8 text-left"
                      style={{ minWidth: '100px' }}
                    >
                      {review.rating}
                    </div>
                    <div
                      className="divCell py-3 px-8 text-left"
                      style={{ minWidth: '100px' }}
                    >
                      {review.isEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                    <div
                      className="divCell py-3 px-8 text-left"
                      style={{ minWidth: '200px' }}
                    >
                      {format24HourTo12Hour(review.createdAt)}{' '}
                      {formatDateToDDMMYYYY(review.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Reviews
