chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-hinglish",
    title: "Translate to Hinglish",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate-hinglish") {
    chrome.tabs.sendMessage(tab.id, {
      type: "TRANSLATE_TEXT",
      text: info.selectionText
    });
  }
});
