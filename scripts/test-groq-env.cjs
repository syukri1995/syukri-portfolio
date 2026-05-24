const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
if (!fs.existsSync(envPath)) {
  console.error("FAIL: .env not found");
  process.exit(1);
}

const line = fs
  .readFileSync(envPath, "utf8")
  .split(/\r?\n/)
  .find((l) => /^\s*GROQ_API_KEY\s*=/.test(l));

if (!line) {
  console.error("FAIL: GROQ_API_KEY not found in .env");
  process.exit(1);
}

const key = line
  .replace(/^\s*GROQ_API_KEY\s*=\s*/, "")
  .trim()
  .replace(/^["']|["']$/g, "");

if (!key) {
  console.error("FAIL: GROQ_API_KEY is empty");
  process.exit(1);
}

async function main() {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Reply with only the word OK" }],
        max_tokens: 10,
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    console.error("FAIL:", data.error?.message || response.status);
    process.exit(1);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  console.log("OK: Groq responded:", text || "(empty)");
}

main().catch((err) => {
  console.error("FAIL:", err.message);
  process.exit(1);
});
