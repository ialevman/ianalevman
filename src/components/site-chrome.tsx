import { useState } from "react";
import { toast } from "sonner";
import { ARTIST } from "@/data/works";
import { Button } from "@/components/ui/button";
import { sendForm, SEND_FAILED } from "@/lib/send-form";

export { BottleHeader as SiteHeader } from "./bottle-header";
import { CarpetFooter } from "./carpet-footer";

export function Carpet({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`carpet-bg pointer-events-none absolute inset-0 opacity-[0.05] saturate-50 ${className}`} />;
}

/**
 * Page title that pins to the top like "Artworks". Put it first inside an element marked `data-artworks-start`:
 * when that element reaches the bottle's lower edge the bottle hides and this heading takes the top edge.
 */
export function PinnedHeading({ title, width = "max-w-6xl" }: { title: string; width?: string }) {
  return (
    <div className="sticky top-0 z-40 bg-background">
      <h1 className={`gallery-lettering mx-auto ${width} px-5 py-4 text-[32px] md:py-5 md:text-[44px]`}>{title}</h1>
    </div>
  );
}

function CollectorsSignup() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  return (
    <form
      className="footer-signup"
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        const ok = await sendForm("Collectors' list", { email });
        setSending(false);
        if (ok) { setEmail(""); toast("You're on the collectors' list. Thank you."); } else toast(SEND_FAILED);
      }}
    >
      <label className="footer-email-label">
        <span className="footer-signup-title">Collectors’ list</span>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
          autoComplete="email" aria-label="Email for the collectors’ list" className="footer-email" />
      </label>
      <Button type="submit" variant="lettering" disabled={sending} className="footer-join">{sending ? "…" : "Join"}</Button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <CarpetFooter>
      <div className="w-full max-w-3xl"><CollectorsSignup /></div>
      <p className="footer-signature">
        <span className="footer-location">© {new Date().getFullYear()} · {ARTIST}</span>
      </p>
    </CarpetFooter>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-label text-[15px] leading-tight text-muted-foreground ${className}`}>{children}</div>;
}
