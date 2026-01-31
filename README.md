## BreakLoop – Chrome Extension (v3.3)

> A Chrome Extension designed to help you fight **doomscrolling on YouTube Shorts** by enforcing mindful viewing limits, breaks, and analytics to track your daily habits.
> YouTube Shorts can be addictive — and before you know it, you’ve lost an hour to endless scrolling.  
**Doomscroll Breaker** gives you back control by limiting how many Shorts you can watch in one session, enforcing short breaks, and even blocking YouTube for the day after repeated overuse.
> It also provides a **visual dashboard** showing your usage stats, content types (educational vs entertainment), and your 7-day viewing trends — right inside the extension popup.

 **Features**

| Category | Description |
|-----------|--------------|
| **Shorts Session Limit** | Watch up to 10 Shorts before a 2-minute enforced break. |
| **Smart Break System** | If you restart scrolling after a break, YouTube is blocked for the rest of the day. |
| **Floating Overlay Counter** | A small in-video counter shows how many Shorts you’ve watched. |
| **Usage Dashboard** | View Shorts watched, breaks taken, and block status. |
| **7-Day History** | Track how your Shorts usage changes over the week. |
| **AI-Inspired Classifier** | Categorizes Shorts as *Educational*, *Entertainment*, or *Neutral* based on the title. |
| **Custom Settings** | Change session limits and break duration in the popup. |
| **(Optional)** Dark Mode Toggle (coming soon). |

**Tech Stack**
- **Manifest V3** (latest Chrome extension standard)
- **JavaScript (ES6)** for logic and analytics
- **Chart.js** for beautiful progress, pie, and history charts
- **HTML + CSS** for popup UI
- **Chrome Storage API** for persistent user settings and statistics

  
**Installation (Developer Mode)**

1.Download or clone this repository:
   ```bash
           git clone https://github.com/Eshaj20/doomscroll-breaker.git
   ```
2.Open Chrome and go to:
   
           chrome://extensions/

3.Enable Developer Mode (toggle in top-right).

4.Click Load unpacked → select the doomscroll-breaker folder.

5.Visit any YouTube Shorts video → your extension will activate automatically.

**How It Works**

1. Content Script (content.js)
- Runs on YouTube Shorts pages to count how many videos you’ve watched.
- When the limit is reached → triggers a break overlay or blocks access for the day.

2.Popup Dashboard (popup.html + popup.js)
- Displays your stats using Chart.js — progress, history, and content types.

3.Background Service Worker (background.js)
- Handles daily resets and message passing.

**Example dashboard**

1. settings 
<img width="476" height="351" alt="image" src="https://github.com/user-attachments/assets/eb6847e0-06c7-4ed4-a5fc-eff2574ba070" />

2. History 
<img width="474" height="434" alt="image" src="https://github.com/user-attachments/assets/9df1aab4-42fc-46e2-ac60-a471d05bae40" />

3. Dashboard
  <img width="492" height="752" alt="image" src="https://github.com/user-attachments/assets/130f6289-77bf-4600-a420-27bead877825" />


**Privacy & Data**
- No data leaves your computer.
- All stats and settings are stored locally using chrome.storage.local.
- No tracking, analytics, or network requests are used.
