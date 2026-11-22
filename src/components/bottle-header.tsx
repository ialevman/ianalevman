import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ARTIST } from "@/data/works";
const half = { url: "/media/bottle-restored-cap.webp" };
import { ArrowUp, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shouldHideBottle, shouldRenderBottle } from "@/lib/header-scroll";

const NAV = [
  { to: "/", label: "Works", exact: true },
  { to: "/cv", label: "CV", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/press", label: "Press", exact: false },
] as const;

function NavItem({ to, label, exact }: { to: "/" | "/cv" | "/about" | "/press"; label: string; exact: boolean }) {
  return (
    <Link to={to} activeOptions={{ exact }} className="bottle-label-link" activeProps={{ className: "is-active" }}>
      {label}
    </Link>
  );
}

/** Half-bottle body with its full cap and neck restored; lettering stays accessible over the transparent image. */
export function BottleHeader() {
  const [hidden, setHidden] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const artworks = document.querySelector<HTMLElement>("[data-artworks-start]");
      setHidden(shouldHideBottle(artworks?.getBoundingClientRect().top ?? null));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  if (!shouldRenderBottle(pathname)) return null;

  return (
    <>
    <header data-hidden={hidden} aria-hidden={hidden} className="bottle-header pointer-events-none sticky top-0 z-40">
      <div className="bottle-header-scene relative mx-auto w-full">
        <img src={half.url} alt="" aria-hidden width={2171} height={339} className="bottle-header-image block w-full" />
        <Link to="/" aria-label={ARTIST} className="bottle-neck-name pointer-events-auto">
          {ARTIST}
        </Link>
        <nav aria-label="Main navigation" className="bottle-label-nav pointer-events-auto">
          {NAV.map((n) => <NavItem key={n.to} {...n} />)}
          <Button asChild variant="lettering" size="icon" className="bottle-social"><a href="https://www.instagram.com/ia_levman?evlk=MWZsbjZrbmF6d3ZvaQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><Instagram aria-hidden /></a></Button>
          <Button asChild variant="lettering" size="icon" className="bottle-social"><a href="https://t.me/ialevman" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram"><Send aria-hidden /></a></Button>
        </nav>
      </div>
    </header>
    {hidden && (
      <Button variant="lettering" size="icon" className="back-to-header fixed bottom-6 right-4 z-50 bg-background text-foreground md:right-6"
        aria-label="Back to top" title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
        <ArrowUp aria-hidden />
      </Button>
    )}
    </>
  );
}
