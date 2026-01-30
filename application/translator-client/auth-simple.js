function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        if (window.location.pathname.includes('login')) {
            window.location.href = 'index.html';
        }
        return true;
    }
    return false;
}

document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    
    const initial = name.charAt(0).toUpperCase();
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const avatarSvg = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <circle cx="50" cy="50" r="50" fill="${color}"/>
            <text x="50" y="50" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial">${initial}</text>
        </svg>
    `)}`;
    
    localStorage.setItem('user', JSON.stringify({
        email: email,
        name: name,
        picture: avatarSvg,
        token: null,
        authType: 'simple',
        loginDate: new Date().toISOString()
    }));
    
    window.location.href = 'index.html';
});

// Bouton d'accès rapide
document.getElementById('quick-access')?.addEventListener('click', function() {
    const demoUser = {
        email: 'demo@traducteur-darija.com',
        name: 'Utilisateur Demo',
        picture: `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                <circle cx="50" cy="50" r="50" fill="#667eea"/>
                <text x="50" y="50" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial">D</text>
            </svg>
        `)}`,
        token: null,
        authType: 'simple',
        loginDate: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    window.location.href = 'index.html';
});

// Déconnexion
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login-simple.html';
}

// Vérifier l'authentification au chargement
if (window.location.pathname.includes('login')) {
    checkAuth();
}
