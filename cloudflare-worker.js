// Cloudflare Workers Backend for Global Ranking
// Deploy this to Cloudflare Workers and replace the URL in script.js

// You'll need to create a KV namespace called "GAME_SCORES"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // GET /api/scores - Pobierz ranking
  if (url.pathname === '/api/scores' && request.method === 'GET') {
    try {
      const scoresJson = await GAME_SCORES.get('global_ranking')
      const scores = scoresJson ? JSON.parse(scoresJson) : []
      
      return new Response(JSON.stringify({ scores }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to load scores' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }
  
  // POST /api/scores - Zapisz wynik
  if (url.pathname === '/api/scores' && request.method === 'POST') {
    try {
      const data = await request.json()
      
      // Walidacja
      if (!data.nick || !data.score || !data.level) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      // Pobierz istniejący ranking
      const scoresJson = await GAME_SCORES.get('global_ranking')
      let scores = scoresJson ? JSON.parse(scoresJson) : []
      
      // Dodaj nowy wynik
      scores.push({
        nick: data.nick.substring(0, 22), // limit 22 znaków
        score: parseFloat(data.score),
        level: parseInt(data.level),
        time: parseInt(data.time),
        date: data.date,
        deviceId: data.deviceId
      })
      
      // Sortuj i zachowaj top 100
      scores.sort((a, b) => b.score - a.score)
      scores = scores.slice(0, 100)
      
      // Zapisz
      await GAME_SCORES.put('global_ranking', JSON.stringify(scores))
      
      // Sprawdź czy jest w top 10
      const playerRank = scores.findIndex(s => 
        s.deviceId === data.deviceId && 
        s.score === data.score
      )
      const isTop10 = playerRank < 10
      
      return new Response(JSON.stringify({ 
        success: true,
        isTop10,
        rank: playerRank + 1
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
      
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to save score' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }
  
  return new Response('Not Found', { 
    status: 404,
    headers: corsHeaders
  })
}