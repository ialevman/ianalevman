/**
 * Sends a site form to the artist's inbox via FormSubmit (no account or key needed).
 * Every subject starts with "[ianalevman.com]" so a daily digest can find these emails.
 * The very first submission triggers a one-time activation email to the inbox.
 */
const INBOX = "ialevman@gmail.com";

export type FormKind = "Collectors' list" | "Artwork enquiry" | "Contact";

export async function sendForm(kind: FormKind, fields: Record<string, string>): Promise<boolean> {
  const who = fields.email ? ` — ${fields.email}` : "";
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        form: kind,
        page: typeof window !== "undefined" ? window.location.href : "",
        _subject: `[ianalevman.com] ${kind}${who}`,
        _template: "table",
        _captcha: "false",
        ...(fields.email ? { _replyto: fields.email } : {}),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return res.ok && String(data.success) === "true";
  } catch {
    return false;
  }
}

export const SEND_FAILED = `Sorry, that didn't go through. Please write to ${INBOX}.`;
