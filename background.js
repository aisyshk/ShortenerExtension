chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "aisysShortenerMenu",
        title: "Aisys Shortener",
        contexts: ["link","page","selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "aisysShortenerMenu")
    {
        let url;

        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            var currentTab = tabs[0];
            url = currentTab.url;
        });

        if (info.linkUrl)
        {
            url = info.linkUrl;
        }

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4)
            {
                console.log(this.responseText);
                alert(this.responseText);
            }
        });

        xhr.open("POST", "" + url);

        xhr.send();
    }
})