import { useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'react-query'
import StarRating from '../../../user/components/StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate/formatDate'
import { fetchReviewById, modifyReviewStatusById } from '../../../apis/reviews'
import { useAuth0 } from '@auth0/auth0-react'
import LoadError from '../../../user/components/LoadError/LoadError'

interface ReviewPopupProps {
  reviewId: number;
  closeReviewPopup : () => void
}

const ReviewPopup = ({ reviewId, closeReviewPopup }: ReviewPopupProps) => {
  const { getAccessTokenSilently } = useAuth0()

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closeReviewPopup();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeReviewPopup]);

  const { data: review, status, refetch } = useQuery(
    ['getReviewById', reviewId],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchReviewById(reviewId, token)
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation(
    async (data: { reviewId: number, isEnabled: boolean }) => {
      const token = await getAccessTokenSilently();
      return await modifyReviewStatusById({id : data.reviewId, isEnabled : data.isEnabled}, token);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const onToggle = async (reviewId: number, isEnabled: boolean) => {
    mutation.mutate({ reviewId, isEnabled });
  }



  return (
    <>
      <LoadError status={status} />
      {status === 'success' && review && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div ref={popupRef} className="bg-white p-5 rounded-lg flex flex-col justify-between w-4/5 max-w-lg min-h-[400px]">
            <div>
              <button onClick={closeReviewPopup} className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5">
                Back to reviews
              </button>
              <div className="flex justify-between font-bold text-lg">
                <h2>{review.reviewerUserName}</h2>
                <p>{formatDateToDDMMYYYY(review.reviewCreatedAt)}</p>
              </div>
              <div className="flex mt-8 items-center">
                <img className="max-w-[150px]" src={review.productImage} alt={review.productName} />
                <h2>{review.productName}</h2>
              </div>
            </div>
            <div>
              <div className="flex gap-4 mt-4 mb-2">
                <p className="font-bold">Rating:</p>
                <StarRating rating={review.reviewRating} size={1} />
                <p>({review.reviewRating})</p>
              </div>
              <h2 className="font-bold">Description:</h2>
              <p>{review.reviewDescription}</p>
            </div>
            <button 
              onClick={() => onToggle(review.reviewId, !review.reviewIsEnabled)} 
              className="px-2 py-1 text-white rounded mt-7 w-[80px]"
              style={{backgroundColor: review.reviewIsEnabled ? 'green' : 'red'}}
            >
              {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewPopup;
