import React, { useState } from "react"

export interface PopupProps {
  title: string,
  subtitle?: string,
  content?: any,
}

/**
 * @returns PopUp Button, when clicked, brings up a modal
 */
function PopUpButton(props: PopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Trigger modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">{props.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              {props.content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUpButton