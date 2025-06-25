'use client';

// @ts-nocheck
import assignActions, { ActionProp } from '../../components/Actions'
import React from 'react'
import { Banner } from '../../components/TheHeader'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import axios from 'axios'
import { Radio, RadioGroup } from "@chakra-ui/react"
import { CodeSlash } from 'react-bootstrap-icons'
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
            <Box>
                {assignActions(actions)}
            </Box>
            <Flex className="ctl-panel" p="5rem" flexDir="column">
                <CodeSlash size={35} onClick={() => { setDevMode(!devMode) }} cursor="pointer" />
                {devMode && <>
                    <Input value={prompt} onChange={handleChange} />
                    <RadioGroup onChange={setValue} value={value}>
                        <Flex flexDir="row" p="2rem" flexWrap="wrap">
                            {Object.keys(ACTION_MAP).map((key, val) => (
                                <Radio key={key} value={key} m="1rem">{key}</Radio>
                            ))}
                        </Flex>
                    </RadioGroup>
                    <Button onClick={handleClick}>Submit</Button>
                </>}
            </Flex>
        </Layout>
    )
}
