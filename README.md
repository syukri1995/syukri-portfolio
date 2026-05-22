# Syukri Shamsudin — Portfolio

3D portfolio website for **Nik Muhammad Syukri Bin Shamsudin** (Computer Science Student, UiTM Malaysia).

## Tech stack

React, TypeScript, Vite, Three.js, GSAP, Groq (chat API), Stockfish (chess on `/play`).

## Credits

This project is based on [portfolio-website](https://github.com/red1-for-hek/portfolio-website) by [@red1-for-hek](https://github.com/red1-for-hek), used under the [MIT License](LICENSE).

The center 3D character uses the **X Bot** sample model from the [Three.js examples](https://github.com/mrdoob/three.js) (Adobe Mixamo). Replace `public/models/character.glb` with your own Mixamo export if you prefer a different look.

## Local development

```bash
npm install
cp .env.example .env   # add GROQ_API_KEY for AI chat on /play
npm run dev
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com) (framework: Vite, build: `npm run build`, output: `dist`).
3. Add environment variable: `GROQ_API_KEY` (from [console.groq.com](https://console.groq.com)).

## License

MIT — see [LICENSE](LICENSE). Original template copyright remains with its author.
