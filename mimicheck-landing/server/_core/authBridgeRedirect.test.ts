import { describe, expect, it } from "vitest";

import {
  buildAuthBridgeRedirectUrl,
  getCoreAppBaseUrl,
} from "./authBridgeRedirect";

describe("auth-bridge redirect", () => {
  it("uses env override when provided", () => {
    expect(
      getCoreAppBaseUrl({
        nodeEnv: "production",
        appUrlEnv: "https://app.example.com",
      })
    ).toBe("https://app.example.com");
  });

  it("uses production default when NODE_ENV=production and no env override", () => {
    expect(getCoreAppBaseUrl({ nodeEnv: "production", appUrlEnv: "" })).toBe(
      "https://app.mimicheck.ai"
    );
  });

  it("uses localhost in development when no env override", () => {
    expect(getCoreAppBaseUrl({ nodeEnv: "development", appUrlEnv: "" })).toBe(
      "http://localhost:8005"
    );
  });

  it("builds a redirect url with query params", () => {
    const url = buildAuthBridgeRedirectUrl({
      nodeEnv: "production",
      appUrlEnv: "https://app.mimicheck.ai",
      query: { access_token: "a", refresh_token: "r" },
    });

    expect(url).toBe(
      "https://app.mimicheck.ai/auth-bridge?access_token=a&refresh_token=r"
    );
  });
});
