<?php
header('Content-Type: application/json');

$apiUrl = 'http://localhost:8080/ToDarija-1.0-SNAPSHOT/api/Translate';

function translateText($text, $token) {
    global $apiUrl;

    $jsonData = json_encode([
        'type'  => 'text',
        'input' => $text
    ]);

    $ch = curl_init($apiUrl);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    return ['code' => $httpCode, 'response' => $response];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_POST['text'], $_POST['token'])) {
        echo json_encode(['error' => 'Texte ou token manquant']);
        exit;
    }

    $result = translateText($_POST['text'], $_POST['token']);

    if ($result['code'] === 200) {
        echo $result['response'];
    } else {
        echo json_encode([
            'error' => 'Erreur API',
            'code'  => $result['code']
        ]);
    }

} else {
    echo json_encode(['error' => 'Méthode non autorisée']);
}
