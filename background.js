'use strict ';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'aisysShortenerMenu',
    title: 'Aisys Shortener',
    contexts: ['link', 'page', 'selection']
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'aisysImageTab',
    title: 'Open image in new tab and shorten',
    contexts: ['image']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const params = {
    method: 'POST',
    credentials: 'omit'
  };

  let url;

  if (info.menuItemId === 'aisysImageTab')
  {
    url = info.srcUrl;
  }

  if (info.menuItemId === 'aisysShortenerMenu')
  {
    url = info.linkUrl;
  }
  
  const response = await fetch("" + url, params)
    .catch(error => {
      console.log(`Fetch failed: ${error}`);
    });

  if (!response) {
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.text();

  chrome.tabs.create({url: data});

  alert(data);

});
