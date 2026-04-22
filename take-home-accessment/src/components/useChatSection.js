import { useState, useEffect, useRef } from 'react'
import { TYPING_TEXTS1, TYPING_TEXTS2, TYPING_TEXTS3 } from './chatData.js'
import { RESPONSE_TEXT1, RESPONSE_TEXT2, RESPONSE_TEXT3 } from './chatData.js'

const TYPING_TEXTS = [TYPING_TEXTS1, TYPING_TEXTS2, TYPING_TEXTS3]
const RESPONSE_TEXTS = [RESPONSE_TEXT1, RESPONSE_TEXT2, RESPONSE_TEXT3]

export function useChatSection(activeTab, stopRotation, onSubmit) {
    //Textarea, User input and animation text 
    const [isFocused, setIsFocused] = useState(false)
    const [animatedText, setAnimatedText] = useState('')
    const [userTyped, setUserTyped] = useState(null)

    //Return response message, current stage/ round
    const [messages, setMessages] = useState([])
    const [round, setRound] = useState(0)
    const [animationDone, setAnimationDone] = useState(false)

    const charIndexRef = useRef(0)
    const timerRef = useRef(null)
    const inactivityRef = useRef(null)
    const userTypedRef = useRef(null)

    // Reset on tab switch
    useEffect(() => {
        clearTimeout(timerRef.current)
        clearTimeout(inactivityRef.current)
        charIndexRef.current = 0
        setAnimatedText('')
        setIsFocused(false)
        setUserTyped(null)
        setMessages([])
        setRound(0)
        userTypedRef.current = null
    }, [activeTab])

    // Restart animation when round changes (after a successful submit)
    useEffect(() => {
        clearTimeout(timerRef.current)
        charIndexRef.current = 0
        setAnimatedText('')
        setUserTyped(null)
        userTypedRef.current = null
        setIsFocused(false)
        setAnimationDone(false)
    }, [round])

    // Typing animation loop
    useEffect(() => {
        if (isFocused) {
            clearTimeout(timerRef.current)
            return
        }

        const currentText = TYPING_TEXTS[round]?.[activeTab]
        if (!currentText) return

        const animate = () => {
            if (charIndexRef.current <= currentText.length) {
                setAnimatedText(currentText.slice(0, charIndexRef.current))
                charIndexRef.current++
                timerRef.current = setTimeout(animate, 35)
            }
        }

        animate()
        return () => clearTimeout(timerRef.current)
    }, [isFocused, activeTab, round])

    const handleFocus = () => {
        setIsFocused(true)
        if (userTypedRef.current === null) setUserTyped(animatedText)

        clearTimeout(inactivityRef.current)
        inactivityRef.current = setTimeout(() => {
            if (!userTypedRef.current) {
                setIsFocused(false)
                setUserTyped(null)
                userTypedRef.current = null
            }
        }, 5000)
    }

    const handleBlur = () => {
        clearTimeout(inactivityRef.current)
        setIsFocused(false)
        if (!userTypedRef.current) {
            setUserTyped(null)
            userTypedRef.current = null
        }
    }

    const handleChange = (e) => {
        setUserTyped(e.target.value)
        userTypedRef.current = e.target.value
        clearTimeout(inactivityRef.current)
    }

    const textareaValue = userTyped !== null ? userTyped : animatedText

    const requestText = () => {
        const expectedText = TYPING_TEXTS[round]?.[activeTab]
        const responseData = RESPONSE_TEXTS[round]?.[activeTab]

        // If user hasn't typed anything, use the expected text directly
        const textToSubmit = userTyped === null ? expectedText : userTyped.trim()

        if (!textToSubmit) return

        if (userTyped === null || textToSubmit === expectedText) {
            stopRotation?.()
            onSubmit?.()
            const responseId = Date.now()
            setMessages(prev => [
                ...prev,
                { type: 'user', text: textToSubmit },
                { type: 'response', id: responseId, data: responseData, thinking: true }
            ])
            setTimeout(() => {
                setMessages(prev => prev.map(msg =>
                    msg.id === responseId ? { ...msg, thinking: false } : msg
                ))
            }, 1000)
            setUserTyped('')
            userTypedRef.current = ''

            // Advance to next round if the next text exists and is non-empty
            const nextRound = round + 1
            const nextText = TYPING_TEXTS[nextRound]?.[activeTab]
            if (nextText) {
                setRound(nextRound)
            } else {
                setAnimationDone(true)
            }
        } else {
            alert('Please use the suggested prompt for this tab.')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            requestText()
        }
    }

    return { isFocused, textareaValue, animationDone, messages, handleFocus, handleBlur, handleChange, handleKeyDown, requestText }
}
