chrome.downloads.onChanged.addListener(function(download) {
    if (download.state && download.state.current == "complete") {
        chrome.storage.local.get("delay", function(snap) {
            if (snap.delay) {
                downloadRemoval(snap.delay);
            } else {
                setDelayAndRemove();
            }
        });
    }
});

function downloadRemoval(delay) {
    setTimeout(function() {
        chrome.browsingData.remove({ "since": 0 }, { "downloads": true });
    }, delay);
}

function setDelayAndRemove() {
    chrome.storage.local.set({ "delay" : 2000 }, function() {
        downloadRemoval(2000);
    });
}
