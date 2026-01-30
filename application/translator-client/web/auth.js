const STORAGE_KEY = 'user';

function getStoredUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error('Impossible de lire l’utilisateur stocké:', error);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

function saveUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function redirectTo(page) {
    window.location.href = page;
}

function checkAuth() {
    const user = getStoredUser();
    if (user && window.location.pathname.includes('login.html')) {
        redirectTo('index.html');
    }
    return Boolean(user);
}

function handleCredentialResponse({ credential }) {
    const payload = decodeJwtPayload(credential);
    if (!payload) return;

    saveUser({
        email: payload.email || '',
        name: payload.name || payload.given_name || 'Utilisateur',
        picture: payload.picture || '',
        token: credential,
        authType: 'google'
    });

    redirectTo('index.html');
}

function decodeJwtPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
}

function logout() {
    localStorage.removeItem(STORAGE_KEY);
    redirectTo('login.html');
}

if (window.location.pathname.includes('login.html')) {
    checkAuth();
}
