import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const video = { url: "/media/mirror-in-mirror.mp4" };

/** Full-bleed hero video (the layered edit is baked into the file). */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { void v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };
  return (
    <div data-hero-video className="relative aspect-[1920/1164] w-full overflow-hidden bg-foreground md:aspect-auto md:h-[85vh] md:min-h-[480px]">
      <video ref={ref} src={video.url} autoPlay muted loop playsInline
        className="fade-in absolute inset-0 h-full w-full object-cover" />
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
