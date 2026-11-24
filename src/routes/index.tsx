import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { works, CATEGORIES, type Category } from "@/data/works";
import { Label, CollectorsSignup } from "@/components/site-chrome";
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
        <h1 className="page-title text-[40px] md:text-[64px]">Artworks</h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-0">
          <div role="tablist" aria-label="Work categories" className="flex flex-wrap gap-x-4 gap-y-0 md:gap-x-6">
            {(["All", ...CATEGORIES] as Tab[]).map((t) => (
              <Button variant="lettering" key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`ui-control h-auto min-h-11 whitespace-normal p-0 ${tab === t ? "underline decoration-1 underline-offset-[6px]" : "opacity-60 hover:opacity-100"}`}>{t}</Button>
            ))}
          </div>
          <label className="ui-control flex min-h-11 cursor-pointer items-center gap-2">
            <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="size-4 shrink-0 accent-[color:var(--foreground)]" />
            Available works
          </label>
        </div>
        </div>
        </div>

        {/* Even two-column grid, grouped by medium: video first, then paintings, then works on paper. */}
        <div className="mx-auto mt-12 max-w-6xl px-5">
          {CATEGORIES.filter((c) => tab === "All" || tab === c).map((c) => {
            const items = list.filter((w) => w.category === c);
            if (items.length === 0) return null;
            return (
              <div key={c} className="mb-24">
                {tab === "All" && <h2 className="ui-control mb-6 border-b border-[color:var(--ruling)] pb-3">{c}</h2>}
                <div className="grid items-start gap-x-10 gap-y-16 md:grid-cols-2">
                  {items.map((w) => (
                    <Link key={w.slug} to="/works/$slug" params={{ slug: w.slug }} className="group block">
                      <img src={w.image} alt={w.title} width={w.w} height={w.h} loading="lazy"
                        className={`fade-in glass-hover h-auto w-full ${c === "Video" ? "aspect-video object-cover" : c === "Works on Paper" ? "aspect-[21/29] max-h-[calc(100vh-220px)] object-contain object-left-bottom" : "aspect-[4/5] max-h-[calc(100vh-220px)] object-contain object-left-bottom"}`} />
                      <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[15px] font-normal group-hover:underline">{w.title}</span>
                        <Label className="gallery-caption">{w.year}{w.available ? "" : " · Sold"}{onlyAvailable && w.price ? ` · ${w.price}` : ""}</Label>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          {list.length === 0 && <p className="text-muted-foreground">No works here yet.</p>}
        </div>
      </section>
      <CollectorsSignup />
    </div>
  );
}
