//set daily reset alarm : set up alert dailyRests which triggers every 60 minutes
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyReset", { periodInMinutes: 60 });
});
chrome.alarms.onAlarm.addListener(a=>{
  if(a.name==="dailyReset") handleDailyReset();
});

//If current date is different from last reset if yes then 
function handleDailyReset(){
  const today=new Date().toDateString();
  chrome.storage.local.get(["lastResetDay"],r=>{
    if(r.lastResetDay!==today){
      chrome.storage.local.set({
        doomscrollTotalToday:0,  //doomscrollTotalToday -> 0
        doomscrollStrikes:0,    // doomscrollStrikes -> 0
        doomscrollBlockedToday:false, // doomscrollBlockedToday -> false
        lastResetDay:today  // update lastRestDay to today
      });
      console.log("🕛 Stats reset for new day");
    }
  });
}

// Block yt shorts:
chrome.tabs.onUpdated.addListener((id,info,tab)=>{
  //If tab finishes loading a YT shorts page
  if(info.status==="complete" && tab.url.includes("youtube.com/shorts")){
    // cHeck doomscrollBlockedToday in storage:
    chrome.storage.local.get("doomscrollBlockedToday",r=>{
      if(r.doomscrollBlockedToday===true){ // If it is true
        chrome.tabs.update(id,{url:"https://www.google.com"}); //Redirect to Google
        sendNotification("YouTube Blocked","You've reached your daily Shorts limit."); //Send Notification that you've reached your daily shorts limit.
      }
    });
  }
});

//It willl shows chrome notification
function sendNotification(title,msg){
  chrome.notifications.create({
    type:"basic", iconUrl:"icon.png",
    title, message:msg, priority:2
  });
}
//It listen msgs form content scripts : Break Alerts
chrome.runtime.onMessage.addListener((msg)=>{
  if(msg.type==="BREAK_ALERT") // If alert is recieved
    sendNotification("Break Time!","Take a 2-minute breather."); // We will get this notification.
});
