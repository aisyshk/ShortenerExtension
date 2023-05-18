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
