/**
 * fetch() with a hard timeout. Plain fetch() has no default timeout — if a
 * backend is unresponsive (e.g. a sleeping/cold-starting container that
 * never replies), the promise can hang forever and any UI awaiting it gets
 * stuck in a permanent loading state. This aborts and rejects instead.
 *
 * Default timeout is 75s — SnapDeploy's own docs state free-tier containers
 * wake from sleep in "about 60 seconds", so 75s gives a safe margin above
 * that before we give up and show a "try again" message.
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 75000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (e) {
    if (e.name === "AbortError") {
      throw new Error(
        "The server is taking too long to respond (it may be waking up from sleep). Please try again in a minute."
      );
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}