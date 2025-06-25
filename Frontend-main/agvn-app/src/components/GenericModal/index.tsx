import React, { useState } from "react";

export interface GenericModalProps {
  title: string
  buttonText: string
  content?: any
  closeButton?: boolean
  footer?: boolean
}

function GenericModal(props: GenericModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        onClick={handleShow}
      >
        {props.buttonText}
      </button>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{props.title}</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {props.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GenericModal
