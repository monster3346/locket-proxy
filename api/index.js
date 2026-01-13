export default async function handler(req, res) {
  // 1. Giật email từ header
  const auth = req.headers.authorization || '';
  const email = auth
    ? Buffer.from(auth.split('.')[1], 'base64')
        .toString()
        .split('"email":"')[1]?.split('"')[0] || 'unknown'
    : 'unknown';
  console.log(new Date().toISOString(), email);   // log ở Vercel

  // 2. Thêm key gốc vào header
  req.headers['x-api-key'] = 'LKD-LOCKETDIO-AB02F55KYM55DD02MM03YY25-LKD';

  // 3. Forward sang Locket
  const url = 'https://api.locket-dio.com' + req.url;
  const ans = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  }).then(r => r.json());

  // 4. Trả kết quả về extension
  res.json(ans);
}
