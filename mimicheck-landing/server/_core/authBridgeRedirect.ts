export function getCoreAppBaseUrl(opts: {
  nodeEnv?: string;
  appUrlEnv?: string;
}): string {
  const envUrl = opts.appUrlEnv?.trim();
  if (envUrl) return envUrl.replace(/\/$/, "");

  if (opts.nodeEnv === "production") {
    return "https://app.mimicheck.ai";
  }

  return "http://localhost:8005";
}

export function buildAuthBridgeRedirectUrl(opts: {
  nodeEnv?: string;
  appUrlEnv?: string;
  query: Record<string, unknown>;
}): string {
  const base = getCoreAppBaseUrl({
    nodeEnv: opts.nodeEnv,
    appUrlEnv: opts.appUrlEnv,
  });
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(opts.query)) {
    if (value === undefined || value === null) continue;

    if (typeof value === "string") {
      params.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      const first = value.find(
        v =>
          typeof v === "string" ||
          typeof v === "number" ||
          typeof v === "boolean"
      );
      if (typeof first === "string") params.set(key, first);
      else if (typeof first === "number") params.set(key, String(first));
      else if (typeof first === "boolean")
        params.set(key, first ? "true" : "false");
      continue;
    }

    if (typeof value === "number") {
      params.set(key, String(value));
      continue;
    }

    if (typeof value === "boolean") {
      params.set(key, value ? "true" : "false");
      continue;
    }
  }

  const qs = params.toString();
  return `${base}/auth-bridge${qs ? `?${qs}` : ""}`;
}
