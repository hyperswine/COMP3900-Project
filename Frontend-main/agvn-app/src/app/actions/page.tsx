'use client'

// @ts-nocheck
import assignActions, { ActionProp } from '../../components/Actions'
import React from 'react'
import { Banner } from '../../components/TheHeader'
import axios from 'axios'
import Layout from '../../components/TheLayout'

// Use public path for app router
const flood = '/assets/Images/victoria_flooding_jumbo_img.png'
const cyclone = '/assets/Action_images/cyclone.jpg'
const bushfire = '/assets/Action_images/bushfire.jpg'
const drought = '/assets/Action_images/drought.jpg'
const war = '/assets/Action_images/war.png'
const citizen_hostage = '/assets/Action_images/hostage.jpg'
const terrorism = '/assets/Action_images/terrorism.png'
const pandemic = '/assets/Action_images/pandemic.jpg'
const nuclear_meltdown = '/assets/Action_images/nuclear_meltdown.jpg'
const mass_revolt = '/assets/Action_images/mass_revolt.jpg'
const corporate_abuse = '/assets/Action_images/corporate_abuse.png'

/**
 * Image types reqiured
 *  flooding
 *  cyclone
 *  earthquake
 *  diplomatic emergency
 *  war
 *  terrorist activity
 *  pandemic
 *  nuclear meltdown
 *  riots
 */

const ACTION_MAP: { [key: string]: string } = {
  'flood': flood,
  'cyclone': cyclone,
  'bushfire': bushfire,
  'drought': drought,
  'war': war,
  'citizen_hostage': citizen_hostage,
  'terrorism': terrorism,
  'pandemic': pandemic,
  'nuclear_meltdown': nuclear_meltdown,
  'mass_revolt': mass_revolt,
  'corporate_abuse': corporate_abuse
}

const actionsUrl = 'http://localhost:8200/action/'

export default function ActionPage() {
  const [actions, setActions] = React.useState<Array<ActionProp>>([{
    heading: `Responding to the recent flooding in Victoria`,
    content: `Flooding is natural and cannot be stopped and can have both positive and negative impacts.

    The positive impacts of flooding, for example, include water for wetland ecosystems and replenishing soil moisture and nutrients.

    The negative impacts can bring substantial damages to homes and businesses, critical infrastructure and to farming, such as agriculture and crops. However, the negative effects of floods can be reduced with good planning and the right actions.

    Flood planning and action is a shared community responsibility. Local, state and federal governments all have a role to play in reducing the damage from floods in Victoria but so do you and your neighbours.`,
    imgUrl: flood,
    current: true
  }])
  const [prompt, setPrompt] = React.useState<string>("")
  const [value, setValue] = React.useState('cyclone')

  const [devMode, setDevMode] = React.useState(false)

  const getAction = (prompt: string, callback: any) => {
    axios.get(actionsUrl, { params: { action: prompt } })
      .then(res => setActions([...actions, { heading: prompt, content: res.data['text'], imgUrl: ACTION_MAP[value] }]))
      .then(callback())
      .catch(err => console.log(err))
  }

  const handleChange = (event: any) => {
    setPrompt(event.target.value)
  }

  const handleClick = () => {
    getAction(prompt, () => {
      setPrompt("")
      console.log(value)
    })
  }

  return (
    <Layout>
      <Banner title="Actions" subtitle="AGVN is prepared to take action" quote="The most effective way to do it, is to do it." author="Amelia Earhart" />
      <div>
        {assignActions(actions)}
      </div>
      <div className="ctl-panel p-20 flex flex-col">
        <div
          className="w-9 h-9 cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => { setDevMode(!devMode) }}
        >
          {/* Code icon placeholder - you can replace with any icon library */}
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        {devMode && (
          <div className="mt-4 space-y-4">
            <input
              value={prompt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="space-y-2">
              <div className="flex flex-row p-8 flex-wrap gap-4">
                {Object.keys(ACTION_MAP).map((key, val) => (
                  <label key={key} className="flex items-center space-x-2 m-4">
                    <input
                      type="radio"
                      name="action-type"
                      value={key}
                      checked={value === key}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700">{key}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
