chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

let lastSelection = '';
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'sidepanel') {
    port.onMessage.addListener((msg) => {
      if (msg === 'GET_LAST_SELECTION') {
        port.postMessage({ type: 'SHOW_SELECTION', text: lastSelection });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TEXT_SELECTION') {
    console.log('[BG] TEXT_SELECTION received:', message.text);
    lastSelection = message.text;
    chrome.runtime.sendMessage({ type: 'SHOW_SELECTION', text: message.text });
  }
});
