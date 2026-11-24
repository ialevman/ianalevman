/**
 * Sends a site form to the artist's inbox via FormSubmit (no account or key needed).
 * Every subject starts with "[ianalevman.com]" so a daily digest can find these emails.
 * The very first submission triggers a one-time activation email to the inbox.
 */
const INBOX = "ialevman@gmail.com";

export type FormKind = "Collectors' list" | "Artwork enquiry" | "Contact";

/**
 * Web3Forms access key (public by design; get one free at web3forms.com with the inbox address).
 * When set, Web3Forms is used; otherwise FormSubmit. Either way a request never waits more than 12 s.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export async function sendForm(kind: FormKind, fields: Record<string, string>): Promise<boolean> {
  const who = fields.email ? ` — ${fields.email}` : "";
  const subject = `[ianalevman.com] ${kind}${who}`;
  const page = typeof window !== "undefined" ? window.location.href : "";
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  try {
    const [url, body] = WEB3FORMS_KEY
      ? ["https://api.web3forms.com/submit", { access_key: WEB3FORMS_KEY, subject, from_name: "ianalevman.com", form: kind, page, ...fields, ...(fields.email ? { replyto: fields.email } : {}) }]
      : [`https://formsubmit.co/ajax/${INBOX}`, { ...fields, form: kind, page, _subject: subject, _template: "table", _captcha: "false", ...(fields.email ? { _replyto: fields.email } : {}) }];
    const res = await fetch(url, {
      method: "POST",
      signal: ctl.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return res.ok && String(data.success) === "true";
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export const SEND_FAILED = `Sorry, that didn't go through. Please write to ${INBOX}.`;
