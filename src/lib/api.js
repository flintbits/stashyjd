import { invoke } from "@tauri-apps/api/core";

const TIMEOUT_MS = 30000;

const pending = new Set();
const listeners = new Set();

const state = {
  loading: {},
};

function emit() {
  listeners.forEach((fn) => fn({ ...state }));
}

function setLoading(command, value) {
  state.loading[command] = value;
  emit();
}

function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms),
  );
}

function normalizeError(err) {
  return {
    message: err?.message || "Something went wrong",
    raw: err,
  };
}

export function subscribeApiState(callback) {
  listeners.add(callback);
  callback({ ...state });

  return () => listeners.delete(callback);
}

export async function invokeSafe(
  command,
  payload = {},
  { dedupe = true, timeoutMs = TIMEOUT_MS, retries = 0 } = {},
) {
  const key = `${command}:${JSON.stringify(payload)}`;

  if (dedupe && pending.has(key)) {
    throw new Error("Request already in progress");
  }

  pending.add(key);
  setLoading(command, true);

  const start = performance.now();

  try {
    let attempt = 0;

    while (true) {
      try {
        const result = await Promise.race([
          invoke(command, payload),
          timeout(timeoutMs),
        ]);

        const ms = Math.round(performance.now() - start);
        console.log(`[API] ${command} success (${ms}ms)`);

        return result;
      } catch (err) {
        if (attempt >= retries) throw err;
        attempt++;
      }
    }
  } catch (err) {
    const e = normalizeError(err);
    console.error(`[API] ${command} failed`, e.raw);
    throw new Error(e.message);
  } finally {
    pending.delete(key);
    setLoading(command, false);
  }
}
