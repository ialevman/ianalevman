import { useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import type { Work } from "@/data/works";
import { Button } from "@/components/ui/button";
import { sendForm, SEND_FAILED, MAIL_OPENED } from "@/lib/send-form";
const bottle = { url: "/media/acquire-whole-bottle.webp" };

export function AcquireSheet({ work }: { work: Work }) {
  const [open, setOpen] = useState(false);
  const [asking, setAsking] = useState(false);
  const [sending, setSending] = useState(false);
  return (
    <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (!o) setAsking(false); }}>
      <SheetTrigger asChild>
        <Button variant="lettering" className="acquire-bottle" aria-label="Acquire">
          <img src={bottle.url} width={2163} height={396} alt="" aria-hidden />
          <span>Acquire</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gallery-lettering w-full overflow-y-auto border-l border-[color:var(--ruling)] bg-background sm:max-w-md [&>button]:top-3 [&>button]:right-3 [&>button]:z-20 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center [&>button]:opacity-100 [&>button]:shadow-none [&>button]:ring-0 [&>button]:outline-none [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:focus:outline-none [&>button]:focus-visible:outline-none [&>button>svg]:size-7">
        <SheetHeader>
          <SheetTitle className="page-title text-[32px]">Acquire</SheetTitle>
          <SheetDescription className="text-[15px] font-normal text-foreground">{work.title}, {work.year}</SheetDescription>
        </SheetHeader>
        <div className="relative z-10 mt-2 space-y-2 px-0 text-[15px]">
          <p className="text-lg font-medium">{work.price}</p>
          <p className="ui-control opacity-70">{work.medium} · {work.size}</p>
          <p className="text-sm font-normal text-muted-foreground">Shipping worldwide, insured, quoted separately. Certificate of authenticity included.</p>
        </div>
        <div className="relative z-10 mt-6 flex flex-col items-stretch gap-3">
          {work.paymentLink ? (
            <Button asChild variant="default" className="purchase-action purchase-primary"><a href={work.paymentLink} target="_blank" rel="noreferrer">Buy now</a></Button>
          ) : (
            <Button disabled variant="default" className="purchase-action purchase-primary" title="Payment link not set up yet">Buy now · coming soon</Button>
          )}
          <Button variant="secondary" onClick={() => setAsking((a) => !a)} aria-expanded={asking} className="purchase-action purchase-secondary">Ask about this work</Button>
        </div>
        {asking && (
          <form className="relative z-10 flex flex-col gap-4 py-4"
            onSubmit={async (e) => {
              e.preventDefault(); const f = new FormData(e.currentTarget); setSending(true);
              const ok = await sendForm("Artwork enquiry", { artwork: `${work.title} (${work.year})`, price: work.price, name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), message: String(f.get("message") ?? "") });
              setSending(false);
              if (ok) { setOpen(false); setAsking(false); toast(ok === "sent" ? "Thank you — I'll reply soon." : MAIL_OPENED); } else toast(SEND_FAILED);
            }}>
            {[["name", "Your name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
              <label key={n} className="flex flex-col gap-1">
                <span className="ui-control opacity-70">{l}</span>
                <input required name={n} type={t} className="border-b border-[color:var(--ruling)] bg-transparent py-2 text-[15px] outline-none focus:border-[color:var(--action-ink)]" />
              </label>
            ))}
            <label className="flex flex-col gap-1">
              <span className="ui-control opacity-70">Question</span>
              <textarea name="message" rows={3} className="rounded-[3px] border border-[color:var(--ruling)] bg-transparent p-2 text-[15px] focus:outline-[color:var(--action-ink)]" />
            </label>
            <Button type="submit" variant="lettering" disabled={sending} className="ui-button self-start">{sending ? "Sending…" : "Send"}</Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
