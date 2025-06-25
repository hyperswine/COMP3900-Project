'use client';

import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { motion } from 'framer-motion'
import { CheckCircleFill, X } from 'react-bootstrap-icons'
import GenericModal from '../../components/GenericModal'
import GCoinChart from '../../components/GCoinChart'
import Layout from '../../components/TheLayout'

interface GCoinCardProps {
    address: string
    value: number
}

const GCoinCard = (props: GCoinCardProps) => {
    return (
        <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 50px #D2CEAF" }} style={{ borderRadius: "25px" }}>
            <div className="flex justify-between min-w-80 shadow-2xl cursor-pointer rounded-3xl">
                <div className="bg-yellow-200 mr-80 rounded-3xl p-8">
                    <p className="font-semibold">Address</p>
                    <p>{props.address.substr(0, 20)}...</p>
                </div>
                <div>
                    <p className="text-2xl font-semibold p-8">{props.value}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default function AerosPage() {
    const cookies = new Cookies()
    const [auth, setAuth] = React.useState(false)
    const [totalGCoin, setTotalGCoin] = React.useState(0)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [gcoinAddressInfo, setGCoinAddressInfo] = useState<Array<GCoinCardProps>>([{ address: "21fsafas", value: 25 }])

    // Payment state
    const [recipientAddr, setRecipientAddr] = useState("")
    const [payValue, setPayValue] = useState(0)
    const [payStatus, setPayStatus] = useState(0) // 0: default, 1: pending, 2: success, 3: error
    const [loading, setLoading] = useState(false)
    const [statistics, setStatistics] = useState([])

    const noLoginContainer = (
        <div className="flex flex-col justify-center items-center mb-20">
            <h1 className="text-center mb-4 mt-10 text-4xl font-bold">Login to access Aeros!</h1>
            <p className="text-xs text-gray-600">With Aeros you can register your wallet, access your accounts, and send GCoin to other addresses.</p>
        </div>
    )

    React.useEffect(() => {
        setAuth(cookies.get('token') ? true : false)
        // set total gcoin to the sum of gcoin addresses
        gcoinAddressInfo.forEach(g => {
            setTotalGCoin(g.value + totalGCoin)
        })
        handleGetStatistics()
    }, [gcoinAddressInfo])

    const handleAddAddress = () => {
        // add an address, create a random value
        let addr = "asfasv"
        setGCoinAddressInfo([...gcoinAddressInfo, { address: addr, value: 0 }])
    }

    const handleGetStatistics = () => {
        const statisticsURL = 'http://localhost:4200/statistics/'
        axios.get(statisticsURL)
            .then(res => setStatistics(res.data))
            .catch(err => console.log(err))
    }

    const handlePay = () => {
        // first, check if the user has enough money in their wallet
        if (totalGCoin < payValue || payValue <= 0) {
            setPayStatus(3)
        }
        else {
            setPayStatus(1)
            setLoading(true)
            const transactionPayURL = 'http://localhost:4200/send/'
            // pay the address
            let data = { from_addr: "", to_addr: recipientAddr, amount: payValue, fee: 1 }
            setRecipientAddr("")
            setPayValue(0)

            // subtract from each address until you get the right amount
            let total = payValue
            gcoinAddressInfo.forEach(g => {
                if (total != 0) {
                    let can_pay = Math.min(g.value, payValue)
                    total -= can_pay
                    g.value -= can_pay
                }
            })

            axios.post(transactionPayURL, data)
                .then(res => {
                    if (res.data.is_success) {
                        setTotalGCoin(totalGCoin - payValue)
                        setPayStatus(2)
                    }
                    else {
                        setPayStatus(3)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setPayStatus(3)
                    setLoading(false)
                })
        }
    }

    const getPayIcon = () => {
        switch (payStatus) {
            case 1:
                return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            case 2:
                return <CheckCircleFill size={30} color="green" />
            case 3:
                return <X size={30} color="red" />
            default:
                return null
        }
    }

    const payModal = (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setIsModalOpen(false)}>
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
                <div className="mt-3 text-center">
                    <h3 className="text-lg font-medium text-gray-900">Pay Someone</h3>
                    <div className="mt-2 px-7 py-3">
                        <input
                            type="text"
                            placeholder="Recipient Address"
                            value={recipientAddr}
                            onChange={(e) => setRecipientAddr(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={payValue}
                            onChange={(e) => setPayValue(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <div className="flex justify-center mb-3">
                            {getPayIcon()}
                        </div>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            onClick={handlePay}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Send Payment'}
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const statisticsContent = (
        <div className="flex">
            <GCoinChart data={statistics} width={500} />
        </div>
    )

    const loginContainer = (
        <div className="flex flex-col justify-center items-center mb-20 min-w-96">
            {isModalOpen && payModal}
            <div className="flex flex-col items-center justify-center mb-10 bg-white p-6 rounded-lg shadow-md">
                <p className="text-center mb-2 text-gray-600">GCoin<sup>TM</sup></p>
                <hr className="w-full mb-1" />
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleAddAddress}
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Add Address
                    </button>
                    <GenericModal title="GCoin Value" buttonText="Statistics" content={statisticsContent} />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Pay Someone
                    </button>
                </div>
            </div>
            <h1 className="text-center mb-4 text-2xl font-bold">Your GCOIN Wallet</h1>
            <div className="flex justify-between min-w-[35rem] mb-4">
                <div className="flex gap-4">
                    <span>View</span>
                    <span>History</span>
                </div>
                <div>
                    <span>Total: {totalGCoin}</span>
                </div>
            </div>
            <hr className="w-full mb-8" />
            <div className="flex flex-col p-8 gap-8">
                {gcoinAddressInfo.map(g => (
                    <GCoinCard address={g.address} value={g.value} key={g.address} />
                ))}
            </div>
        </div>
    )

    return (
        <Layout>
            <div className="flex flex-col p-16 justify-center items-center min-h-[600px]">
                {auth ? loginContainer : noLoginContainer}
            </div>
        </Layout>
    )
}
