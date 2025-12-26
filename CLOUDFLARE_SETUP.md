# Cloudflare Workers Backend Setup

## Kroki instalacji:

### 1. Utwórz Cloudflare Workers
1. Zarejestruj się na https://workers.cloudflare.com/
2. Utwórz nowy Worker
3. Skopiuj kod z `cloudflare-worker.js`

### 2. Dodaj KV Namespace
1. W dashboardzie Cloudflare Workers, przejdź do "KV"
2. Utwórz namespace o nazwie "GAME_SCORES"
3. W ustawieniach Workera, bind namespace:
   - Variable name: `GAME_SCORES`
   - KV namespace: wybierz utworzony namespace

### 3. Deploy Worker
1. Kliknij "Save and Deploy"
2. Skopiuj URL swojego workera (np. `https://twoj-worker.workers.dev`)

### 4. Zaktualizuj grę
W `script.js` znajdź dwie linijki:
```javascript
fetch("https://YOUR_WORKER.workers.dev/api/scores", {
```

Zamień `YOUR_WORKER` na nazwę swojego workera.

## Testowanie lokalnie

Gra działa również OFFLINE! Jeśli backend nie jest dostępny:
- Wyniki zapisują się lokalnie w localStorage
- Globalny ranking pokazuje "Brak połączenia"
- Wszystkie funkcje gry działają normalnie

## API Endpoints

### GET /api/scores
Zwraca globalny ranking (top 100)

### POST /api/scores
Zapisuje nowy wynik
Body:
```json
{
  "nick": "string",
  "score": number,
  "level": number,
  "time": number,
  "date": "ISO string",
  "deviceId": "string"
}
```