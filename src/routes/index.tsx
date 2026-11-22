import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { works, CATEGORIES, type Category } from "@/data/works";
import { Label } from "@/components/site-chrome";
import { HeroVideo } from "@/components/hero-video";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iana Levman — Painting, works on paper and video" },
      { name: "description", content: "Iana Levman, artist working with painting, works on paper and video. Tallinn, Estonia." },
      { property: "og:title", content: "Iana Levman — Painting, works on paper and video" },
      { property: "og:description", content: "Iana Levman, artist working with painting, works on paper and video. Tallinn, Estonia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const offsets = ["", "md:mt-24", "md:mt-8 md:ml-10", "md:-mt-6", "md:mt-16 md:-ml-4", "md:mt-2 md:ml-16"];
type Tab = "All" | Category;

function Index() {
  const [tab, setTab] = useState<Tab>("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const list = works.filter((w) => (tab === "All" || w.category === tab) && (!onlyAvailable || w.available));

  return (
    <div>
      <div className="mt-6 md:mt-10"><HeroVideo /></div>
      <p className="mx-auto mt-4 max-w-6xl px-5 text-center font-normal text-sm md:text-base" style={{ fontFamily: "var(--font-bottle-label)" }}>
        Video performance: Mirror in the Mirror, 2026
      </p>

      <section data-artworks-start className="gallery-lettering mt-20">
        <div className="artworks-header sticky top-0 z-40 bg-background">
        <div className="mx-auto max-w-6xl px-5 py-4 md:py-5">
        <h1 className="text-[32px] font-bold md:text-[44px]">Artworks</h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div role="tablist" aria-label="Work categories" className="flex flex-wrap gap-x-5 gap-y-2 md:gap-x-6">
            {(["All", ...CATEGORIES] as Tab[]).map((t) => (
              <Button variant="lettering" key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`h-auto min-h-11 whitespace-normal p-0 text-xl font-bold md:text-2xl ${tab === t ? "text-accent underline decoration-2 underline-offset-4" : "text-foreground hover:underline"}`}>{t}</Button>
            ))}
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-xl md:text-2xl">
            <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="size-6 shrink-0 accent-primary" />
            Available works
          </label>
        </div>
        </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-x-14 gap-y-20 px-5 md:grid-cols-2">
          {list.map((w, i) => (
            <Link key={w.slug} to="/works/$slug" params={{ slug: w.slug }} className={`group block ${offsets[i] ?? ""}`}>
              <img src={w.image} alt={w.title} width={w.w} height={w.h} loading="lazy" className="fade-in glass-hover h-auto w-full" />
              <div className={`mt-3 flex flex-wrap items-baseline gap-x-3 ${i % 2 ? "justify-end" : ""}`}>
                <span className="text-xl font-medium group-hover:underline">{w.title}</span>
                <Label className="gallery-caption">{w.year} · {w.category}{w.available ? "" : " · Sold"}{onlyAvailable && w.price ? ` · ${w.price}` : ""}</Label>
              </div>
            </Link>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No works here yet.</p>}
        </div>
      </section>
    </div>
  );
}
