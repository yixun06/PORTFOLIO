import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Expand, Images } from 'lucide-react';
import JourneyLightbox, { type JourneyItem } from './JourneyLightbox';

type JourneyGalleryProps = {
  items: JourneyItem[];
};

export default function JourneyGallery({ items }: JourneyGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
  const suppressClick = useRef(false);
  const [selectedItem, setSelectedItem] = useState<JourneyItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || isPaused || selectedItem || items.length < 2) return;

    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      track.scrollLeft += elapsed * 0.018;

      const loopPoint = track.scrollWidth / 2;
      if (track.scrollLeft >= loopPoint) track.scrollLeft -= loopPoint;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, items.length, reduceMotion, selectedItem]);

  const closeLightbox = useCallback(() => setSelectedItem(null), []);
  const displayItems = items.length > 1 ? [...items, ...items] : items;

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
    track.setPointerCapture(event.pointerId);
    setIsPaused(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragState.current;
    if (!track || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) {
      drag.moved = true;
      suppressClick.current = true;
      track.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    dragState.current.pointerId = -1;
    setIsPaused(false);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  return (
    <section
      aria-labelledby="smart-pocket-journey-title"
      className="mt-8 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/40 py-7 sm:py-9"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="mb-6 flex flex-col gap-4 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-400">
            <Images size={14} />
            Project Journal
          </div>
          <h3 id="smart-pocket-journey-title" className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            The Journey Behind Smart Pocket.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            From months of research and refinement to a proud exhibition finish. More milestones will join this living project journal over time.
          </p>
        </div>
        <p className="text-xs font-medium text-slate-500">Drag or swipe to explore · Select to enlarge</p>
      </div>

      <div
        ref={trackRef}
        className="journey-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 sm:px-8"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {displayItems.map((item, index) => (
          <motion.button
            key={`${item.image}-${index}`}
            type="button"
            onClick={() => {
              if (!suppressClick.current) setSelectedItem(item);
            }}
            className="group relative h-[360px] w-[82vw] max-w-[520px] flex-none snap-center overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900 text-left shadow-xl shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:h-[430px] sm:w-[520px]"
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.2 }}
            aria-label={`Open photo: ${item.title}`}
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              style={{ objectPosition: item.objectPosition ?? 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 p-2 text-white/80 backdrop-blur-md transition group-hover:bg-amber-400 group-hover:text-slate-950">
              <Expand size={16} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                <span>{item.stage}</span>
                <span aria-hidden="true" className="text-white/40">/</span>
                <span className="text-white/70">{item.date}</span>
              </div>
              <h4 className="text-xl font-black text-white sm:text-2xl">{item.title}</h4>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <JourneyLightbox item={selectedItem} onClose={closeLightbox} />
    </section>
  );
}
