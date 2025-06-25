import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const cardMotion = {
    rest: {
        color: "grey",
        transition: {
            duration: 2,
        }
    },
    hover: {
        color: "#97abb8",
        scale: 1.05,
        transition: {
            duration: 0.4,
        }
    }
}

const lineExpansion = {
    rest: {
        width: "10rem",
        duration: 0.2
    },
    hover: {
        width: "20rem",
        transition: {
            duration: 0.2
        }
    }
}

export interface PolicyCardProps {
    title: string,
    subtitle?: string,
    content?: string,
    imageUrl?: string,
    moreContent?: string
}

export const assignCards = (cardData: Array<PolicyCardProps>) => {
    const checkMoreContent = (cardData: Array<PolicyCardProps>) => {
        cardData.forEach(c => {
            if (c.content && c.content.length > 200) {
                c.moreContent = c.content.substr(200)
                c.content = c.content.slice(0, 200)
            }
        })
        return cardData
    }

    return (
        <div className="flex justify-center flex-row items-center flex-wrap">
            {
                checkMoreContent(cardData).map((c) => (
                    <div key={c.title} className="m-10">
                        <PolicyCard {...c} />
                    </div>
                ))}
        </div>
    )
}

function PolicyCard({ title, subtitle, content, imageUrl, moreContent }: PolicyCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    const expandCard = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <motion.div
                onClick={expandCard}
                className="card cursor-pointer p-8"
                whileHover="hover"
                animate="rest"
                variants={cardMotion}
            >
                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed">
                                    {content + (moreContent ? moreContent : "")}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="rounded-none justify-center py-20 h-[25rem]">
                    <h2 className="text-center mb-8 text-xl font-bold">{title}</h2>
                    <p className="text-sm pl-20 pb-4 text-gray-600">
                        {subtitle}
                    </p>
                    <div className="pl-20">
                        <motion.div
                            className="h-px bg-gray-300"
                            variants={lineExpansion}
                        />
                    </div>
                    {imageUrl && (
                        <div className="max-w-[50%] -mt-6 mb-2 ml-[27rem] max-h-12 relative">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}
                    <div className="card-contents w-[40rem] pt-10 pl-20 pr-20 text-gray-700">
                        {content + (content?.length === 200 ? "..." : "")}
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default PolicyCard
