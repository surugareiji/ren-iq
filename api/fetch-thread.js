// Vercel Serverless Function: したらばのrawデータを取得してブラウザに返すプロキシ
export default async function handler(req, res) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'urlパラメータが必要です' });
  }

  // URLバリデーション（したらばのみ許可）
  let targetUrl;
  try {
    targetUrl = decodeURIComponent(url);
  } catch {
    return res.status(400).json({ error: '不正なURLです' });
  }

  if (!targetUrl.includes('jbbs.shitaraba.net')) {
    return res.status(400).json({ error: 'したらば掲示板のURLのみ対応しています' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AnyoTrapBot/1.0)',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `取得失敗: HTTP ${response.status}` });
    }

    // したらばはEUC-JPで返すことがある
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('euc-jp');
    const text = decoder.decode(buffer);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: `サーバーエラー: ${err.message}` });
  }
}
