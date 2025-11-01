
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyReset", { periodInMinutes: 60 });
});
chrome.alarms.onAlarm.addListener(a=>{
  if(a.name==="dailyReset") handleDailyReset();
});

function handleDailyReset(){
  const today=new Date().toDateString();
  chrome.storage.local.get(["lastResetDay"],r=>{
    if(r.lastResetDay!==today){
      chrome.storage.local.set({
        doomscrollTotalToday:0,
        doomscrollStrikes:0,
        doomscrollBlockedToday:false,
        lastResetDay:today
      });
      console.log("🕛 Stats reset for new day");
    }
  });
}

chrome.tabs.onUpdated.addListener((id,info,tab)=>{
  if(info.status==="complete" && tab.url.includes("youtube.com/shorts")){
    chrome.storage.local.get("doomscrollBlockedToday",r=>{
      if(r.doomscrollBlockedToday===true){
        chrome.tabs.update(id,{url:"https://www.google.com"});
        sendNotification("YouTube Blocked","You've reached your daily Shorts limit.");
      }
    });
  }
});

function sendNotification(title,msg){
  chrome.notifications.create({
    type:"basic", iconUrl:"icon.png",
    title, message:msg, priority:2
  });
}

chrome.runtime.onMessage.addListener((msg)=>{
  if(msg.type==="BREAK_ALERT")
    sendNotification("Break Time!","Take a 2-minute breather.");
});
