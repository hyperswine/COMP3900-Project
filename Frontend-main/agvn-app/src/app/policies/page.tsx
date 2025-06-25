'use client'

import React from 'react'
import { assignCards, PolicyCardProps } from '../../components/InfoCard/policy_card'
import { Grid, Flex } from '@chakra-ui/react'
import { Banner } from '../../components/TheHeader'
import { Button, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
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

            <Flex flexDir="column" m="2rem">
                <Flex mb="2rem" gap="1rem" alignItems="center" flexWrap="wrap">
                    <Input
                        placeholder="Search policies..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        maxW="300px"
                    />

                    <RadioGroup onChange={setFilterValue} value={filterValue}>
                        <Stack direction="row" spacing={4}>
                            <Radio value="0">All</Radio>
                            <Radio value="1">Health</Radio>
                            <Radio value="2">Education</Radio>
                            <Radio value="3">Economy</Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>

                <Grid
                    templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                    gap={6}
                    p="1rem"
                >
                    {filteredPolicies.map((policy, index) => (
                        <div key={index}>
                            {assignCards(policy)}
                        </div>
                    ))}
                </Grid>

                {filteredPolicies.length === 0 && (
                    <Text textAlign="center" fontSize="lg" color="gray.500" mt="2rem">
                        No policies found matching your criteria.
                    </Text>
                )}
            </Flex>
        </Layout>
    )
}
