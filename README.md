App
    - text 
    - Get Started, Login buttons 
        #takes to different routes no implementations 
    - HeroSection
        - LeftPanel
            - TabBar 
            - chatBox
        - RightPanel (Preview)
            - Web
            - Chrome
            - MobileApp
            - SlactBot
            - BuildingPreview
            - Hover (Incomplete)
        

Differences
- Hero section sky background image
- Tab icon color don't change when hover
- The ChatBox border 
- SlackBot stage3 differences(didn't finish on time)
- The Right Panel, dont have HoverPreview

---

Component Structure

Each preview on the right panel is built as its own independent “mini-app.”
To keep the code clean and easy to manage, each preview is split into three parts:
	•	Data / constants file
All static data (e.g. mock data, icons, lookup tables) is stored separately.
This keeps the main component focused only on logic and layout.
	•	Sub-components
Large UI sections that don’t manage their own state are extracted into smaller components.
This keeps each file short (around ~200 lines) and easier to read and maintain.
	•	Split CSS files
Styles are separated by purpose instead of one large global file.
For example, base layout, filters, and live states each have their own CSS file.
This reduces the risk of unintended side effects when making style changes.

This structure was chosen because each preview does not share state with others.
By keeping them isolated, changes to one preview won’t affect the rest,

---

Key Design & Implementation Decisions
	•	Progressive stage rendering
Each preview receives a stage prop (1 → 3) to show a step-by-step build process.
This simulates how an AI would gradually construct the UI.
	•	isBuilding + BuildingPreview
Instead of hiding the UI during loading, a dedicated building state is shown.
This keeps transitions smooth and prevents inconsistent state updates.
	•	Typing animation with useRef + setTimeout
Animations use recursive setTimeout instead of setInterval.
This avoids timing issues, allows better control, and makes it easy to stop/reset animations.
	•	Auto-scroll with useEffect
Scrolling is triggered by state changes rather than DOM observers.
This ensures consistent behavior during animations.
	•	import.meta.glob for assets (Vite)
Images are loaded using a static map to ensure compatibility in both development and production builds.
	•	Default high-stage preview
Before user interaction, previews start at their most complete state.
After a user action, they reset and animate from stage 1 to show the full build process.

---

Running Locally

```bash
cd take-home-accessment
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.




