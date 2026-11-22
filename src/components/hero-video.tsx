import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const video = { url: "/media/mirror-in-mirror.mp4" };

/** Full uncropped video in the centre; the sides are filled with a soft, blurred, enlarged copy of the same video. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const bg = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { void v.play(); void bg.current?.play(); setPlaying(true); }
    else { v.pause(); bg.current?.pause(); setPlaying(false); }
  };
  return (
    <div data-hero-video className="relative aspect-video w-full overflow-hidden bg-foreground md:aspect-auto md:h-[85vh] md:min-h-[480px]">
      <video ref={bg} src={video.url} autoPlay muted loop playsInline aria-hidden
        className="absolute inset-0 hidden h-full w-full scale-110 object-cover opacity-70 blur-2xl md:block" />
      <video ref={ref} src={video.url} autoPlay muted loop playsInline
        className="hero-main-video fade-in relative mx-auto h-full w-full object-cover md:w-auto md:object-contain" style={{ maskImage: "linear-gradient(to right, transparent, black 38%, black 62%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 38%, black 62%, transparent)" }} />
      <TooltipProvider delayDuration={200}>
        <div className="absolute bottom-4 left-4 flex gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="lettering" size="icon" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="hero-video-control">
                {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{playing ? "Pause" : "Play"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="lettering" size="icon" aria-label={muted ? "Sound on" : "Sound off"}
                onClick={() => { const v = ref.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); }} className="hero-video-control">
                {muted ? <VolumeX aria-hidden /> : <Volume2 aria-hidden />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{muted ? "Sound on" : "Sound off"}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
