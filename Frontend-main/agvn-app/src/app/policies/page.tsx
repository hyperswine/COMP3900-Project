'use client'

import React from 'react'
import { assignCards, PolicyCardProps } from '../../components/InfoCard/policy_card'
import { Banner } from '../../components/TheHeader'
import Layout from '../../components/TheLayout'
import axios from 'axios'

const PolicyTypeMap = {
    "health": "/assets/PolicyType_logos/health.jpg",
    "community": "/assets/PolicyType_logos/community.jpg",
    "education": "/assets/PolicyType_logos/education.png",
    "national_security": "/assets/PolicyType_logos/national_security.png",
    "economy": "/assets/PolicyType_logos/economy.jpg",
    "employment": "/assets/PolicyType_logos/employment.png",
    "energy": "/assets/PolicyType_logos/energy.jpg",
    "foreign_affairs": "/assets/PolicyType_logos/foreign_affairs.png",
    "foreign_trade": "/assets/PolicyType_logos/foreign_trade.png",
    "industry": "/assets/PolicyType_logos/industry.jpg",
    "natural_resources": "/assets/PolicyType_logos/natural_resources.jpg",
    "environment": "/assets/PolicyType_logos/environment.png",
    "science_and_technology": "/assets/PolicyType_logos/science_and_technology.png",
    "taxation": "/assets/PolicyType_logos/taxation.png"
}

export default function PoliciesPage() {
    const [policies, setPolicies] = React.useState<PolicyCardProps[]>([])
    const [filterValue, setFilterValue] = React.useState("0")
    const [searchValue, setSearchValue] = React.useState("")

    React.useEffect(() => {
        // Load policies from API
        const loadPolicies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/policies')
                const fetchedPolicies = response.data.map((policy: any) => ({
                    title: policy.title,
                    description: policy.description,
                    imageUrl: PolicyTypeMap[policy.policy_type as keyof typeof PolicyTypeMap] || "/assets/empty_image.png",
                    id: policy.id
                }))
                setPolicies(fetchedPolicies)
            } catch (error) {
                console.error('Failed to load policies:', error)
            }
        }

        loadPolicies()
    }, [])

    const filteredPolicies = policies.filter(policy => {
        const matchesSearch = policy.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                            policy.description.toLowerCase().includes(searchValue.toLowerCase())

        if (filterValue === "0") return matchesSearch
        // Add other filter logic based on your needs
        return matchesSearch
    })

    return (
        <Layout>
            <Banner title="Current Policies" subtitle="Explore government policies and initiatives" />

            <div className="flex flex-col m-8">
                <div className="mb-8 flex gap-4 items-center flex-wrap">
                    <input
                        placeholder="Search policies..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="filter"
                                value="0"
                                checked={filterValue === "0"}
                                onChange={(e) => setFilterValue(e.target.value)}
                                className="mr-2"
                            />
                            All
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="filter"
                                value="1"
                                checked={filterValue === "1"}
                                onChange={(e) => setFilterValue(e.target.value)}
                                className="mr-2"
                            />
                            Health
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="filter"
                                value="2"
                                checked={filterValue === "2"}
                                onChange={(e) => setFilterValue(e.target.value)}
                                className="mr-2"
                            />
                            Education
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="filter"
                                value="3"
                                checked={filterValue === "3"}
                                onChange={(e) => setFilterValue(e.target.value)}
                                className="mr-2"
                            />
                            Economy
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4">
                    {filteredPolicies.map((policy, index) => (
                        <div key={index}>
                            {assignCards([policy])}
                        </div>
                    ))}
                </div>

                {filteredPolicies.length === 0 && (
                    <p className="text-center text-lg text-gray-500 mt-8">
                        No policies found matching your criteria.
                    </p>
                )}
            </div>
        </Layout>
    )
}
