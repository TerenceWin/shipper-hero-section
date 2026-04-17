import React, { useState, useEffect, useRef } from 'react'
import arrowIcon from '../assets/arrowUp.png'
import './ChatMessageResponse.css'

const TYPING_SPEED = 6         // 2x faster than previous 12ms
const FILE_REVEAL_SPEED = 75   // 2x faster than previous 150ms
const CLOUD_PERMISSION_TEXT = 'Shipper needs permission to enable cloud backend for session saving and authentication.'

function CollapsibleSection({ header, children, wrapperClass, isThinking }) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={wrapperClass}>
            <div
                className="responseThoughtHeader"
                onClick={() => !isThinking && setIsOpen(prev => !prev)}
            >
                {header}
                {!isThinking && (
                    <img
                        src={arrowIcon}
                        className={`dropdownArrow ${isOpen ? 'dropdownArrowOpen' : ''}`}
                        alt="toggle"
                    />
                )}
            </div>
            <div className={`collapsibleContainer ${isOpen ? 'collapsibleOpen' : ''}`}>
                {children}
            </div>
        </div>
    )
}

function ChatMessageResponse({ msg, cloudEnabled, setCloudEnabled, onComplete, onFileProgress, scrollToBottom }) {
    const isCloudPrompt = msg.data[1] === 'Enable Shipper Cloud'

    const thought    = msg.data[0]
    const files      = isCloudPrompt ? msg.data[2] : msg.data[1]
    const completion = isCloudPrompt ? msg.data[3] : msg.data[2]
    const success    = isCloudPrompt ? msg.data[4] : msg.data[3]

    const [typedThought, setTypedThought]         = useState('')
    const [thoughtAnimDone, setThoughtAnimDone]   = useState(false)
    const [typedCloudText, setTypedCloudText]     = useState('')
    const [showCloudBtn, setShowCloudBtn]         = useState(false)
    const [showFiles, setShowFiles]               = useState(false)
    const [visibleFileCount, setVisibleFileCount] = useState(0)
    const [typedCompletion, setTypedCompletion]   = useState('')
    const [typedSuccess, setTypedSuccess]         = useState('')

    const [cardOpen, setCardOpen] = useState(true)

    const timerRef = useRef(null)
    const cloudAnimStarted = useRef(false)

    // Scroll chatHistory to bottom on every animation tick
    useEffect(() => {
        scrollToBottom?.()
    }, [typedThought, typedCloudText, visibleFileCount, typedCompletion, typedSuccess])

    // Animates files → completion → success, then calls onComplete
    const animateFilesOnward = () => {
        setShowFiles(true)
        let fileIdx = 0

        const revealFiles = () => {
            if (fileIdx < files.length) {
                fileIdx++
                setVisibleFileCount(fileIdx)
                onFileProgress?.(fileIdx, files.length)
                timerRef.current = setTimeout(revealFiles, FILE_REVEAL_SPEED)
            } else {
                typeCompletion()
            }
        }

        let completionIdx = 0
        const typeCompletion = () => {
            if (completionIdx <= completion.length) {
                setTypedCompletion(completion.slice(0, completionIdx))
                completionIdx++
                timerRef.current = setTimeout(typeCompletion, TYPING_SPEED)
            } else {
                typeSuccess()
            }
        }

        let successIdx = 0
        const typeSuccess = () => {
            if (successIdx <= success.length) {
                setTypedSuccess(success.slice(0, successIdx))
                successIdx++
                timerRef.current = setTimeout(typeSuccess, TYPING_SPEED)
            } else {
                onComplete?.()
            }
        }

        revealFiles()
    }

    // Main animation: triggers when thinking flips to false
    useEffect(() => {
        if (msg.thinking) return
        clearTimeout(timerRef.current)

        let charIdx = 0
        const typeThought = () => {
            if (charIdx <= thought.length) {
                setTypedThought(thought.slice(0, charIdx))
                charIdx++
                timerRef.current = setTimeout(typeThought, TYPING_SPEED)
            } else {
                setThoughtAnimDone(true)
                if (isCloudPrompt) {
                    typeCloudText()
                } else {
                    animateFilesOnward()
                }
            }
        }

        let cloudCharIdx = 0
        const typeCloudText = () => {
            if (cloudCharIdx <= CLOUD_PERMISSION_TEXT.length) {
                setTypedCloudText(CLOUD_PERMISSION_TEXT.slice(0, cloudCharIdx))
                cloudCharIdx++
                timerRef.current = setTimeout(typeCloudText, TYPING_SPEED)
            } else {
                setShowCloudBtn(true)
            }
        }

        typeThought()
        return () => clearTimeout(timerRef.current)
    }, [msg.thinking])

    // Cloud: animate files onward after user clicks Enable
    useEffect(() => {
        if (!cloudEnabled || cloudAnimStarted.current) return
        cloudAnimStarted.current = true
        animateFilesOnward()
    }, [cloudEnabled])

    return (
        <div className="chatMessageResponse">
            <CollapsibleSection
                header={msg.thinking ? 'Thinking...' : 'Thought for 1 seconds'}
                wrapperClass="responseThoughtWrapper"
                isThinking={msg.thinking}
            >
                <div className="responseThoughtContainer">
                    <p className="responseThought">{typedThought}</p>
                </div>
            </CollapsibleSection>

            {isCloudPrompt && thoughtAnimDone && (
                cloudEnabled ? (
                    /* ── Compact enabled banner ── */
                    <div className="cloudEnabledBanner">
                        <div className="cloudBannerIcon">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#199b7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="cloudBannerTitle">Shipper Cloud Enabled</p>
                            <p className="cloudBannerDesc">Backend, auth, and data storage are now active.</p>
                        </div>
                    </div>
                ) : (
                    /* ── Expanded enable card ── */
                    <div className="cloudCard">
                        {/* Header */}
                        <div className="cloudCardHeader">
                            <div className="cloudCardHeaderLeft">
                                <div className="cloudCardIconWrap">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#199b7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="cloudCardTitle">Enable Shipper Cloud</p>
                                    <p className="cloudCardSubtitle">Add backend infrastructure to your app</p>
                                </div>
                            </div>
                            <button className="cloudChevronBtn" onClick={() => setCardOpen(p => !p)}>
                                <svg
                                    viewBox="0 0 24 24" width="16" height="16"
                                    fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"
                                    style={{ transform: cardOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s ease' }}
                                >
                                    <path d="M18 15l-6-6-6 6"/>
                                </svg>
                            </button>
                        </div>

                        {/* Collapsible body — shrinks upward when closed */}
                        <div className={`cloudCardBody ${cardOpen ? 'cloudCardBodyOpen' : ''}`}>

                            {/* Features 2×2 grid */}
                            <div className="cloudFeaturesGrid">
                                {[
                                    {
                                        icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>,
                                        title: 'Powerful power-ups',
                                        desc:  'Enable payments, AI features, storage and more backend capabilities.'
                                    },
                                    {
                                        icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L4.5 13.5H11L9 22l9.5-12H13L13 2z"/></svg>,
                                        title: 'Persistent app data',
                                        desc:  'Your app keeps users, settings and records instead of resetting every run.'
                                    },
                                    {
                                        icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 11l2 2 4-4"/></svg>,
                                        title: 'Login and signup',
                                        desc:  'Users can create accounts, log in, and manage their own bookings securely.'
                                    },
                                    {
                                        icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                                        title: 'Secure by default',
                                        desc:  'User data isolation, private records, and safer backend infrastructure.'
                                    },
                                ].map(f => (
                                    <div key={f.title} className="cloudFeatureItem">
                                        <div className="cloudFeatureIcon">{f.icon}</div>
                                        <p className="cloudFeatureTitle">{f.title}</p>
                                        <p className="cloudFeatureDesc">{f.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Note */}
                            <div className="cloudNote">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" style={{flexShrink:0}}>
                                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                                </svg>
                                <span>Note: This cannot be undone once enabled.</span>
                            </div>

                            {/* Enable button */}
                            {showCloudBtn && (
                                <div className="cloudEnableBtnWrapper">
                                    <div className="cloudHitEnable">Hit enable</div>
                                    <button className="cloudEnableBtn" onClick={() => setCloudEnabled(true)}>
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
                                        </svg>
                                        Enable Shipper Cloud
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                )
            )}

            {showFiles && (
                <>
                    <CollapsibleSection
                        header="Running command"
                        wrapperClass="responseFilesWrapper"
                    >
                        <div className="responseFilesContainer">
                            <ul className="responseFiles">
                                {files.slice(0, visibleFileCount).map((file, j) => (
                                    <li key={j}>{file}</li>
                                ))}
                            </ul>
                        </div>
                    </CollapsibleSection>
                    {typedCompletion && <p className="responseCompletion">{typedCompletion}</p>}
                    {typedSuccess    && <p className="responseSuccess">{typedSuccess}</p>}
                </>
            )}
        </div>
    )
}

export default ChatMessageResponse
