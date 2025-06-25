'use client'

// @ts-nocheck

import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import axios from 'axios'
import { Banner } from '../../components/TheHeader'
import Layout from '../../components/TheLayout'

interface BudgetType {
  policy_type: string
  policy_cost: number
}

const electedInitiativeURL = 'http://localhost:8000/api/v1/elected-initiative/'
const policyURL = 'http://localhost:8000/api/v1/policy'

const PolicyTypeMapping = [
  "Taxation",
  "Lifestyle and Culture",
  "Community",
  "Infrastructure and Transport",
  "Foreign Relations",
  "Health",
  "Education and Employment",
  "National Security",
  "Safety",
  "Industry",
  "Science and Technology",
  "Environment",
  "Energy",
  "Assets",
  "Economy",
  "Foreign Trade",
  "Natural Resources"
]

export default function BudgetPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)
  const [data, setData] = React.useState<BudgetType[]>([])
  const [electedInitiative, setElectedInitiative] = React.useState(0)

  React.useEffect(() => {
    ; (async function () {
      // first get the elected initiative
      axios.get(electedInitiativeURL).then(res => {
        let eInit = res.data[0].elected_initiative
        console.log(eInit)
        setElectedInitiative(eInit)
        // call axios on policy
        return eInit
      }
      ).then(e =>
        axios.get(policyURL).then(res => {
          let _data = res.data
          console.log(_data, e)
          // filter the policies by initiative
          _data = _data.filter(policy => policy.initiative == e)
          console.log("after filtering", _data)
          _data = _data.map(d => ({ policy_type: PolicyTypeMapping[d.policy_type], policy_cost: d.policy_cost }))
          console.log("after mapping", _data)
          setData(_data)
          console.log(data)
        })
      )
      setIsLoading(false)
    })()
  }, [])

  if (isLoading)
    return (
      <Layout>
        <div className="w-full h-96 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    )
  else if (error) return (
    <Layout>
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-red-500">Error loading budget data</p>
      </div>
    </Layout>
  )

  const labels = data.map(({ policy_type }) => policy_type)
  const amounts = data.map(({ policy_cost }) => policy_cost)

  return (
    <Layout>
      <Banner
        title="Budget"
        subtitle="Learn about this year's federal budget"
        quote="Money, if it does not bring you happiness, will at least help you be miserable in comfort"
        author="Helen Brown"
      />
      <div className="flex flex-col items-center px-[25%] mt-20 mb-16">
        <h1 className="mx-[10%] text-4xl font-bold">
          Budget Views
        </h1>
        <div className="mt-6 mb-28 h-0.5 w-full bg-gray-700" />

        <div className="flex flex-col items-center border border-gray-300 w-full p-8">
          <div className="h-[500px] w-full max-w-[500px]">
            <Doughnut
              data={{
                labels,
                datasets: [
                  {
                    label: 'My First Dataset',
                    data: amounts,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      'rgb(255, 159, 64)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                      'rgb(255, 99, 255)',
                      'rgb(99, 255, 132)',
                      'rgb(132, 99, 255)',
                      'rgb(255, 205, 99)',
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
          <h2 className="text-3xl mt-12 mb-16">
            2021 Budget Proportions
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center border border-gray-300 w-full mt-28 p-12">
          <div className="w-full h-96">
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    data: amounts,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      'rgb(255, 159, 64)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                      'rgb(255, 99, 255)',
                      'rgb(99, 255, 132)',
                      'rgb(132, 99, 255)',
                      'rgb(255, 205, 99)',
                    ],
                    borderColor: [],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
          <h2 className="text-3xl mt-16">
            2021 Revenue Expenses
          </h2>
        </div>
      </div>
    </Layout>
  )
}
