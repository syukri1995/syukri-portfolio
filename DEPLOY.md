# Deploy to Vercel

## 1. GitHub

```bash
cd syukri-portfolio
git remote remove origin   # only if still pointing at template author
git remote add origin https://github.com/YOUR_USERNAME/syukri-portfolio.git
git add -A
git commit -m "Personalize portfolio for Syukri Shamsudin"
git push -u origin main
```

Create the empty repo `syukri-portfolio` on GitHub first (public or private).

## 2. Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your `syukri-portfolio` repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables → add `GROQ_API_KEY` (from [console.groq.com](https://console.groq.com)).
7. Deploy.

## 3. After deploy

- Open `/` — landing and 3D character (desktop).
- Open `/play` — chess vs Stockfish + AI chat (needs `GROQ_API_KEY`).
- Optional: Project → Settings → Domains for a custom domain.

## 4. Replace assets (recommended)

- `public/images/mypic.jpeg` — your profile photo
- `public/models/character.glb` — your own Mixamo character (optional)
- `public/images/placeholder.webp` — swap per project screenshot
