import { createServerFn } from "@tanstack/react-start";

/**
 * Password gate for private videos. The file path and password live only in this server function,
 * so neither reaches the browser bundle; the path is returned only after a correct password.
 * (Keep the GitHub repo private, otherwise the file is visible there.)
 */
const PRIVATE: Record<string, { password: string; url: string }> = {
  "mirror-in-the-mirror": { password: "1278", url: "/media/p/148a01e6fa2e4968a2cbe649cb25603c.mp4" },
};

export const unlockVideo = createServerFn({ method: "POST" })
  .inputValidator((d: { slug: string; password: string }) => ({ slug: String(d.slug), password: String(d.password) }))
  .handler(async ({ data }) => {
    const entry = PRIVATE[data.slug];
    if (!entry || data.password.trim() !== entry.password) return { ok: false as const };
    return { ok: true as const, url: entry.url };
  });
