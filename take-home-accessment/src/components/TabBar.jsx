import React, { useState, useEffect, useRef } from 'react'
import webIcon from '../assets/web.png'
import chromeIcon from '../assets/chrome.png'
import mobileIcon from '../assets/mobile.png'
import dropDownIcon from '../assets/dropDownMenu.png'
import slackIcon from '../assets/slack.png'

import './TabBar.css'

function TabBar({ activeTab, setActiveTab }){

    const [dropDownActive, setDropDownActive] = useState(false)
    const dropDownRef = useRef(null)

    useEffect(() => {
        if (!dropDownActive) return

        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setDropDownActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropDownActive])

    return (
        <div className="tabBar">
            <div className="leftTabBar">
                <div className={`tab webTab tabHover ${activeTab === 'web' ? 'activeTab' : ''}`}
                    onClick={() => setActiveTab('web')}
                >
                    <img src={webIcon} className="icon" alt="Web" />
                    <p>Web</p>
                </div>
                <div className={`tab chromeTab tabHover ${activeTab === 'chrome' ? 'activeTab' : ''}`}
                    onClick={() => setActiveTab('chrome')}
                >
                    <img src={chromeIcon} className="icon chromeIcon" alt="Chrome"/>
                    <p>Chrome Extension</p>
                </div>
                <div className={`tab mobileTab tabHover ${activeTab === 'mobile' ? 'activeTab' : ''}`}
                    onClick={() => setActiveTab('mobile')}
                >
                    <img src={mobileIcon} className="icon mobileIcon" alt="mobile"></img>
                    <p>Mobile App</p>
                </div>
            </div>
            <div className="dropDownTab" ref={dropDownRef}>
                <div className={`tab dropDownIcon tabHover ${activeTab === 'dropDown' ? 'activeTab' : ''}`}
                onClick={() => setDropDownActive(!dropDownActive)}>
                    <img src={dropDownIcon} className="icon dropDownIcon" alt="Drop Down Menu"/>
                </div>
                <div className={`slackDropDown ${dropDownActive === true ? 'slackVisible' : ''}`}
                    onClick={() => setActiveTab('slack')}>
                    <div className="slackTab">
                        <img src={slackIcon} className="icon slackIcon" alt="Slack"/>
                        <p>Slack Bot</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabBar