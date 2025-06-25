'use client'

// @ts-nocheck

import React from 'react'
import Header from '../TheHeader'
import Footer from '../TheFooter'
import axios from "axios"
// SVG icons to replace react-bootstrap-icons
import { motion } from 'framer-motion'
import { useRef } from 'react'

interface TheLayoutProps {
  children: React.ReactNode
}

const TheLayout: React.FC<TheLayoutProps> = ({ children }) => {
  let [message, setMessage] = React.useState<string>('')
  let [chatbotReply, setChatbotReply] = React.useState<string>('')
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  React.useEffect(() => {
    async function chatBotReply(userMessage: string): Promise<string> {
      try {
        let response = await axios.get(
          'http://localhost:1337/message?' + `message=${userMessage}`
        )
        setChatbotReply(() => (chatbotReply = response.data.message))
        return 'done'
      } catch (error) {
        console.log({ chatError: error })
        return 'error'
      }
    }

    if (message) {
      chatBotReply(message)
    }
  }, [message])

  const chatbotUrl = 'http://localhost:1337/message/'

  const getReply = (input: string, userMessage: MessageHistory, callBack: any) => {
    // get the input value and place into message history
    setInputValue("")
    setMessageHistory([...messageHistory, userMessage])

    axios.get(chatbotUrl, { params: { message: input } })
      .then(res => {
        console.log(res.data.message)
        console.log(messageHistory)
        setMessageHistory([...messageHistory, userMessage, { by: 1, message: res.data.message, id: currId + 2 }])
        currId = currId + 2
        console.log(messageHistory)
      })
      .then(callBack)
      .catch(err => console.log(err))
    console.log(messageHistory)
  }

  interface MessageHistory {
    // 0 -> user, 1 -> AI
    by: number,
    message: string
    id: number,
  }

  const [messageHistory, setMessageHistory] = React.useState<Array<MessageHistory>>([{ by: 1, message: "Welcome to AGVN!", id: 1 }])

  const messageEvent = useRef(null)

  const [inputValue, setInputValue] = React.useState("")
  const handleInputChange = (event) => setInputValue(event.target.value)
  var currId = 1

  const handleKeyPressChatbot = (event: any) => {
    if (event.key === 'Enter') {
      console.log("pressed Enter!")
      getReply(inputValue, { by: 0, message: inputValue, id: currId + 1 }, () => { })
    }
  }

  const chatModal = isModalOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Chat with AGVN Bot</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6" ref={messageEvent}>
          <div className="flex flex-col w-full space-y-4">
            {messageHistory.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.by === 0 ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${m.by === 0
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    <p className="font-semibold text-sm">
                      {m.by === 1 ? "Bot: " : "You: "}
                      <span className="font-normal ml-1">{m.message}</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Send a message"
              onKeyPress={handleKeyPressChatbot}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => {
                getReply(inputValue, { by: 0, message: inputValue, id: currId + 1 }, () => { })
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null

  // @ts-ignore
  return (
    <>
      {chatModal}

      <div className="fixed bottom-16 right-16 cursor-pointer z-30">
        <motion.div whileHover={{ scale: 1.1 }}>
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-colors"
          >
            <svg width="35" height="35" fill="white" viewBox="0 0 16 16">
              <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </div>
        </motion.div>
      </div>

      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default TheLayout
