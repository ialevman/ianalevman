import a from "@/assets/carpet-only-a.jpg.asset.json";
import b from "@/assets/carpet-only-c.jpg.asset.json";
import m from "@/assets/carpet-only-monster2.jpg.asset.json";

/** Carpet-only footer: the artist's wall carpet stretched edge to edge; ornaments slowly shift through a monster moment. */
export function CarpetFooter({ children }: { children: React.ReactNode }) {
  const img = "absolute inset-0 h-full w-full object-cover";
  return (
    <footer className="relative mt-24 min-h-[560px] overflow-hidden md:min-h-[680px]">
      <div className="absolute inset-0" aria-hidden>
        <img src={a.url} alt="" loading="lazy" className={img} />
        <img src={b.url} alt="" loading="lazy" className={`carpet-morph ${img}`} />
        <img src={m.url} alt="" loading="lazy" className={`carpet-monster ${img}`} />
      </div>
      <div className="carpet-footer-content relative mx-auto flex min-h-[560px] max-w-6xl flex-col items-center justify-between gap-8 px-6 py-14 md:min-h-[680px] md:px-12 md:py-16">
        {children}
      </div>
    </footer>
  );
}
