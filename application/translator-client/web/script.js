function initUserInfo() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-picture').src = user.picture;
    }
}

initUserInfo();

document.getElementById('logout-btn').addEventListener('click', function() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        logout();
    }
});

document.getElementById('translate-btn').addEventListener('click', function() {
    const sourceText = document.getElementById('source-text').value;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (sourceText.trim() === '') {
        alert('Veuillez entrer du texte');
        return;
    }
    
    document.getElementById('loading').style.display = 'flex';
    
    if (sourceText.trim() !== '') {
        const params = new URLSearchParams({
            text: sourceText,
            token: user.token || '',
            authType: user.authType || 'unknown',
            input: sourceText
        });
        
        fetch('/translate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            if (data.result) {
                document.getElementById('translated-text').value = data.result;
            } else {
                alert('Erreur: ' + (data.error || 'Erreur inconnue'));
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            console.error('Erreur:', error);
            alert('Erreur de traduction.');
        });
    }
});

document.getElementById('copy-text').addEventListener('click', function() {
    const translatedText = document.getElementById('translated-text').value;
    if (translatedText) {
        navigator.clipboard.writeText(translatedText);
        alert('Texte copié!');
    }
});

document.getElementById('clear-all').addEventListener('click', function() {
    document.getElementById('source-text').value = '';
    document.getElementById('translated-text').value = '';
});