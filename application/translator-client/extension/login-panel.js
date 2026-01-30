const STORAGE_KEY = 'user';
const CLIENT_ID = '206539251499-cv6ndmu5eq658o7hppvr9o47j3p9edrs.apps.googleusercontent.com';
const REDIRECT_URI = chrome.identity.getRedirectURL();
console.log('REDIRECT_URI utilisé pour OAuth:', REDIRECT_URI);
const SCOPES = ['openid', 'email', 'profile'];

function getStoredUser(callback) {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        callback(result[STORAGE_KEY] || null);
    });
}

function saveUser(user, callback) {
    chrome.storage.local.set({ [STORAGE_KEY]: user }, callback);
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function showLoading(show) {
    const loadingDiv = document.getElementById('loading-message');
    const loginBtn = document.getElementById('google-login-btn');
    
    if (loadingDiv) {
        loadingDiv.style.display = show ? 'block' : 'none';
    }
    if (loginBtn) {
        loginBtn.disabled = show;
    }
}

function checkAuth() {
    getStoredUser((user) => {
        if (user) {
            window.location.href = 'sidepanel.html';
        }
    });
}

function parseQueryString(queryString) {
    const params = {};
    const pairs = queryString.split('&');
    for (let pair of pairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return params;
}

function handleGoogleLogin() {
    showLoading(true);
    showError('');
    
    // Build OAuth2 URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('response_type', 'token id_token');
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('scope', SCOPES.join(' '));
    authUrl.searchParams.set('nonce', Math.random().toString(36).substring(7));
    
    // Launch OAuth flow
    chrome.identity.launchWebAuthFlow(
        {
            url: authUrl.toString(),
            interactive: true
        },
        (redirectUrl) => {
            if (chrome.runtime.lastError) {
                console.error('Auth error:', chrome.runtime.lastError);
                showError('Erreur de connexion: ' + chrome.runtime.lastError.message);
                showLoading(false);
                return;
            }
            
            if (redirectUrl) {
                try {
                    // Extract token from redirect URL
                    const url = new URL(redirectUrl);
                    const hashParams = parseQueryString(url.hash.substring(1));
                    const token = hashParams.access_token;
                    const idToken = hashParams.id_token;
                    
                    if (!token || !idToken) {
                        throw new Error('Token non trouvé dans la réponse');
                    }
                    
                    // Decode ID token to get user info
                    const payload = decodeJwtPayload(idToken);
                    
                    if (payload) {
                        const user = {
                            email: payload.email || '',
                            name: payload.name || payload.given_name || 'Utilisateur',
                            picture: payload.picture || '',
                            token: idToken,
                            accessToken: token,
                            authType: 'google'
                        };
                        
                        saveUser(user, () => {
                            // Redirect to translation panel
                            window.location.href = 'sidepanel.html';
                        });
                    } else {
                        throw new Error('Impossible de décoder le token');
                    }
                } catch (error) {
                    console.error('Error processing auth response:', error);
                    showError('Erreur lors du traitement de la réponse: ' + error.message);
                    showLoading(false);
                }
            }
        }
    );
}

function decodeJwtPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    const loginBtn = document.getElementById('google-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleGoogleLogin);
    }
});
