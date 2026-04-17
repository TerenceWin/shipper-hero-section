import React, { useState, useEffect, useRef } from 'react'
import TabBar from './TabBar'
import ChatSection from './ChatSection'
import './HeroSection.css'

const TABS = ['web', 'chrome', 'mobile', 'slack']

function HeroSection(){
    const [activeTab, setActiveTab] = useState('web')
    const intervalRef = useRef(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveTab(prev => {
                const nextIndex = (TABS.indexOf(prev) + 1) % TABS.length
                return TABS[nextIndex]
            })
        }, 10000)
        return () => clearInterval(intervalRef.current)
    }, [])

    const stopRotation = () => clearInterval(intervalRef.current)

    return(
    <div id="heroSection" className="heroSection">
        <div id="leftPanel" className="leftPanel">
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <ChatSection activeTab={activeTab} stopRotation={stopRotation}/>
        </div>
        <div id="rightPanel" className="rightPanel">

        </div>
    </div>
  )
}

export default HeroSection