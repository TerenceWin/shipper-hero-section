import React, { useState, useEffect, useRef } from 'react'
import './BuildingPreview.css'

const SUBTITLE = 'Running build commands and compiling your app. This may take a moment...'
const TYPING_SPEED = 22  // ms per character (2x faster than chatbox 45ms)

const STEPS = [
    {
        label: 'Setting up environment',
        bg: '#b0c4d8',
        icon: (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                <path d="M21 2H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 16H3V4h18v14z"/>
            </svg>
        ),
    },
    {
        label: 'Loading dependencies',
        bg: '#3cb97a',
        icon: (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-14a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4zm0 2a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/>
            </svg>
        ),
    },
    {
        label: 'Configuring environment',
        bg: '#d4417a',
        icon: (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                <path d="M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 4h4v3h-4zm10 16H4V9h16z"/>
            </svg>
        ),
    },
    {
        label: 'Building project',
        bg: '#7c5cbf',
        icon: (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a6.97 6.97 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/>
            </svg>
        ),
    },
]

function BuildingPreview() {
    const [activeStep,   setActiveStep]   = useState(0)
    const [typedText,    setTypedText]    = useState('')
    const charIndexRef = useRef(0)
    const timerRef     = useRef(null)

    // Typing animation for subtitle
    useEffect(() => {
        const animate = () => {
            if (charIndexRef.current <= SUBTITLE.length) {
                setTypedText(SUBTITLE.slice(0, charIndexRef.current))
                charIndexRef.current++
                timerRef.current = setTimeout(animate, TYPING_SPEED)
            }
        }
        animate()
        return () => clearTimeout(timerRef.current)
    }, [])

    // Cycle through steps to simulate build activity
    useEffect(() => {
        const id = setInterval(() => {
            setActiveStep(prev => (prev + 1) % STEPS.length)
        }, 900)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="buildingPreview">

            {/* Puzzle piece illustration */}
            <div className="buildingPreviewIcon">
                <svg viewBox="0 0 80 60" className="puzzleIcon">
                    {/* Main body */}
                    <rect x="10" y="14" width="60" height="38" rx="4" fill="#e0e0e0"/>
                    {/* Top tab */}
                    <ellipse cx="40" cy="14" rx="8" ry="7" fill="#e0e0e0"/>
                    {/* Right notch */}
                    <ellipse cx="70" cy="33" rx="7" ry="8" fill="#f5f5f0"/>
                    {/* Bottom tab */}
                    <ellipse cx="40" cy="52" rx="8" ry="7" fill="#e0e0e0"/>
                    {/* Left notch */}
                    <ellipse cx="10" cy="33" rx="7" ry="8" fill="#f5f5f0"/>
                    {/* Inner highlight */}
                    <rect x="18" y="22" width="44" height="24" rx="3" fill="#d4d4d4" opacity="0.5"/>
                    {/* Shadow */}
                    <ellipse cx="40" cy="58" rx="28" ry="4" fill="#d8d8d0" opacity="0.5"/>
                </svg>
            </div>

            <h2 className="buildingPreviewTitle">Building Application</h2>
            <p className="buildingPreviewSubtitle">{typedText}</p>

            {/* Steps */}
            <div className="buildingPreviewSteps">
                {STEPS.map((step, i) => (
                    <div
                        key={step.label}
                        className={"buildingStep" + (i === activeStep ? " buildingStepActive" : "")}
                    >
                        <div
                            className="buildingStepIcon"
                            style={{ backgroundColor: i === activeStep ? step.bg : '#c8cdd3' }}
                        >
                            {step.icon}
                        </div>
                        <span className="buildingStepLabel">{step.label}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BuildingPreview
