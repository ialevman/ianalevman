const a = { url: "/media/carpet-a.webp" };
const m = { url: "/media/carpet-monster.webp" };

/** Footer: the whole wall carpet, edge to edge at its own proportions, with the monster slowly surfacing in the weave. */
export function CarpetFooter({ children }: { children?: React.ReactNode }) {
  const img = "absolute inset-0 h-full w-full object-cover";
  return (
    <footer className="mt-24 pb-10">
      <div className="relative aspect-[1420/771] w-full" aria-hidden>
        <img src={a.url} alt="" loading="lazy" className={img} />
        <img src={m.url} alt="" loading="lazy" className={`carpet-monster ${img}`} />
      </div>
      {children}
    </footer>
  );
}
