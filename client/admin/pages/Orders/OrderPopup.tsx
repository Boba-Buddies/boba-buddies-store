import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import LoadError from '../../../user/components/LoadError/LoadError';
import { fetchOrderById } from '../../../apis/purchases';

interface OrderPopupProps {
  orderId: number;
  closeOrderPopup: () => void;
}

const OrderPopup = ({ orderId, closeOrderPopup }: OrderPopupProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closeOrderPopup();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOrderPopup]);

  const { data: order, status, refetch } = useQuery(
    ['getOrderById', orderId],
    async () => {
      const token = await getAccessTokenSilently();
      return await fetchOrderById(orderId, token);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && order && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div ref={popupRef} className="bg-white p-5 rounded-lg flex flex-col justify-between w-4/5 max-w-lg min-h-[400px]">
            <div>
              <button onClick={closeOrderPopup} className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5">
                Back to orders
              </button>
              <div className="flex justify-between font-bold text-lg">
                <h2>Order Details</h2>
              </div>
              <div className="flex mt-8 items-center">
                {/* Display order details here */}
              </div>
            </div>
            <div>
              <h2 className="font-bold">Order ID: {order.orderId}</h2>
              <p>User Name: {order.userFirstName} {order.userLastName}</p>
              <p>Total Sale: {order.totalSale}</p>
              <p>Purchase Date: {order.orderDate}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPopup;

