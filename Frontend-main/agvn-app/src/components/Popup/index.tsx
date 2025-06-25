import React from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

const host = "http://127.0.0.1:8000/api/v1";

interface PopupsProps {
  type: string;
  message?: string;
  toSignin?: boolean;
  toEdit?: boolean;
}

export default function Popups ({ type, message, toSignin, toEdit}: PopupsProps) {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  React.useEffect(() => {
    if (type === "error" || type=== "success") {
      setShow(!!message);
    }
  }, [type, message]);

  function makeInvisible () {
    setShow(false);
    if (toSignin === true) {
      toSigninPage();
    } else if (toEdit === true) {
      toEditPage();
    }
  }

  function toSigninPage () {
    cookies.remove('token');
    router.push('/auth/signin');
  }

  function toEditPage () {
    router.push('/profile/edit')
  }

  return (
    <>
      {type === 'error' && show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b border-red-200 bg-red-50">
              <h3 className="text-lg font-semibold text-red-800">Error!</h3>
              <button
                onClick={makeInvisible}
                className="text-red-400 hover:text-red-600 text-xl font-bold"
                aria-label="close-button"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{message}</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={makeInvisible}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      {type === 'success' && show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b border-green-200 bg-green-50">
              <h3 className="text-lg font-semibold text-green-800">Success!</h3>
              <button
                onClick={makeInvisible}
                className="text-green-400 hover:text-green-600 text-xl font-bold"
                aria-label="close-button"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{message}</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={makeInvisible}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
