import React, { useState } from 'react'
import './Mobile.css'

const WAVEFORM = [1,1,3,7,14,22,32,42,50,55,54,48,38,26,12,4,12,26,38,48,54,55,50,42,32,22,14,7,3,1,1]
const PLAYHEAD = 14   // index where playhead sits (~47s of 84s)

const EFFECTS = [
    { label: 'Reverb',   icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1"/></svg> },
    { label: 'Pitch +',  icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20V4m-4 4l4-4 4 4"/></svg> },
    { label: 'Echo',     icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg> },
    { label: 'AI Clean', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"/></svg> },
]

const RECENTS = [
    { id: 1, title: 'Voice Memo 03',  meta: '1:24 · Just now',  active: true,  badge: 'AI' },
    { id: 2, title: 'Interview Clip', meta: '3:45 · 2h ago',    active: false, badge: null },
    { id: 3, title: 'Podcast Intro',  meta: '0:38 · Yesterday', active: false, badge: null },
]

const MicIcon = ({ size = 14, color = 'currentColor' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <rect x="9" y="2" width="6" height="11" rx="3"/>
        <path d="M5 10a7 7 0 0 0 14 0M12 19v3M9 22h6"/>
    </svg>
)

function MobileLive() {
    const [playing,      setPlaying]      = useState(false)
    const [activeEffects, setActiveEffects] = useState({ 'Reverb': true, 'Echo': true })
    const [recentActive, setRecentActive] = useState(1)
    const toggleEffect  = (label) => setActiveEffects(prev => ({ ...prev, [label]: !prev[label] }))
    const activeCount   = Object.values(activeEffects).filter(Boolean).length

    return (
        <div className="mobileWrapper">
            <div className="mobilePhone">

                {/* Status bar — fixed outside scroll so it always floats */}
                <div className="mobileStatus">
                    <span className="mobileTime">9:41</span>
                    <div className="mobileBattery">
                        <div className="mobileBatteryFill" />
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="mobileScroll">

                {/* App header */}
                <div className="mobileHeader">
                    <div className="mobileHeaderLeft">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#f07828" strokeWidth="2" strokeLinecap="round">
                            <path d="M2 6h4M6 6a2 2 0 0 0 4 0M10 6h12M2 12h10M12 12a2 2 0 0 0 4 0M16 12h6M2 18h6M8 18a2 2 0 0 0 4 0M12 18h10"/>
                        </svg>
                        <span className="mobileAppName">EchoForge</span>
                        <span className="mobileAiBadge">AI</span>
                    </div>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
                        <circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/>
                        <path d="M8 11.5l8-5M8 12.5l8 5"/>
                    </svg>
                </div>

                {/* Waveform player card */}
                <div className="mobilePlayerCard">
                    <div className="mobilePlayerTop">
                        <div className="mobilePausedRow">
                            <span className="mobilePausedDot" />
                            <span className="mobilePausedLabel">{playing ? 'PLAYING' : 'PAUSED'}</span>
                        </div>
                        <span className="mobilePlayerTime">00:47 / 1:24</span>
                    </div>

                    {/* Waveform */}
                    <div className="mobileWaveform">
                        {WAVEFORM.map((h, i) => (
                            <div key={i}
                                className="mobileWaveBar"
                                style={{
                                    height: `${h}px`,
                                    backgroundColor: i <= PLAYHEAD ? '#f07828' : '#3d2810',
                                    opacity: i <= PLAYHEAD ? 1 : 0.6,
                                }}
                            />
                        ))}
                        {/* Playhead line */}
                        <div className="mobilePlayhead" style={{ left: `${(PLAYHEAD / WAVEFORM.length) * 100}%` }} />
                    </div>

                    {/* Timeline labels */}
                    <div className="mobileTimeline">
                        {['0:00','0:30','1:00','1:24'].map(t => <span key={t}>{t}</span>)}
                    </div>
                </div>

                {/* Playback controls */}
                <div className="mobileControls">
                    <button className="mobileCtrlBtn">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                            <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
                        </svg>
                    </button>
                    <button className="mobilePlayBtn" onClick={() => setPlaying(p => !p)}>
                        {playing
                            ? <svg viewBox="0 0 20 20" width="20" height="20" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                            : <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="#FFFFFF" stroke-width="2px"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        }
                    </button>
                    <button className="mobileCtrlBtn">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                            <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
                        </svg>
                    </button>
                </div>

                {/* Volume slider */}
                <div className="mobileVolumeRow">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                    <div className="mobileSliderTrack">
                        <div className="mobileSliderFill" style={{ width: '68%' }} />
                        <div className="mobileSliderThumb" style={{ left: '68%' }} />
                    </div>
                </div>

                {/* AI Effects */}
                <div className="mobileSection">
                    <div className="mobileSectionHeader">
                        <div className="mobileSectionLeft">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#f07828" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"/>
                            </svg>
                            <span className="mobileSectionTitle">AI Effects</span>
                        </div>
                        <span className="mobileActiveCount">{activeCount} active</span>
                    </div>
                    <div className="mobileEffectsRow">
                        {EFFECTS.map(fx => (
                            <button key={fx.label}
                                className={`mobileEffectBtn ${activeEffects[fx.label] ? 'mobileEffectActive' : ''}`}
                                onClick={() => toggleEffect(fx.label)}>
                                {fx.icon}
                                <span>{fx.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent */}
                <div className="mobileSection">
                    <span className="mobileSectionTitle" style={{ marginBottom: 8, display: 'block' }}>Recent</span>
                    {RECENTS.map(r => (
                        <div key={r.title} className={`mobileRecentItem ${recentActive === r.id ? 'mobileRecentActive' : ''}`} onClick={() => setRecentActive(r.id)}>
                            <div className={`mobileRecentIcon ${recentActive === r.id ? 'mobileRecentIconActive' : ''}`}>
                                <MicIcon size={14} color={recentActive === r.id ? '#f07828' : '#555'} />
                            </div>
                            <div className="mobileRecentInfo">
                                <span className="mobileRecentTitle">{r.title}</span>
                                <span className="mobileRecentMeta">{r.meta}</span>
                            </div>
                            {r.badge === 'AI'
                                ? <span className={recentActive === r.id ? `mobileBadge mobileAiBadge mobileBadgeHover` : `mobileBadge mobileAiBadge`}>AI</span>
                                : <svg className={recentActive === r.id ? `mobileBadge  mobileBadgeHover` : `mobileBadge`} viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            }
                        </div>
                    ))}
                </div>

                {/* Mic FAB */}
                <div className="mobileFabRow">
                    <div className="mobileFab">
                        <MicIcon size={20} color="white" />
                    </div>
                </div>

                </div> {/* end mobileScroll */}
                <div className="homeSwipeDiv">
                    <div className="homeSwipe"></div>
                </div>
            </div>
        </div>
    )
}

export default MobileLive
