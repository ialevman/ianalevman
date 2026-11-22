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
      <img src={work.image} alt={work.title} width={work.w} height={work.h} className="fade-in h-auto w-full" />
      <aside className="md:sticky md:top-10 md:self-start">
        <Button asChild variant="lettering" className="h-auto p-0 text-xl font-normal md:text-2xl"><Link to="/"><ArrowLeft aria-hidden />All works</Link></Button>
        <div className="mt-8">
          <h1 className="text-[32px] font-bold leading-tight md:text-[40px]">{work.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xl font-normal md:text-2xl">
            <span>{work.year}</span><span>{work.size}</span><span>{work.category}</span>
          </div>
        </div>
        <p className="mt-6 text-xl font-normal leading-relaxed">{work.medium}. {work.text}</p>
        <div className="mt-10">
          {work.available ? (
            <>
              <p className="mb-5 text-2xl font-bold">{work.price}</p>
              <AcquireSheet work={work} />
            </>
          ) : (
            <p className="text-2xl text-accent">Sold</p>
          )}
        </div>
      </aside>
    </div>
  );
}
