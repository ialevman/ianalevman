import { useState } from "react";
import { toast } from "sonner";
import { ARTIST } from "@/data/works";
import { Button } from "@/components/ui/button";

export { BottleHeader as SiteHeader } from "./bottle-header";
import { CarpetFooter } from "./carpet-footer";

export function Carpet({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`carpet-bg pointer-events-none absolute inset-0 opacity-[0.05] saturate-50 ${className}`} />;
}

function CollectorsSignup() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="footer-signup"
      onSubmit={(e) => {
        e.preventDefault();
        setEmail("");
        toast("You're on the collectors' list. Thank you.");
      }}
    >
      <label className="footer-email-label">
        <span className="footer-signup-title">Collectors’ list</span>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
          autoComplete="email" aria-label="Email for the collectors’ list" className="footer-email" />
      </label>
      <Button type="submit" variant="lettering" className="footer-join">Join</Button>
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
