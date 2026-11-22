import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ARTIST } from "@/data/works";
const bottle = { url: "/media/bottle-zastolnaya.webp" };
import { ArrowUp, Instagram, Menu, Send } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { shouldHideBottle, shouldRenderBottle } from "@/lib/header-scroll";

const NAV = [
  { to: "/", label: "Works", exact: true },
  { to: "/cv", label: "CV", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/press", label: "Press", exact: false },
] as const;

function NavItem({ to, label, exact, className = "bottle-label-link", onClick }: { to: "/" | "/cv" | "/about" | "/press"; label: string; exact: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link to={to} activeOptions={{ exact }} className={className} activeProps={{ className: "is-active" }} onClick={onClick}>
      {label}
    </Link>
  );
}

const INSTAGRAM = "https://www.instagram.com/ia_levman?evlk=MWZsbjZrbmF6d3ZvaQ%3D%3D&utm_source=qr";
const TELEGRAM = "https://t.me/ialevman";

/** The real "Zastolnaya" bottle lying on its side: the name sits on the small neck label, the menu (or burger on mobile) on the plain red label. */
export function BottleHeader() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="bottle-header-scene relative mx-auto">
        <img src={bottle.url} alt="" aria-hidden width={2279} height={551} className="bottle-header-image block" />
        <Link to="/" aria-label={ARTIST} className="bottle-band-name pointer-events-auto">
          <span>{ARTIST}</span>
        </Link>
        <nav aria-label="Main navigation" className="bottle-label-nav pointer-events-auto">
          {NAV.map((n) => <NavItem key={n.to} {...n} />)}
          <Button asChild variant="lettering" size="icon" className="bottle-social"><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><Instagram aria-hidden /></a></Button>
          <Button asChild variant="lettering" size="icon" className="bottle-social"><a href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram"><Send aria-hidden /></a></Button>
        </nav>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="lettering" size="icon" className="bottle-burger pointer-events-auto" aria-label="Open menu"><Menu aria-hidden /></Button>
          </SheetTrigger>
          <SheetContent side="top" className="bottle-menu">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV.map((n) => <NavItem key={n.to} {...n} className="bottle-menu-link" onClick={() => setMenuOpen(false)} />)}
            </nav>
            <div className="mt-4 flex gap-4">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="bottle-menu-link text-xl">Instagram</a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="bottle-menu-link text-xl">Telegram</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
    {hidden && (
      <Button variant="lettering" size="icon" className="back-to-header fixed bottom-6 right-4 z-50 md:right-6"
        aria-label="Back to top" title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
        <ArrowUp aria-hidden />
      </Button>
    )}
    </>
  );
}
