'use strict ';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'aisysShortenerMenu',
    title: 'Aisys Shortener',
    contexts: ['link', 'page', 'selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'aisysShortenerMenu') {
    return;
  }

  const url = info.linkUrl;
  const params = {
    method: 'POST',
    credentials: 'omit'
  };

  const response = await fetch(url, params)
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

  console.log(data);

  alert(data);
});
