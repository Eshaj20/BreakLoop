A Chrome extension designed to **fight doomscrolling on YouTube Shorts**.  
It helps you take control of your time by limiting Shorts consumption, forcing breaks, and even **blocking YouTube for the rest of the day** after repeated overuse.

 Features
- **Shorts Session Limit** → Watch up to 10 Shorts before a forced 2-minute break.  
- **Block After 2 Sessions** → If you restart doomscrolling after a break, YouTube is **completely blocked for the day**.  
- **Floating Overlay Counter** → Always see how many Shorts you’ve watched.  
- **Daily Reset** → Stats reset at midnight automatically.  
- **Usage Dashboard** → Popup shows:
  - Shorts watched today  
  - Breaks taken  
  - Block status  

 
# Tech Stack

This Chrome Extension is built using:

- **HTML5** – For the popup UI (`popup.html`)
- **CSS3** – For styling the popup (can be added as `popup.css`)
- **JavaScript (Vanilla JS)** – For core extension logic (`content.js`, `popup.js`)
- **JSON** – For configuration and permissions (`manifest.json`)
- **Image Assets** – Extension icons (`icon.png`)
- **Chrome Extension APIs** – For interacting with browser tabs, storage, etc.

# Installation (Developer Mode)
1. Clone this repo:
   ```bash
    https://github.com/Eshaj20/Doomscroll_Breaker_Chrome_Extension.git
   
2.Open Chrome → go to 
                   
                    chrome://extensions/

3.Enable Developer Mode (top right).

4.Click Load unpacked → select the project folder.

5.Pin the extension → Open YouTube Shorts → Start testing 

# Roadmap / Future Enhancements

 -Customizable thresholds (user sets Shorts limit & break duration)

 -Gamification → streaks & rewards for avoiding doomscrolling

 -Cross-device sync (store stats in cloud, not just local)

 -Mobile App (WebView / PWA) version for Android
