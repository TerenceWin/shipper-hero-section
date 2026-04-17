import React from 'react'
import botImg from '../../assets/slack/bot.webp'
import './SlackLive.css'

/* ── SVG icon helpers ── */
const BellIcon = () => (
    <svg viewBox="0 0 24 24" className="slackBellIcon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
)

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" className="slackSearchIcon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" className="slackPlusIcon" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const ChatBubbleIcon = () => (
    <svg viewBox="0 0 24 24" className="slackTopBarIcon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const GearIcon = () => (
    <svg viewBox="0 0 24 24" className="slackTopBarIcon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)

const SendIcon = () => (
    <svg viewBox="0 0 24 24" className="slackSendIcon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
)

/* ── Robot avatar (ShipperBot) ── */
const RobotAvatar = ({ className }) => (
    <div className={className}>
        <img src={botImg} alt="ShipperBot" className="slackBotImg" />
    </div>
)

/* ── Main component ── */
const CHANNELS_V1V2 = ['general', 'random', 'bot-commands', 'announcements']
const CHANNELS_V3   = ['general', 'deployments', 'alerts', 'pull-requests']

function SlackLive({ stage = 1 }) {
    const showV2 = stage >= 2
    const showV3 = stage >= 3

    const defaultChannel = showV3 ? 'deployments' : showV2 ? 'bot-commands' : 'general'
    const [activeChannel, setActiveChannel] = React.useState(defaultChannel)

    React.useEffect(() => {
        setActiveChannel(showV3 ? 'deployments' : showV2 ? 'bot-commands' : 'general')
    }, [showV2, showV3])

    const channels = showV3 ? CHANNELS_V3 : CHANNELS_V1V2

    return (
        <div className="slackWrapper">
            <div className="slackWindow">

                {/* ── Title bar ── */}
                <div className="slackTitleBar">
                    <div className="slackTrafficLights">
                        <span className="slackDot slackDotRed" />
                        <span className="slackDot slackDotYellow" />
                        <span className="slackDotGreen slackDot" />
                    </div>
                    <span className="slackTitleText">Slack – My Workspace</span>
                    <div className="slackTitleSpacer" />
                </div>

                {/* ── Two-column body ── */}
                <div className="slackBody">

                    {/* ── Left Sidebar ── */}
                    <aside className="slackSidebar">

                        {/* Workspace header */}
                        <div className="slackWorkspaceRow">
                            <span className="slackWorkspaceName">My Workspace ▾</span>
                            <BellIcon />
                        </div>

                        {/* Search */}
                        <div className="slackSidebarSearch">
                            <SearchIcon />
                            <input className="slackSidebarSearchInput" placeholder="Search" readOnly />
                        </div>

                        {/* Channels section */}
                        <div className="slackSectionHeader">
                            <span className="slackSectionLabel">Channels</span>
                            <button className="slackSectionPlus"><PlusIcon /></button>
                        </div>

                        <ul className="slackChannelList">
                            {channels.map(ch => (
                                <li key={ch}
                                    className={`slackChannel ${activeChannel === ch ? 'slackChannelActive' : ''}`}
                                    onClick={() => setActiveChannel(ch)}>
                                    <span className="slackHash">#</span>
                                    <span className="slackChannelName">{ch}</span>
                                    {ch === 'random'      && !showV2 && <span className="slackBadge">3</span>}
                                    {ch === 'bot-commands'&&  showV2 && !showV3 && <span className="slackBadge">2</span>}
                                    {ch === 'deployments' &&  showV3 && <span className="slackBadge">1</span>}
                                </li>
                            ))}
                        </ul>

                        {/* Apps / Integrations section */}
                        <div className="slackSectionHeader slackSectionHeaderApps">
                            <span className="slackSectionLabel">{showV3 ? 'Integrations' : 'Apps'}</span>
                            <button className="slackSectionPlus"><PlusIcon /></button>
                        </div>

                        <ul className="slackChannelList">
                            <li className="slackChannel slackAppRow">
                                <div className="slackAppAvatarWrap">
                                    <RobotAvatar className="slackAppAvatar" />
                                    <span className="slackOnlineDot" />
                                </div>
                                <span className="slackChannelName">ShipperBot</span>
                            </li>
                            {showV3 && (
                                <>
                                    <li className="slackChannel slackIntegrationRow">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#9b9da0" strokeWidth="2" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                        <span className="slackChannelName">GitHub</span>
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#2eb67d" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" fill="#2eb67d" stroke="none"/><polyline points="9 12 11 14 15 10" stroke="white"/></svg>
                                    </li>
                                    <li className="slackChannel slackIntegrationRow">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#9b9da0" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                                        <span className="slackChannelName">Monitoring</span>
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#2eb67d" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" fill="#2eb67d" stroke="none"/><polyline points="9 12 11 14 15 10" stroke="white"/></svg>
                                    </li>
                                </>
                            )}
                        </ul>

                        {/* Members footer — stage 3 */}
                        {showV3 && (
                            <div className="slackMembersFooter">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#7a7f87" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                <span>5 members online</span>
                            </div>
                        )}

                    </aside>

                    {/* ── Right Chat Panel ── */}
                    <main className="slackChat">

                        {/* Top bar */}
                        <div className="slackChatTopBar">
                            <div className="slackChatTitleRow">
                                <span className="slackChatTitle"># {activeChannel}</span>
                                {showV2 && !showV3 && activeChannel === 'bot-commands' && <span className="slackBotEnabledBadge">Bot enabled</span>}
                                {showV3 && activeChannel === 'deployments' && <span className="slackBotActiveBadge">
                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="#2eb67d"><circle cx="12" cy="12" r="10"/></svg>
                                    Bot Active
                                </span>}
                            </div>
                            <div className="slackChatTopBarIcons">
                                <ChatBubbleIcon />
                                <GearIcon />
                            </div>
                        </div>

                        <div className="slackChatDivider" />

                        {/* Messages — hidden on stage 3 deployments (replaced by stage 3 view below) */}
                        {!(showV3 && activeChannel === 'deployments') && <div className="slackMessages">

                            {/* Message 1 – Sarah Chen */}
                            <div className="slackMessage">
                                <div className="slackAvatarSC">SC</div>
                                <div className="slackMessageBody">
                                    <div className="slackMessageMeta">
                                        <span className="slackAuthor">Sarah Chen</span>
                                        <span className="slackTime">10:24 AM</span>
                                    </div>
                                    <p className="slackMessageText">Hey team! Just pushed the new feature to staging 🚀</p>
                                </div>
                            </div>

                            {/* Message 2 – ShipperBot */}
                            <div className="slackMessage">
                                <div className="slackAvatarBot">
                                    <RobotAvatar className="slackAvatarBotInner" />
                                </div>
                                <div className="slackMessageBody">
                                    <div className="slackMessageMeta">
                                        <span className="slackAuthor botAuthor">ShipperBot</span>
                                        <span className="slackAppBadge">APP</span>
                                        <span className="slackTime">10:27 AM</span>
                                    </div>
                                    <p className="slackMessageText">✅ Deployment to staging complete!</p>
                                    <ul className="slackBotList">
                                        <li>Build time: 45s</li>
                                        <li>Tests passed: 127/127</li>
                                        <li>Preview URL: <span className="slackLink">https://staging.example.com</span></li>
                                    </ul>
                                    {/* View Logs + Deploy to Prod buttons — stage 2, bot-commands only */}
                                    {showV2 && activeChannel === 'bot-commands' && (
                                        <div className="slackBotActions">
                                            <button className="slackBotActionBtn">View Logs</button>
                                            <button className="slackBotActionBtn slackBotActionBtnPrimary">Deploy to Prod</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mike Johnson /shipper status — stage 2, bot-commands only */}
                            {showV2 && activeChannel === 'bot-commands' && (
                                <>
                                    <div className="slackMessage">
                                        <div className="slackAvatarMJ">MJ</div>
                                        <div className="slackMessageBody">
                                            <div className="slackMessageMeta">
                                                <span className="slackAuthor">Mike Johnson</span>
                                                <span className="slackTime">10:28 AM</span>
                                            </div>
                                            <p className="slackMessageText slackCommand">/shipper status</p>
                                        </div>
                                    </div>

                                    {/* ShipperBot commands panel */}
                                    <div className="slackCommandsPanel">
                                        <div className="slackCommandsPanelHeader">
                                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#2eb67d" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
                                            <span>ShipperBot Commands</span>
                                        </div>
                                        {[
                                            { cmd: '/shipper deploy', desc: 'Deploy to production' },
                                            { cmd: '/shipper status', desc: 'Check system status'  },
                                            { cmd: '/shipper logs',   desc: 'View recent logs'     },
                                            { cmd: '/shipper help',   desc: 'Show all commands'    },
                                        ].map(({ cmd, desc }) => (
                                            <div key={cmd} className="slackCommandRow">
                                                <span className="slackCommandCode">{cmd}</span>
                                                <span className="slackCommandDesc">{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                        </div>}

                        {/* Stage 3 — deployments messages */}
                        {showV3 && activeChannel === 'deployments' && (
                            <div className="slackMessages">

                                {/* ShipperBot — deployment started */}
                                <div className="slackMessage">
                                    <div className="slackAvatarBot"><RobotAvatar className="slackAvatarBotInner" /></div>
                                    <div className="slackMessageBody">
                                        <div className="slackMessageMeta">
                                            <span className="slackAuthor botAuthor">ShipperBot</span>
                                            <span className="slackAppBadge">APP</span>
                                            <span className="slackTime">10:30 AM</span>
                                        </div>
                                        <p className="slackMessageText">🚀 <strong>New Deployment Started</strong></p>
                                        <div className="slackDeployCard">
                                            <div className="slackDeployCardHeader">
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2eb67d" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" fill="#2eb67d" stroke="none"/><polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2"/></svg>
                                                <span className="slackDeployCardTitle">Production Deploy #847</span>
                                            </div>
                                            <div className="slackDeployGrid">
                                                <span className="slackDeployKey">Branch</span><span className="slackDeployVal">main</span>
                                                <span className="slackDeployKey">Commit</span><span className="slackDeployVal slackDeployCode">a3f2b1c</span>
                                                <span className="slackDeployKey">Duration</span><span className="slackDeployVal">2m 34s</span>
                                                <span className="slackDeployKey">Tests</span><span className="slackDeployVal slackDeployGreen">147/147 ✓</span>
                                            </div>
                                        </div>
                                        <div className="slackBotActions">
                                            <button className="slackBotActionBtn">View Logs</button>
                                            <button className="slackBotActionBtn slackBotActionBtnDanger">Rollback</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sarah Chen — /shipper metrics */}
                                <div className="slackMessage">
                                    <div className="slackAvatarSC">SC</div>
                                    <div className="slackMessageBody">
                                        <div className="slackMessageMeta">
                                            <span className="slackAuthor">Sarah Chen</span>
                                            <span className="slackTime">10:32 AM</span>
                                        </div>
                                        <p className="slackMessageText slackCommand">/shipper metrics</p>
                                    </div>
                                </div>

                                {/* ShipperBot — metrics dashboard */}
                                <div className="slackMessage">
                                    <div className="slackAvatarBot"><RobotAvatar className="slackAvatarBotInner" /></div>
                                    <div className="slackMessageBody">
                                        <div className="slackMessageMeta">
                                            <span className="slackAuthor botAuthor">ShipperBot</span>
                                            <span className="slackAppBadge">APP</span>
                                            <span className="slackTime">10:32 AM</span>
                                        </div>
                                        <p className="slackMessageText">📊 <strong>Live Metrics Dashboard</strong></p>
                                        <div className="slackDeployCard">
                                            <div className="slackDeployCardHeader">
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2eb67d" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" fill="#2eb67d" stroke="none"/><polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2"/></svg>
                                                <span className="slackDeployCardTitle">System Health</span>
                                            </div>
                                            <div className="slackDeployGrid">
                                                <span className="slackDeployKey">Uptime</span><span className="slackDeployVal slackDeployGreen">99.98%</span>
                                                <span className="slackDeployKey">Requests/min</span><span className="slackDeployVal">12.4k</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Message input */}
                        <div className="slackInputBar">
                            <input className="slackInput"
                                placeholder={
                                    showV3 && activeChannel === 'deployments' ? 'Type /shipper for commands...' :
                                    showV2 && activeChannel === 'bot-commands' ? '/shipper logs' :
                                    `Message #${activeChannel}`
                                }
                                readOnly />
                            <button className="slackSendBtn"><SendIcon /></button>
                        </div>

                    </main>
                </div>

            </div>
        </div>
    )
}

export default SlackLive
