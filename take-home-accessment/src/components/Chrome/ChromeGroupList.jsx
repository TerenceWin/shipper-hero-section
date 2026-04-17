import React from 'react'
import { SAVED_SESSIONS, ChevronIcon, PinIcon, LockIcon, FolderIcon } from './chromeData.jsx'
import './ChromeGroups.css'

function ChromeGroupList({ filteredGroups, expanded, toggleExpand, showSessions, sessionsOpen, setSessionsOpen }) {
    return (
        <div className="chromeGroupList">

            {/* Saved Sessions — stage 2 only */}
            {showSessions && (
                <div className="chromeGroupSection">
                    <div className="chromeGroupRow" onClick={() => setSessionsOpen(p => !p)}>
                        <button className="chromeGroupExpand"><ChevronIcon rotated={sessionsOpen} /></button>
                        <FolderIcon />
                        <span className="chromeGroupLabel" style={{ marginLeft: 4 }}>Saved Sessions</span>
                        <span className="chromeGroupCount">{SAVED_SESSIONS.length}</span>
                    </div>
                    {sessionsOpen && (
                        <div className="chromeTabItems">
                            {SAVED_SESSIONS.map(sess => (
                                <div key={sess.id} className="chromeSessionItem">
                                    <span className="chromeSessionDot" style={{ backgroundColor: sess.color }} />
                                    <div className="chromeTabInfo">
                                        <span className="chromeTabTitle">{sess.name}</span>
                                        <span className="chromeTabUrl">{sess.tabs} tabs · {sess.time}</span>
                                    </div>
                                    {sess.pinned ? <PinIcon color="#f5a623" /> : <LockIcon />}
                                    <button className="chromeRestoreBtn">Restore</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="chromeGroupDivider" />
                </div>
            )}

            {/* Regular tab groups */}
            {filteredGroups.map((group, gi) => (
                <div key={group.id} className="chromeGroupSection">
                    <div className="chromeGroupRow" onClick={() => toggleExpand(group.id)}>
                        <button className="chromeGroupExpand"><ChevronIcon rotated={expanded[group.id]} /></button>
                        <span className="chromeGroupDot" style={{ backgroundColor: group.color }} />
                        <span className="chromeGroupLabel">{group.label}</span>
                        {showSessions
                            ? <span className="chromeGroupCountBadge" style={{ backgroundColor: group.color }}>{group.count}</span>
                            : <span className="chromeGroupCount">{group.count}</span>
                        }
                        {!showSessions && group.extra && <span className="chromeGroupExtra">{group.extra}</span>}
                        <button className="chromeGroupMenu" onClick={e => e.stopPropagation()}>
                            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                                <circle cx="8" cy="3" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="8" cy="13" r="1.2"/>
                            </svg>
                        </button>
                    </div>
                    {expanded[group.id] && (
                        <div className="chromeTabItems">
                            {group.tabs.map((tab, ti) => (
                                <div key={ti} className="chromeTabItem">
                                    <div className="chromeTabFavicon">{tab.icon}</div>
                                    <div className="chromeTabInfo">
                                        <span className="chromeTabTitle">{tab.title}</span>
                                        <span className="chromeTabUrl">{tab.url}</span>
                                    </div>
                                    {tab.pinned && <div className="chromeTabPin"><PinIcon /></div>}
                                </div>
                            ))}
                        </div>
                    )}
                    {gi < filteredGroups.length - 1 && <div className="chromeGroupDivider" />}
                </div>
            ))}

        </div>
    )
}

export default ChromeGroupList
