import React, { useState, useEffect, useRef } from 'react'
import TabBar from './TabBar'
import ChatSection from './ChatSection'
import AirbnbLive from './Airbnb/AirbnbLive'
import ChromeLive from './Chrome/ChromeLive'
import MobileLive from './Mobile/MobileLive'
import SlackLive from './Slack/SlackLive'
import BuildingPreview from './BuildingPreview'
import './HeroSection.css'
import hoverPreview from '../assets/previewIcon.svg'

const TABS = ['web', 'chrome', 'mobile', 'slack']

function HeroSection(){
    const [activeTab,      setActiveTab]      = useState('web')
    const [buildStage,     setBuildStage]     = useState(1)
    const [isBuilding,     setIsBuilding]     = useState(false)
    const [hasUserSubmitted, setHasUserSubmitted] = useState(false)
    const [rightPanelHover, setRightPanelHover] = useState(false)
    const [isTabTransitioning, setIsTabTransitioning] = useState(false)
    const [mobileView, setMobileView] = useState('builder')
    const intervalRef = useRef(null)


    // Reset build state and fade back in when tab changes
    useEffect(() => {
        setBuildStage(1)
        setIsBuilding(false)
        setHasUserSubmitted(false)

        const timer = setTimeout(() => {
            setIsTabTransitioning(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [activeTab])

    const startRotation = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setActiveTab(prev => {
                const nextIndex = (TABS.indexOf(prev) + 1) % TABS.length
                return TABS[nextIndex]
            })
        }, 10000)
    }

    useEffect(() => {
        startRotation()
        return () => clearInterval(intervalRef.current)
    }, [])

    const handleTabChange = (tab) => {
        setIsTabTransitioning(true)
        setActiveTab(tab)
        startRotation()
    }

    const stopRotation = () => clearInterval(intervalRef.current)

    // Called each time user submits a prompt — show BuildingPreview
    const handleSubmit = () => {
        setIsBuilding(true)
        setHasUserSubmitted(true)
    }

    // Called when a full response animation completes — hide BuildingPreview, advance stage
    const handleResponseDone = () => {
        setIsBuilding(false)
        setBuildStage(prev => Math.min(prev + 1, 4))
    }

    return(
    <div id="heroSection" className="heroSection">
        <div id="leftPanel" className={`leftPanel ${mobileView === 'builder' ? 'mobileActive' : 'mobileHidden'}`}>
            <TabBar activeTab={activeTab} setActiveTab={handleTabChange}/>
            <ChatSection
                activeTab={activeTab}
                stopRotation={stopRotation}
                onSubmit={handleSubmit}
                onResponseDone={handleResponseDone}
            />
        </div>
        <div
            id="rightPanel"
            className={`rightPanel ${isTabTransitioning ? 'transitioning' : ''} ${mobileView === 'preview' ? 'mobileActive' : 'mobileHidden'}`}
            onMouseEnter={() => setRightPanelHover(true)}
            onMouseLeave={() => setRightPanelHover(false)}
        >
            {isBuilding ? (
                <BuildingPreview />
            ) : activeTab === 'chrome' ? (
                <ChromeLive stage={buildStage === 1 ? 2 : buildStage - 1} />
            ) : activeTab === 'mobile' ? (
                <MobileLive stage={buildStage === 1 ? 2 : buildStage - 1} />
            ) : activeTab === 'slack' ? (
                <SlackLive stage={buildStage === 1 ? 3 : buildStage - 1} />
            ) : (
                <AirbnbLive stage={Math.max(1, buildStage - 1)} />
            )}

            {!hasUserSubmitted && rightPanelHover && (
                <div className="readyOverlay">
                    <div className="readyMessage">
                        <div className="hoverPreviewIcon">
                            <img src={hoverPreview} />
                        </div>
                        <p>Ready to be amazed</p>
                        <p>Watch Shipper work its magic on your idea</p>
                        <button className="startButton" onClick={handleSubmit}>Start building</button>
                    </div>
                </div>
            )}
        </div>

        <div className="mobileBottomTabs">
            <button
                className={`mobileTab ${mobileView === 'builder' ? 'mobileTabActive' : ''}`}
                onClick={() => setMobileView('builder')}
            >
                Builder
            </button>
            <button
                className={`mobileTab ${mobileView === 'preview' ? 'mobileTabActive' : ''}`}
                onClick={() => setMobileView('preview')}
            >
                Preview
            </button>
        </div>
    </div>
  )
}

export default HeroSection