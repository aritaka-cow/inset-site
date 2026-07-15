import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => new Response(`<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, follow">
    <meta name="theme-color" content="#FBFAF6">
    <title>ページが見つかりません — Inset</title>
    <style>:root{color-scheme:light}*{box-sizing:border-box}body{display:grid;place-items:center;min-height:100vh;margin:0;padding:40px 20px;background:#fbfaf6;color:#1a1a18;font:16px/1.8 "Avenir Next",Avenir,"Hiragino Sans",system-ui,sans-serif;text-align:center}main{max-width:560px}h1{margin:0 0 22px;font:400 clamp(72px,22vw,150px)/1 "Iowan Old Style",Baskerville,"Yu Mincho",serif}p{margin:0 0 28px;color:#74726b}a{display:inline-flex;align-items:center;min-height:44px;color:inherit;font-weight:600;text-underline-offset:.22em}:focus-visible{outline:2px solid #1769aa;outline-offset:4px}</style>
  </head>
  <body><main><h1>404</h1><p>ページが見つかりませんでした。</p><a href="/ja/">Insetのホームへ戻る</a></main></body>
</html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
