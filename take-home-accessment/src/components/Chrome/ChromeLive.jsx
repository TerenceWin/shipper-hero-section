import React, { useState } from 'react'
import { TAB_GROUPS, SAVED_SESSIONS, PinIcon, BookmarkIcon } from './chromeData.jsx'
import ChromeGroupList from './ChromeGroupList.jsx'
import './ChromeLive.css'

// ── Stage 0: placeholder ── Stage 1: v1.0 base ── Stage 2: + session saving ──
function ChromeLive({ stage = 0 }) {
    const [search,       setSearch]       = useState('')
    const [activeSort,   setActiveSort]   = useState('Group All')
    const [expanded,     setExpanded]     = useState({})
    const [sessionsOpen, setSessionsOpen] = useState(true)

    const toggleExpand  = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    const totalTabs     = TAB_GROUPS.reduce((sum, g) => sum + g.count, 0)
    const totalPinned   = TAB_GROUPS.flatMap(g => g.tabs).filter(t => t.pinned).length
    const showSessions  = stage >= 2

    if (stage < 1) return (
        <div className="chromeLiveWrapper">
            <div className="chromePopupPlaceholder">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ccc" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8 8 0 0 1 18.93 8zM12 4a14.09 14.09 0 0 1 1.91 4h-3.82A14.09 14.09 0 0 1 12 4zM4.26 14a8.2 8.2 0 0 1 0-4h3.38a16.52 16.52 0 0 0-.14 2 16.52 16.52 0 0 0 .14 2zm.81 2h2.95a15.65 15.65 0 0 0 1.38 3.56A8 8 0 0 1 5.07 16zm2.95-8H5.07a8 8 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 20a14.09 14.09 0 0 1-1.91-4h3.82A14.09 14.09 0 0 1 12 20zm2.34-6H9.66a14.6 14.6 0 0 1-.16-2 14.6 14.6 0 0 1 .16-2h4.68a14.6 14.6 0 0 1 .16 2 14.6 14.6 0 0 1-.16 2zm.25 5.56A15.65 15.65 0 0 0 15.98 16h2.95a8 8 0 0 1-4.34 3.56zM15.98 8a15.65 15.65 0 0 0-1.38-3.56A8 8 0 0 1 18.93 8z"/>
                </svg>
                <p className="chromePlaceholderText">Send a message to preview</p>
            </div>
        </div>
    )

    const filteredGroups = TAB_GROUPS.map(g => ({
        ...g,
        tabs: g.tabs.filter(t => !search ||
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.url.includes(search.toLowerCase())
        )
    })).filter(g => !search || g.tabs.length > 0)

    const SORT_BTNS = [
        { label: 'Group All', icon: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M1 2h6v6H1zm8 0h6v6H9zM1 10h6v6H1zm8 0h6v6H9z" opacity=".6"/></svg> },
        { label: 'Sort',      icon: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round"/></svg> },
        ...(!showSessions ? [{ label: 'Recent', icon: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 2" strokeLinecap="round"/></svg> }] : []),
    ]

    return (
        <div className="chromeLiveWrapper">
            <div className="chromePopup">

                {/* Header */}
                <div className="chromeHeader">
                    <div className="chromeHeaderLeft">
                        <svg viewBox="0 0 24 24" className="chromeGlobeIcon">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8 8 0 0 1 18.93 8zM12 4a14.09 14.09 0 0 1 1.91 4h-3.82A14.09 14.09 0 0 1 12 4zM4.26 14a8.2 8.2 0 0 1 0-4h3.38a16.52 16.52 0 0 0-.14 2 16.52 16.52 0 0 0 .14 2zm.81 2h2.95a15.65 15.65 0 0 0 1.38 3.56A8 8 0 0 1 5.07 16zm2.95-8H5.07a8 8 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 20a14.09 14.09 0 0 1-1.91-4h3.82A14.09 14.09 0 0 1 12 20zm2.34-6H9.66a14.6 14.6 0 0 1-.16-2 14.6 14.6 0 0 1 .16-2h4.68a14.6 14.6 0 0 1 .16 2 14.6 14.6 0 0 1-.16 2zm.25 5.56A15.65 15.65 0 0 0 15.98 16h2.95a8 8 0 0 1-4.34 3.56zM15.98 8a15.65 15.65 0 0 0-1.38-3.56A8 8 0 0 1 18.93 8z"/>
                        </svg>
                        <span className="chromeTitle">Tab Manager</span>
                        <span className="chromeProBadge">Pro</span>
                    </div>
                    <span className="chromeVersion">{showSessions ? 'v2.0' : 'v1.0'}</span>
                </div>

                {/* Stats bar — stage 2 only */}
                {showSessions && (
                    <div className="chromeStatsBar">
                        {[
                            { dot: true,  label: `${totalTabs} tabs` },
                            { dot: true,  label: `${TAB_GROUPS.length} groups` },
                            { icon: <PinIcon color="#f5a623" />, label: `${totalPinned} pinned` },
                            { icon: <BookmarkIcon />,            label: `${SAVED_SESSIONS.length} saved` },
                        ].map(s => (
                            <div key={s.label} className="chromeStatItem">
                                {s.dot ? <span className="chromeStatDot" style={{ backgroundColor: '#3cb97a' }} /> : s.icon}
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Search */}
                <div className="chromeSearchBar">
                    <svg viewBox="0 0 24 24" className="chromeSearchIcon">
                        <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="#aaa" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    <input className="chromeSearchInput" placeholder={`Search ${totalTabs} open tabs...`}
                        value={search} onChange={e => setSearch(e.target.value)} />
                    <span className="chromeShortcut">⌘K</span>
                </div>

                {/* Filter bar */}
                <div className="chromeFilterBar">
                    <div className="chromeFilterLeft">
                        {SORT_BTNS.map(({ label, icon }) => (
                            <button key={label}
                                className={"chromeFilterBtn" + (activeSort === label ? " chromeFilterBtnActive" : "")}
                                onClick={() => setActiveSort(label)}>
                                {icon}{label}
                            </button>
                        ))}
                        {showSessions && (
                            <button className="chromeFilterBtn chromeFilterBtnSave">
                                <BookmarkIcon />Save Session
                            </button>
                        )}
                    </div>
                    <span className="chromeTabCount">{totalTabs} tabs</span>
                </div>

                <div className="chromeDivider" />

                <ChromeGroupList
                    filteredGroups={filteredGroups}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                    showSessions={showSessions}
                    sessionsOpen={sessionsOpen}
                    setSessionsOpen={setSessionsOpen}
                />

                {/* Footer */}
                <div className="chromeFooter">
                    {(showSessions
                        ? [['⌘K','Search tabs'],['⌘S','Save'],['⌘W','Close']]
                        : [['⌘K','Search tabs'],['⌘G','Group'],['⌘W','Close']]
                    ).map(([key, label]) => (
                        <div key={key} className="chromeShortcutRow">
                            <span className="chromeFooterKey">{key}</span>
                            <span className="chromeFooterLabel">{label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ChromeLive
