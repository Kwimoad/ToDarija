document.addEventListener('mouseup', () => {
  const selected = window.getSelection().toString();
  if (selected && selected.trim().length > 0) {
    chrome.runtime.sendMessage({ type: 'TEXT_SELECTION', text: selected });
  }
});