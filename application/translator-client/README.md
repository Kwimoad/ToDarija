# Translation Chrome Extension

A Chrome extension using Manifest V3 that provides translation functionality in the browser's side panel.

## Features

- **Side Panel Integration**: Uses Chrome's sidePanel API to display translations alongside web content
- **Text Selection**: Capture selected text from any webpage for instant translation
- **REST API Integration**: Connects to your translation endpoint (translate.php)
- **Multi-language Support**: Choose source and target languages
- **Modern UI**: Clean, responsive interface with gradient styling

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `translator-client` directory
5. The extension icon will appear in your toolbar

## Usage

1. Click the extension icon in the Chrome toolbar to open the side panel
2. Select text on any webpage
3. Click "Get Selected Text" in the side panel to capture it
4. Choose your source and target languages
5. Click "Translate" to get the translation

## Configuration

### API Endpoint

Update the `API_ENDPOINT` in [sidepanel.js](sidepanel.js) to point to your translation server:

```javascript
const API_ENDPOINT = 'http://localhost/translator-client/translate.php';
```

### Authentication

The extension uses token-based authentication. You can:

1. Set a default token in [sidepanel.js](sidepanel.js):
   ```javascript
   authToken = 'your-auth-token-here';
   ```

2. Or save a token programmatically:
   ```javascript
   window.saveAuthToken('your-token');
   ```

### Icons

The manifest references icon files (icon16.png, icon48.png, icon128.png). You can:
- Create your own icons with these dimensions
- Or remove the icons section from [manifest.json](manifest.json) temporarily

## Files

- `manifest.json` - Extension manifest (Manifest V3)
- `background.js` - Service worker for side panel management
- `sidepanel.html` - Side panel UI
- `sidepanel.js` - Translation logic and API calls
- `sidepanel.css` - Styling for the side panel
- `translate.php` - Backend REST endpoint

## Keyboard Shortcuts

- **Ctrl+Enter** (or Cmd+Enter on Mac): Translate the current text

## Requirements

- Chrome browser (version 114+)
- Access to the translation API endpoint
- Valid authentication token

## Troubleshooting

### Extension doesn't load
- Check the Chrome console for errors at `chrome://extensions/`
- Ensure all file paths in manifest.json are correct

### Translations fail
- Verify the API_ENDPOINT URL is correct
- Check that your authentication token is valid
- Open DevTools in the side panel (right-click → Inspect) to see console errors

### "Get Selected Text" doesn't work
- Ensure you've granted the extension permission to access the current tab
- Check that text is actually selected on the page

## Development

To modify the extension:

1. Make your changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

This extension is provided as-is for translation purposes.
