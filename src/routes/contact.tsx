import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

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
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.2fr]">
      <h1 className="text-[40px] font-extrabold leading-[0.9] md:mt-10 md:text-[56px]">Contact</h1>
      <form className="flex flex-col gap-5"
        onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; setSending(true); setTimeout(() => { setSending(false); f.reset(); toast("Thank you — I'll reply soon."); }, 900); }}>
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
  );
}
