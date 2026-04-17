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

function ChatMessageResponse({ msg, cloudEnabled, setCloudEnabled, onComplete }) {
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

    const timerRef = useRef(null)
    const cloudAnimStarted = useRef(false)

    // Animates files → completion → success, then calls onComplete
    const animateFilesOnward = () => {
        setShowFiles(true)
        let fileIdx = 0

        const revealFiles = () => {
            if (fileIdx < files.length) {
                fileIdx++
                setVisibleFileCount(fileIdx)
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
                <div className="cloudPermissionCard">
                    <p className="cloudPermissionText">{typedCloudText}</p>
                    {showCloudBtn && (
                        !cloudEnabled
                            ? <button className="cloudEnableButton" onClick={() => setCloudEnabled(true)}>Enable Shipper Cloud</button>
                            : <p className="cloudEnabledConfirm">✓ Shipper Cloud enabled</p>
                    )}
                </div>
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
