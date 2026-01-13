export default async function handler(req, res) {
  // CORS & preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type, x-api-key');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // 1. Log email
    const auth = req.headers.authorization || '';
    const email = auth
      ? Buffer.from(auth.split('.')[1], 'base64')
          .toString()
          .split('"email":"')[1]?.split('"')[0] || 'unknown'
      : 'unknown';
    console.log(new Date().toISOString(), email);

    // 2. Key gốc
    const headers = { ...req.headers, 'x-api-key': 'LKD-LOCKETDIO-AB02F55KYM55DD02MM03YY25-LKD' };

    // 3. Body (Edge cần clone)
    const body = req.method !== 'GET' ? JSON.stringify(req.body) : undefined;

    // 4. Forward
    const url = 'https://api.locket-dio.com' + req.url;
    const ans = await fetch(url, { method: req.method, headers, body }).then(r => r.json());

    // 5. Trả về
    return res.status(200).json(ans);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Proxy error', details: e.message });
  }
}
