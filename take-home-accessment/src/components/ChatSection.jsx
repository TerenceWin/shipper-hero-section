import React, { useState, useEffect, useRef } from 'react'
import micIcon from '../assets/mic.webp'
import arrowIcon from '../assets/arrowUp.png'
import { useChatSection } from './useChatSection.js'
import ChatMessageResponse from './ChatMessageResponse.jsx'
import { TYPING_TEXTS1, TYPING_TEXTS2, TYPING_TEXTS3 } from './chatData.js'
import "./ChatSection.css"
import "./CloudPermission.css"

const ALL_TYPING_TEXTS    = [TYPING_TEXTS1, TYPING_TEXTS2, TYPING_TEXTS3]
const RESP_TYPING_SPEED   = 6
const RESP_FILE_SPEED     = 75
const CLOUD_PERM_TEXT     = 'Shipper needs permission to enable cloud backend for session saving and authentication.'

// Estimate how long the full response animation will take in ms
const estimateResponseDuration = (data) => {
    const isCloud    = data[1] === 'Enable Shipper Cloud'
    const thought    = data[0]
    const files      = isCloud ? data[2] : data[1]
    const completion = isCloud ? data[3] : data[2]
    const success    = isCloud ? data[4] : data[3]

    return (
        1000 +                                              // thinking delay
        thought.length    * RESP_TYPING_SPEED +
        (isCloud
            ? CLOUD_PERM_TEXT.length * RESP_TYPING_SPEED   // cloud: only thought + perm text (user click unknown)
            : files.length * RESP_FILE_SPEED) +
        completion.length * RESP_TYPING_SPEED +
        success.length    * RESP_TYPING_SPEED
    )
}

function ChatSection({ activeTab, stopRotation }){

    const { isFocused, textareaValue, animationDone, messages, handleFocus, handleBlur, handleChange, handleKeyDown, requestText } = useChatSection(activeTab, stopRotation)

    const [cloudEnabled, setCloudEnabled]               = useState(false)
    const [timerProgress, setTimerProgress]             = useState(0)
    const [timerTransitionDuration, setTimerTransition] = useState(800)
    const completedCountRef = useRef(0)

    const timerControlled  = messages.some(m => m.type === 'response')
    const totalResponses   = ALL_TYPING_TEXTS.filter(t => t[activeTab]?.length > 0).length

    // Reset on tab switch
    useEffect(() => {
        setCloudEnabled(false)
        setTimerProgress(0)
        setTimerTransition(800)
        completedCountRef.current = 0
    }, [activeTab])

    // When a new response message is added, start the timerLine immediately for non-cloud
    useEffect(() => {
        const lastMsg = messages[messages.length - 1]
        if (!lastMsg || lastMsg.type !== 'response') return

        const isCloud = lastMsg.data[1] === 'Enable Shipper Cloud'
        if (isCloud) return  // cloud timing is unknown, handled in onResponseComplete

        const nextCount  = completedCountRef.current + 1
        const nextProgress = Math.min((nextCount / totalResponses) * 100, 100)
        const duration   = estimateResponseDuration(lastMsg.data) + 3000  // +3s after ends

        setTimerTransition(duration)
        setTimerProgress(nextProgress)
    }, [messages.length])

    // Called when response animation fully completes
    const onResponseComplete = () => {
        completedCountRef.current++
        const progress = Math.min((completedCountRef.current / totalResponses) * 100, 100)

        // End the timerLine exactly 3 seconds after response finishes
        setTimeout(() => {
            setTimerTransition(3000)
            setTimerProgress(progress)
        }, 3000)
    }

    return (
        <div className="chatSection">
            <div
                key={activeTab}
                className={`timerLine ${timerControlled ? 'timerLineControlled' : ''}`}
                style={timerControlled ? {
                    width: `${timerProgress}%`,
                    transition: `width ${timerTransitionDuration}ms linear`
                } : {}}
            />

            <div className={`chatHistory`}>
                {messages.map((msg, i) => {
                    if (msg.type === 'user') {
                        return <div key={i} className="chatMessage">{msg.text}</div>
                    }
                    return (
                        <ChatMessageResponse
                            key={msg.id}
                            msg={msg}
                            cloudEnabled={cloudEnabled}
                            setCloudEnabled={setCloudEnabled}
                            onComplete={onResponseComplete}
                        />
                    )
                })}
            </div>

            <div className={`chatBox ${isFocused ? 'chatBoxActive' : ''}`}>
                <textarea
                    className="chatInput"
                    value={textareaValue}
                    placeholder={animationDone ? 'Describe what you want to build...' : ''}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <div className={`chatBoxButtons`}>
                    <button className="micButton">
                        <img src={micIcon} className="micIcon"/>
                    </button>
                    <div className="arrowWrapper">
                        <div className="clickHereButton">Click here</div>
                        <button className="arrowButton" onClick={requestText}>
                            <img src={arrowIcon} className="arrowIcon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSection
