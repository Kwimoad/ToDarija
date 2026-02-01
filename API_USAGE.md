# API Usage Guide

Simple guide to use the ToDarija translation API.

## Quick Start

**URL:** `http://localhost:8080/ToDarija-1.0-SNAPSHOT/api/Translate`

**Method:** `POST`

## Request

```json
{
  "type": "text",
  "input": "Hello, how are you?"
}
```

## Headers

```
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

## Response

```json
{
  "input": "Hello, how are you?",
  "translation": "كيفاش نتا؟"
}
```

## Errors

- **401** - Not authenticated (login with Google first)
- **400** - Missing type or input
- **500** - Server error

## Getting a Token

1. Open the web interface
2. Click "Login with Google"
3. Token is saved automatically

That's it!
