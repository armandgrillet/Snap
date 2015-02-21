window.onload = function() {
    chrome.storage.local.get("delay", function(snap) {
        if (snap.delay) {
            setDelaySelect(snap.delay);
        } else {
            chrome.storage.local.set({ "delay" : 2000 }, setDelaySelect(2000));
        }
    });

    document.getElementById("delay").addEventListener("change", function() {
        chrome.storage.local.set({ "delay" : parseInt(document.getElementById("delay").value) });
    });
};

function setDelaySelect(delay) {
    document.getElementById("delay").value = delay;
}
