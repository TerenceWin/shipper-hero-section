export const TYPING_TEXTS1 = {
    web:    "Build me a website like Airbnb with listings, reviews, and booking",
    chrome: "Build me a time entry Chrome Extension with tracking, reports, and quick switch",
    mobile: "Build me an iOS/Android app with recording, effects, and sharing",
    slack : "Build me a Slack bot with deployment notifications and slash commands"
}

export const TYPING_TEXTS2 = {
    web: "Now add a dark mode toggle with smooth theme transitions",
    chrome: "Add session saving with named workspaces and one-click restore",
    mobile: "Add a playback timeline with waveform scrubbing and speed controls",
    slack: "Add slash command autocomplete and a help menu"
}

export const TYPING_TEXTS3 = {
    web: "Add advanced filters for place type, price range, and rooms",
    chrome: "",
    mobile: "",
    slack: "Add system metrics dashboard with live data cards"
}

export const RESPONSE_TEXT1 = {
    web: ["I'll build an Airbnb app with a listing grid, category browsing, detail pages with reviews, and a booking widget. Let me set up the project structure with Next.js and Tailwind CSS.",
        ["Created: app/page.tsx", "Created: components/ListingCard.tsx", "Created: components/CategoryBar.tsx", "Created: app/listing/[id]/page.tsx", "Created: components/ReviewSection.tsx", "Created: components/BookingWidget.tsx", "Installed components"],
        "I've built your Airbnb app with a responsive listing grid, category browsing, detail pages with reviews, and a booking widget. Ready to preview.",
        "Your Airbnb app is ready!"
    ],
    chrome: ["I'll create a Chrome extension with a popup UI for managing tabs - search, grouping by domain, and quick-switch functionality. Setting up the manifest and components.",
        ["Created: manifest.json", "Created: popup/TabList.tsx", "Created: popup/SearchBar.tsx", "Created: popup/TabGroup.tsx", "Created: background/service-worker.ts", "Built extension bundle"],
        "Your tab manager extension is ready with fuzzy search, automatic domain grouping, and keyboard shortcuts for quick switching between tabs.",
        "Your extension is ready!"
    ],
    mobile: ["I'll build EchoForge - an AI audio app with a recording interface, real-time effects processing, and social sharing. Setting up the mobile-first layout with audio APIs.",
        ["Created: app/page.tsx", "Created: components/AudioRecorder.tsx", "Created: components/EffectsPanel.tsx", "Created: components/WaveformVisualizer.tsx", "Created: components/ShareDialog.tsx", "Installed audio dependencies"],
        "EchoForge is ready with a recording studio, AI-powered effects (reverb, pitch shift, noise reduction), waveform visualization, and one-tap sharing.",
        "EchoForge AI is ready!"
    ],
    slack: ["I'll create a Slack bot using Bolt.js with slash commands, deployment notifications, and interactive message actions. Setting up the OAuth flow and event handlers.",
        ["Created: app.ts - Bolt.js setup", "Created: commands/deploy.ts", "Created: commands/status.ts", "Created: events/message.ts", "Created: blocks/deployment-card.ts", "Installed @slack/bolt dependencies"],
        "Your Slack bot is ready with /shipper deploy and /shipper status commands, rich deployment notification cards, and interactive action buttons.",
        "Your Slack bot is ready!"
    ]
}

export const RESPONSE_TEXT2 = {
    web: ["I'll add a dark mode toggle to the header with smooth CSS transitions across all components. Let me update the theme wrapper and apply dark variants.",
        ["Created: components/ThemeToggle.tsx", "Updated: app/layout.tsx - dark class wrapper", "Updated: components/ListingCard.tsx - dark variants", "Updated: components/BookingWidget.tsx - dark variants...", "Rebuilt with dark mode support"],
        "Dark mode toggle added - click the moon icon in the header to switch themes. All listings, detail pages, and booking cards transition smoothly.",
        "Dark mode is live!"
    ],
    chrome: ["I'll enable Shipper Cloud backend and add session saving with auth - named workspaces, restore buttons, and user-scoped storage so sessions persist per account.",
        "Enable Shipper Cloud",
        ["Created: popup/auth/Login.tsx", "Created: popup/auth/Register.tsx", "Created: lib/session.ts", "Created: popup/SavedSessions.tsx", "Created: popup/StatsBar.tsx", "Updated: popup/TabGroup.tsx - colored count badges", "Updated: background/service-worker.ts - session storage & auth", "Migrated schema and rebuilt extension bundle"],
        "Backend is enabled. Session saving is live - users can sign in, save workspaces to their account, and restore with one click. Tab groups now have colored count badges.",
        "Session saving + backend are live!"
    ],
    mobile: ["I'll enhance the waveform with a draggable playhead, detailed time markers, and a speed control row with 0.5x to 2x options. Updating the player layout.",
        ["Created: components/PlaybackTimeline.tsx", "Created: components/SpeedControl.tsx", "Updated: components/WaveformVisualizer.tsx - playhead & scrub", "Updated: app/page.tsx - speed state management", "Rebuilt with playback features"],
        "Playback timeline added - drag the playhead to scrub through audio, and switch between 0.5x, 1x, 1.5x, and 2x playback speeds.",
        "Playback controls are live!"
    ],
    slack: ["I'll add command suggestions that appear as you type, plus a comprehensive /shipper help command with all available options. Updating the manifest for autocomplete.",
        ["Created: commands/help.ts", "Updated: manifest.json - autocomplete config", "Created: utils/command-suggestions.ts", "Updated: app.ts - suggestion handler", "Rebuilt with autocomplete"],
        "Slash command autocomplete is live - suggestions appear as users type /shipper. The help command shows all available commands with descriptions.",
        "Autocomplete is live!"
    ]
}

export const RESPONSE_TEXT3 = {
    web: ["I'll add a filter panel to the category bar with place type selection, price range inputs, and room/bed/bathroom pickers - matching Airbnb's filter UX.",
        ["Created: components/FilterPanel.tsx", "Updated: components/CategoryBar.tsx - filter trigger", "Updated: app/page.tsx - filter state & logic", "Updated: components/FilterPanel.tsx - dark mode support", "Type-checked and rebuilt"],
        "Advanced filters are ready - filter by place type, set a price range, and pick bedrooms, beds, and bathrooms. Works in both light and dark mode.",
        "Filters added!"
    ],
    chrome: [],
    mobile: [],
    slack: ["I'll add a /shipper metrics command that shows live system stats in a rich card format - uptime, request rates, response times, and error rates with visual indicators.",
        ["Created: commands/metrics.ts", "Created: blocks/metrics-card.ts", "Created: services/metrics-fetcher.ts", "Updated: blocks/deployment-card.ts - status indicators", "Type-checked and rebuilt"],
        "Metrics dashboard ready - /shipper metrics shows live system health, request stats, and performance indicators in a beautiful card layout.",
        "Metrics added - your bot is complete!"
    ]
}
