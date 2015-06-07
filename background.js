chrome.downloads.onChanged.addListener(function(download) {
    if (download.state && download.state.current == "complete") {
        chrome.storage.local.get("delay", function(snap) {
            if (snap.delay) {
                chrome.alarms.create("removal", { when: Date.now() + snap.delay });
            } else {
                setDelayAndRemove();
            }
        });
    }
});

function setDelayAndRemove() {
    chrome.storage.local.set({ "delay" : 2000 }, function() {
        chrome.alarms.create("removal", { when: Date.now() + 2000 });
    });
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == "removal") {
        chrome.downloads.erase({"state": "complete"});
        // chrome.alarms.clear("removal");
    }
});
