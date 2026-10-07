import { readFileSync } from "node:fs";

const GRAPH_VERSION = "v23.0";

function loadEnv(path = ".env") {
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function argValue(name) {
  const prefix = `${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : "";
}

async function graph(path, params, method = "GET") {
  const url = new URL(`https://graph.instagram.com/${GRAPH_VERSION}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  }

  const response = await fetch(url, { method });
  const json = await response.json();
  if (!response.ok || json.error) {
    const message = json.error?.message || response.statusText;
    throw new Error(`${response.status}: ${message}`);
  }
  return json;
}

async function main() {
  loadEnv();

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const videoUrl = argValue("--video-url");
  const caption = argValue("--caption") || "Test reel from phunnysunny.";
  const shouldPublish = process.argv.includes("--publish");

  if (!token || !userId) throw new Error("Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID in .env");
  if (!videoUrl) throw new Error("Pass --video-url=https://.../video.mp4");

  const account = await graph(userId, {
    fields: "user_id,username",
    access_token: token,
  });
  console.log(`Account OK: ${account.username} (${account.user_id || account.id})`);

  const container = await graph(
    `${userId}/media`,
    {
      media_type: "REELS",
      video_url: videoUrl,
      caption,
      share_to_feed: "true",
      access_token: token,
    },
    "POST",
  );
  console.log(`Container created: ${container.id}`);

  let status = "IN_PROGRESS";
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const result = await graph(container.id, {
      fields: "status_code",
      access_token: token,
    });
    status = result.status_code;
    console.log(`Status ${attempt}: ${status}`);
    if (status === "FINISHED") break;
    if (status === "ERROR" || status === "EXPIRED") throw new Error(`Container status: ${status}`);
  }

  if (status !== "FINISHED") throw new Error(`Timed out waiting for FINISHED. Last status: ${status}`);

  if (!shouldPublish) {
    console.log("Dry run complete. Re-run with --publish to publish this Reel.");
    return;
  }

  const published = await graph(
    `${userId}/media_publish`,
    {
      creation_id: container.id,
      access_token: token,
    },
    "POST",
  );
  console.log(`Published media id: ${published.id}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
