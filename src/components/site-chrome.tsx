import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ARTIST } from "@/data/works";
import { Button } from "@/components/ui/button";
import { joinCollectorsList, SEND_FAILED } from "@/lib/send-form";

export { BottleHeader as SiteHeader } from "./bottle-header";
import { CarpetFooter } from "./carpet-footer";

export function Carpet({ className = "", opacity = 0.05 }: { className?: string; opacity?: number }) {
  return <div aria-hidden style={{ opacity }} className={`carpet-bg pointer-events-none absolute inset-0 ${className}`} />;
}

/**
 * Page title that pins to the top like "Artworks". Put it first inside an element marked `data-artworks-start`:
 * when that element reaches the bottle's lower edge the bottle hides and this heading takes the top edge.
 */
export function PinnedHeading({ title, width = "max-w-6xl" }: { title: string; width?: string }) {
  return (
    <div className="sticky top-0 z-40 bg-background">
      <h1 className={`page-title mx-auto ${width} px-5 py-4 text-[40px] md:py-5 md:text-[64px]`}>{title}</h1>
    </div>
  );
}

/** Collectors' list as its own section (home page only). */
export function CollectorsSignup() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  return (
    <section className="mx-auto mt-8 max-w-6xl px-5">
    <form
      className="collectors-section"
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        const ok = await joinCollectorsList(email);
        setSending(false);
        if (ok) { setEmail(""); toast("You're on the collectors' list. Thank you."); }
        else toast(SEND_FAILED);
      }}
    >
      <div className="max-w-md">
        <h2 className="page-title text-[32px] md:text-[44px]">Collectors’ list</h2>
        <p className="mt-3 text-[15px] text-muted-foreground">New works and exhibitions, first. A few letters a year.</p>
      </div>
      <div className="flex w-full max-w-lg items-end gap-3">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
          autoComplete="email" aria-label="Email for the collectors’ list"
          className="h-12 min-w-0 flex-1 border-b border-[color:var(--ruling)] bg-transparent text-[15px] outline-none focus:border-[color:var(--action-ink)]" />
        <button type="submit" disabled={sending} className="ui-button shrink-0">{sending ? "…" : "Join"}</button>
      </div>
    </form>
    </section>
  );
}

export function SiteFooter() {
  // Individual work pages end with the work itself, no carpet.
  const pathname = useLocation({ select: (l) => l.pathname });
  if (pathname.startsWith("/works/")) return null;
  return (
    <CarpetFooter>
      <p className="ui-control mt-6 text-center opacity-60">© {new Date().getFullYear()} · {ARTIST}</p>
    </CarpetFooter>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-label text-[15px] leading-tight text-muted-foreground ${className}`}>{children}</div>;
}
