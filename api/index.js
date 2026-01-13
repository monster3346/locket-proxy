export default async function handler(req, res) {
  const auth = req.headers.authorization || '';
  const email = auth ? Buffer.from(auth.split('.')[1], 'base64').toString().split('"email":"')[1]?.split('"')[0] : 'unknown';
  console.log(new Date().toISOString(), email);
  req.headers['x-api-key'] = 'LKD-LOCKETDIO-AB02F55KYM55DD02MM03YY25-LKD';
  const url = 'https://api.locket-dio.com' + req.url;
  const ans = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  }).then(r => r.json());
  res.json(ans);
}
