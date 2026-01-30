const STORAGE_KEY = 'user';

function getStoredUser(callback) {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    callback(result[STORAGE_KEY] || null);
  });
}

function logout() {
  chrome.storage.local.remove([STORAGE_KEY], () => {
    window.location.href = 'login-panel.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getStoredUser((user) => {
    if (!user) {
      window.location.href = 'login-panel.html';
      return;
    }

    initializeTranslator(user);
  });
});

function initializeTranslator(user) {
  const sourceText = document.getElementById('sourceText');
  const translatedText = document.getElementById('translatedText');
  const translateBtn = document.getElementById('translateBtn');
  const getSelectedBtn = document.getElementById('getSelectedBtn');
  const sourceLang = document.getElementById('sourceLang');
  const targetLang = document.getElementById('targetLang');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const errorMessage = document.getElementById('errorMessage');
  const userInfo = document.getElementById('userInfo');
  const userName = document.getElementById('userName');
  const userPicture = document.getElementById('userPicture');
  const logoutBtn = document.getElementById('logoutBtn');

  if (userInfo && userName) {
    userName.textContent = user.name;
    if (user.picture && userPicture) {
      userPicture.src = user.picture;
    }
    userInfo.style.display = 'flex';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  const API_ENDPOINT = 'http://localhost:8000/translate.php';
  
  let authToken = user.token;


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SHOW_SELECTION' && message.text) {
      sourceText.value = message.text;
      showError('');
    }
  });

  try {
    const port = chrome.runtime.connect({ name: 'sidepanel' });
    port.postMessage('GET_LAST_SELECTION');
    port.onMessage.addListener((msg) => {
      if (msg.type === 'SHOW_SELECTION' && msg.text) {
        sourceText.value = msg.text;
        showError('');
      }
    });
  } catch (e) {}

  getSelectedBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url && tab.url.startsWith('chrome://')) {
        showError('Impossible de récupérer le texte sur une page chrome://');
        return;
      }
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const selected = window.getSelection().toString();
          if (selected && selected.trim().length > 0) {
            chrome.runtime.sendMessage({ type: 'TEXT_SELECTION', text: selected });
          }
        }
      });
    } catch (error) {
      console.error('Error getting selected text:', error);
      showError('Error: ' + error.message);
    }
  });

  translateBtn.addEventListener('click', async () => {
    const text = sourceText.value.trim();

    if (!text) {
      showError('Please enter text to translate');
      return;
    }

    showLoading(true);
    showError('');
    translatedText.value = '';

    try {
      const translation = await performTranslation(text);
      translatedText.value = translation;
    } catch (error) {
      console.error('Translation error:', error);
      showError('Translation failed: ' + error.message);
    } finally {
      showLoading(false);
    }
  });

  async function performTranslation(text) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('token', authToken);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.output || data.translation || data.result || JSON.stringify(data);
  }

  function showLoading(show) {
    loadingIndicator.style.display = show ? 'flex' : 'none';
    translateBtn.disabled = show;
  }

  function showError(message) {
    if (message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }
  }

  sourceText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      translateBtn.click();
    }
  });

  sourceText.addEventListener('paste', (e) => {
    setTimeout(() => {
      if (sourceText.value.trim()) {
        // You can auto-translate here if desired
        // translateBtn.click();
      }
    }, 100);
  });
}
