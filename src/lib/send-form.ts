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
const WEB3FORMS_KEY = import.meta.env['VITE_WEB3FORMS_KEY'] as string | undefined;

export type SendResult = "sent" | "mailto" | false;

/**
 * Collectors' list goes straight into a Google Form (responses land in a Google Sheet the artist owns).
 * Google Forms doesn't allow CORS, so the request is fire-and-forget ("no-cors"); a network failure still throws.
 */
const COLLECTORS_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSd_-kswtZsOy2CYmYnAOcih4_Z-xjf0gRpRffV_6cWGxfUX1g/formResponse";
const COLLECTORS_EMAIL_FIELD = "entry.810651354";

export async function joinCollectorsList(email: string): Promise<boolean> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  try {
    await fetch(COLLECTORS_FORM, {
      method: "POST", mode: "no-cors", signal: ctl.signal,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ [COLLECTORS_EMAIL_FIELD]: email.trim() }).toString(),
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Opens the visitor's mail app with everything filled in; the subject keeps the "[ianalevman.com]" tag the inbox agent looks for. */
function openMail(subject: string, fields: Record<string, string>, page: string) {
  const body = Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") + (page ? `\n\n${page}` : "");
  window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * With a Web3Forms key the form is sent in the background; without one (the default) the visitor's
 * mail app opens pre-filled, so nothing depends on a third-party form service.
 */
export async function sendForm(kind: FormKind, fields: Record<string, string>): Promise<SendResult> {
  const who = fields['email'] ? ` — ${fields['email']}` : "";
  const subject = `[ianalevman.com] ${kind}${who}`;
  const page = typeof window !== "undefined" ? window.location.href : "";
  if (!WEB3FORMS_KEY) { openMail(subject, fields, page); return "mailto"; }
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST", signal: ctl.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "ianalevman.com", form: kind, page, ...fields, ...(fields['email'] ? { replyto: fields['email'] } : {}) }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (res.ok && String(data.success) === "true") return "sent";
  } catch { /* fall through to mail app */ } finally { clearTimeout(timer); }
  openMail(subject, fields, page);
  return "mailto";
}

export const MAIL_OPENED = "Your email app has opened with everything filled in — just press Send.";

export const SEND_FAILED = `Sorry, that didn't go through. Please write to ${INBOX}.`;
