import { useEffect, useState } from "react";
import { unlockVideo } from "@/lib/private-video";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { works, ARTIST } from "@/data/works";
import { AcquireSheet } from "@/components/acquire-sheet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const work = works.find((w) => w.slug === params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.work.title} (${loaderData.work.year}) — ${ARTIST}` : "Work not found";
    const d = loaderData ? `${loaderData.work.medium}, ${loaderData.work.size}. ${loaderData.work.text}` : "This work could not be found.";
    return {
      meta: [
        { title: t }, { name: "description", content: d },
        { property: "og:title", content: t }, { property: "og:description", content: d },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24">
      <p>This work isn't here.</p>
      <Link to="/" className="raw-link">Back to works</Link>
    </div>
  ),
  component: WorkPage,
});

function WorkPage() {
  const { work } = Route.useLoaderData();
  return (
    <div className="gallery-lettering mx-auto grid max-w-6xl gap-10 px-5 pt-10 md:grid-cols-[1.6fr_1fr]">
      <div className="grid gap-10">
        {work.privateVideo ? (
          <PrivateVideo slug={work.slug} title={work.title} poster={work.image} w={work.w} h={work.h} />
        ) : work.youtube ? (
          <div className="relative aspect-video w-full self-start bg-foreground">
            <iframe src={`https://www.youtube-nocookie.com/embed/${work.youtube}?rel=0&modestbranding=1&mute=1`} title={work.title} loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
              className="absolute inset-0 h-full w-full border-0" />
          </div>
        ) : work.watch ? (
          <a href={work.watch.url} target="_blank" rel="noopener noreferrer" className="group relative block self-start" aria-label={`${work.watch.label}: ${work.title}`}>
            <img src={work.image} alt={work.title} width={work.w} height={work.h} className="fade-in h-auto w-full" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/30">
              <span className="ui-button border-white bg-white/90 text-[color:var(--action-ink)]">▶ {work.watch.label}</span>
            </span>
          </a>
        ) : (
          <img src={work.image} alt={work.title} width={work.w} height={work.h} className="fade-in h-auto w-full" />
        )}
        {work.extra?.map((p) => (
          <img key={p.src} src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-auto w-full" />
        ))}
      </div>
      <aside className="md:sticky md:top-10 md:self-start">
        <Button asChild variant="lettering" className="ui-control h-auto p-0"><Link to="/"><ArrowLeft aria-hidden />All works</Link></Button>
        <div className="mt-8">
          <h1 className="page-title text-[32px] md:text-[44px]">{work.title}</h1>
          <div className="ui-control mt-4 flex flex-wrap gap-x-5 gap-y-1 opacity-70">
            <span>{work.year}</span><span>{work.size}</span><span>{work.category}</span>
          </div>
        </div>
        <p className="mt-6 text-base font-normal leading-relaxed">{work.medium}. {work.text}</p>
        <div className="mt-10">
          {work.onRequest ? (
            <Button asChild variant="lettering" className="ui-button">
              <a href={`mailto:ialevman@gmail.com?subject=${encodeURIComponent(`About "${work.title}"`)}`}>Ask about this work</a>
            </Button>
          ) : work.available ? (
            <>
              <p className="mb-5 text-xl font-medium">{work.price}</p>
              <AcquireSheet work={work} />
            </>
          ) : (
            <p className="ui-control">Sold</p>
          )}
        </div>
      </aside>
    </div>
  );
}

/** Poster with a password field; after the server accepts the password the full video plays here. */
function PrivateVideo({ slug, title, poster, w, h }: { slug: string; title: string; poster: string; w: number; h: number }) {
  const [url, setUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const key = `unlocked:${slug}`;
  useEffect(() => {
    try { const saved = sessionStorage.getItem(key); if (saved) void submit(saved); } catch { /* storage unavailable */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function submit(pw: string) {
    setBusy(true); setError(false);
    try {
      const res = await unlockVideo({ data: { slug, password: pw } });
      if (res.ok) { setUrl(res.url); try { sessionStorage.setItem(key, pw); } catch { /* ignore */ } }
      else setError(true);
    } catch { setError(true); } finally { setBusy(false); }
  }
  if (url) return <video src={url} poster={poster} controls autoPlay playsInline width={w} height={h} className="fade-in h-auto w-full bg-foreground" aria-label={title} />;
  return (
    <div className="relative">
      <img src={poster} alt={title} width={w} height={h} className="fade-in h-auto w-full brightness-[0.55]" />
      <form onSubmit={(e) => { e.preventDefault(); void submit(password); }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
        <label htmlFor="video-pw" className="ui-control text-white">Private screening · enter password</label>
        <div className="flex gap-2">
          <input id="video-pw" type="password" inputMode="numeric" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-40 border-b-2 border-white bg-transparent px-1 py-1 text-center text-xl text-white outline-none placeholder:text-white/60" placeholder="Password" />
          <button type="submit" disabled={busy} className="ui-button ml-3 h-10 border-white px-5 text-white hover:bg-white hover:text-black">{busy ? "…" : "Play"}</button>
        </div>
        {error && <p role="alert" className="text-base">Wrong password</p>}
      </form>
    </div>
  );
}
