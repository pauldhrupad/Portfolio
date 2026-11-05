import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

export async function startProductionServer() {
  const probe = createServer().listen(0, "127.0.0.1");
  await once(probe, "listening");
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  const base = `http://127.0.0.1:${port}`;

  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)], {
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, RESEND_API_KEY: "", CONTACT_FROM_EMAIL: "", CONTACT_TO_EMAIL: "" },
  });
  let log = "";
  for (const stream of [child.stdout, child.stderr]) stream.on("data", (chunk) => { log = (log + chunk).slice(-10_000); });
  const exited = once(child, "exit");
  const stop = async () => {
    if (child.exitCode === null && child.signalCode === null) child.kill();
    await exited;
  };

  for (let attempt = 0; attempt < 40 && child.exitCode === null; attempt++) {
    try {
      const response = await fetch(base, { method: "HEAD", signal: AbortSignal.timeout(800) });
      if (response.ok) return { base, stop, logs: () => log };
    } catch {
      // Wait for the production server to accept requests.
    }
    await delay(200);
  }
  await stop();
  throw new Error(`Could not start the built portfolio. Run npm run build first.\n${log}`);
}
