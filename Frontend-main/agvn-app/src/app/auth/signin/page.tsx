'use client'

import React from 'react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'
import Popups from '../../../components/Popup'
import PageTitle from '../../../components/PageTitle'
import { Banner } from '../../../components/TheHeader'
import Layout from '../../../components/TheLayout'

const host = 'http://127.0.0.1:8000/api/v1'

export default function SigninPage() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMsg, setErrorMsg] = React.useState('')
    const cookies = new Cookies()
    const router = useRouter()

    async function login(e: any) {
        e.preventDefault()
        try {
            const req = {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password,
                    }
                )
            }
            const response = await fetch(`${host}/login`, req)
            if (response.status === 400) {
                setEmail('')
                setPassword('')
                setErrorMsg('Wrong password or email')
            } else {
                const data = await response.json()
                setErrorMsg('')
                cookies.set('token', data.token, { path: '/' })
                router.push('/')
            }
        } catch (error) {
            setErrorMsg("Please try again.")
            setPassword('')
        }
    }

    React.useEffect(() => {
        if (cookies.get('token') !== undefined) {
            router.push('/')
        }
    })

    function recordEmail(e: any) {
        e.preventDefault()
        setEmail(e.target.value)
        setErrorMsg('')
    }

    function recordPassword(e: any) {
        e.preventDefault()
        setPassword(e.target.value)
        setErrorMsg('')
    }

    return (
        <Layout>
            <Banner title="Login" subtitle="Login to A-GVN System" />
            <div className="flex flex-col m-20 items-center justify-center">
                <div className="my-20 h-8">
                    <PageTitle title="Sign in" />
                </div>
                <form
                    onSubmit={login}
                    className="h-full pl-10 max-w-lg w-full space-y-6"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={recordEmail}
                            placeholder="Enter your email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password *
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={recordPassword}
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors text-lg mb-8"
                    >
                        Sign in
                    </button>

                    <p className="text-center text-gray-700">
                        Don&apos;t have an account?{' '}
                        <span className="font-bold text-blue-500 hover:text-blue-600">
                            <Link href="/auth/signup">Create one.</Link>
                        </span>
                    </p>
                </form>
                <Popups type="error" message={errorMsg} />
            </div>
        </Layout>
    )
}
