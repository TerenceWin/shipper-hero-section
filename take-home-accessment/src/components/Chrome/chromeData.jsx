import React from 'react'

export const TAB_GROUPS = [
    {
        id: 1, label: 'Work', count: 2, color: '#4285f4', extra: '8',
        tabs: [
            { title: 'Project Dashboard', url: 'app.linear.co', pinned: true,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="3" width="8" height="8" rx="2" fill="#4285f4"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#4285f4" opacity=".5"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#4285f4" opacity=".5"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#4285f4" opacity=".3"/></svg> },
            { title: 'PR Review #847', url: 'github.com', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#3cb97a" strokeWidth="2" strokeLinecap="round"><circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><circle cx="17" cy="6" r="2.5"/><path d="M7 8.5v7M14.5 6H9.5M17 8.5v7"/></svg> },
        ]
    },
    {
        id: 2, label: 'Research', count: 2, color: '#9c5cf7', extra: null,
        tabs: [
            { title: 'React Server Components', url: 'nextjs.org', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 3L3 19h18L12 3z" fill="none" stroke="#9c5cf7" strokeWidth="2" strokeLinejoin="round"/></svg> },
            { title: 'Edge Runtime Docs', url: 'vercel.com', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><path d="M13 2L4.5 13.5H11L9 22l9.5-12H13L13 2z" fill="#4285f4"/></svg> },
        ]
    },
    {
        id: 3, label: 'Social', count: 3, color: '#f5a623', extra: null,
        tabs: [
            { title: 'Twitter / X', url: 'x.com', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><path d="M18.3 5.7L13.1 12l5.4 6.3h-2.1L12 13.4l-4.4 4.9H5.5l5.4-6.1L5.7 5.7h2.1l3.8 4.5 4.2-4.5h2.5z" fill="#f5a623"/></svg> },
            { title: 'YouTube – Tech Talk', url: 'youtube.com', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="5" width="20" height="14" rx="4" fill="#f5a623"/><polygon points="10,9 10,15 16,12" fill="white"/></svg> },
            { title: 'Discord – Dev Community', url: 'discord.com', pinned: false,
              icon: <svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 3V6a2 2 0 0 1 1-1.73z" fill="#f5a623"/></svg> },
        ]
    },
]

export const SAVED_SESSIONS = [
    { id: 1, name: 'Morning Standup', tabs: 5, time: '2h ago',    color: '#4285f4', pinned: true  },
    { id: 2, name: 'Deep Work',       tabs: 3, time: 'Yesterday', color: '#aaa',    pinned: false },
    { id: 3, name: 'Client Demo',     tabs: 8, time: '2d ago',    color: '#3cb97a', pinned: true  },
]

export const ChevronIcon = ({ rotated }) => (
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: rotated ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
        <path d="M6 4l4 4-4 4"/>
    </svg>
)
export const PinIcon      = ({ color = '#f5a623' }) => (
    <svg viewBox="0 0 24 24" width="13" height="13" fill={color}><path d="M12 2l2 6h5l-4 3 1.5 6L12 14l-4.5 3L9 11 5 8h5L12 2z"/></svg>
)
export const LockIcon     = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#aaa" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
)
export const BookmarkIcon = () => (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#9c5cf7" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
)
export const FolderIcon   = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#aaa" strokeWidth="1.8"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
)
