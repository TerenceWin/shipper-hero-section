import React, { useState, useEffect, useRef } from 'react'
import TabBar from './TabBar'
import ChatSection from './ChatSection'
import AirbnbLive from './Airbnb/AirbnbLive'
import ChromeLive from './Chrome/ChromeLive'
import MobileLive from './Mobile/MobileLive'
import BuildingPreview from './BuildingPreview'
import './HeroSection.css'

const TABS = ['web', 'chrome', 'mobile', 'slack']

function HeroSection(){
    const [activeTab,      setActiveTab]      = useState('web')
    const [buildStage,     setBuildStage]     = useState(1)
    const [buildProgress,  setBuildProgress]  = useState({ revealed: 0, total: 0 })
    const [isBuilding,     setIsBuilding]     = useState(false)
    const intervalRef = useRef(null)

    // Reset build state whenever the tab changes
    useEffect(() => {
        setBuildStage(1)
        setBuildProgress({ revealed: 0, total: 0 })
        setIsBuilding(false)
    }, [activeTab])

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

    // Called each time user submits a prompt — show BuildingPreview
    const handleSubmit = () => {
        setIsBuilding(true)
        setBuildProgress({ revealed: 0, total: 0 })
    }

    // Called as files are revealed in the current response animation
    const handleBuildProgress = (revealed, total) => setBuildProgress({ revealed, total })

    // Called when a full response animation completes — hide BuildingPreview, advance stage
    const handleResponseDone = () => {
        setIsBuilding(false)
        setBuildStage(prev => Math.min(prev + 1, 3))
    }

    return(
    <div id="heroSection" className="heroSection">
        <div id="leftPanel" className="leftPanel">
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <ChatSection
                activeTab={activeTab}
                stopRotation={stopRotation}
                onSubmit={handleSubmit}
                onBuildProgress={handleBuildProgress}
                onResponseDone={handleResponseDone}
            />
        </div>
        <div id="rightPanel" className="rightPanel">
            {isBuilding ? (
                <BuildingPreview />
            ) : activeTab === 'chrome' ? (
                <ChromeLive stage={buildStage === 1 ? 2 : buildStage - 1} />
            ) : activeTab === 'mobile' ? (
                <MobileLive />
            ) : (
                <AirbnbLive stage={buildStage} buildProgress={buildProgress} />
            )}
        </div>
    </div>
  )
}

export default HeroSection