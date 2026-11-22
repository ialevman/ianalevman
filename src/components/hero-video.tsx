import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const video = { url: "/media/mirror-in-mirror.mp4" };

/** Full-bleed hero video layered over a blurred copy of itself. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const bg = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  // Keep the blurred copy in step with the sharp one, otherwise the see-through top layer ghosts.
  useEffect(() => {
    const v = ref.current, b = bg.current; if (!v || !b) return;
    const sync = () => { if (Math.abs(b.currentTime - v.currentTime) > 0.12) b.currentTime = v.currentTime; };
    v.addEventListener("timeupdate", sync); v.addEventListener("seeked", sync);
    return () => { v.removeEventListener("timeupdate", sync); v.removeEventListener("seeked", sync); };
  }, []);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { void v.play(); void bg.current?.play(); setPlaying(true); }
    else { v.pause(); bg.current?.pause(); setPlaying(false); }
  };
  return (
    <div data-hero-video className="relative aspect-video w-full overflow-hidden bg-foreground md:aspect-auto md:h-[85vh] md:min-h-[480px]">
      {/* Two copies of the same full-bleed video: a soft blurred one underneath, the sharp one on top, slightly see-through so the blur softens the pixels. */}
      <video ref={bg} src={video.url} autoPlay muted loop playsInline aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
      <video ref={ref} src={video.url} autoPlay muted loop playsInline
        className="fade-in absolute inset-0 h-full w-full object-cover opacity-[0.85]" />
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
