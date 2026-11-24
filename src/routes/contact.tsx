import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { sendForm, SEND_FAILED } from "@/lib/send-form";
import { PinnedHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Iana Levman" },
      { name: "description", content: "Get in touch with Iana Levman about works, exhibitions and collaborations." },
      { property: "og:title", content: "Contact — Iana Levman" },
      { property: "og:description", content: "Get in touch with Iana Levman about works, exhibitions and collaborations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <section data-artworks-start className="mt-12 pb-16">
      <PinnedHeading title="Contact" />
      <div className="mx-auto max-w-6xl px-5 pt-6">
      <form className="flex max-w-2xl flex-col gap-5"
        onSubmit={async (e) => {
          e.preventDefault(); const f = e.currentTarget; const d = new FormData(f); setSending(true);
          const ok = await sendForm("Contact", { name: String(d.get("name") ?? ""), email: String(d.get("email") ?? ""), message: String(d.get("message") ?? "") });
          setSending(false);
          if (ok) { f.reset(); toast("Thank you — I'll reply soon."); } else toast(SEND_FAILED);
        }}>
        {[["name", "Your name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
          <label key={n} className="flex flex-col gap-1">
            <span className="font-label text-[15px]">{l}</span>
            <input required name={n} type={t} className="border-b border-foreground/40 bg-transparent py-2 text-lg outline-none focus:border-primary" />
          </label>
        ))}
        <label className="flex flex-col gap-1">
          <span className="font-label text-[15px]">Message</span>
          <textarea required name="message" rows={5} className="lace-border bg-transparent p-2 text-lg outline-none" />
        </label>
        <button disabled={sending} className={`font-label self-start bg-primary px-8 py-3 text-lg text-primary-foreground hover:bg-accent ${sending ? "lace-loading" : ""}`}>{sending ? "Sending…" : "Send"}</button>
      </form>
      </div>
    </section>
  );
}
