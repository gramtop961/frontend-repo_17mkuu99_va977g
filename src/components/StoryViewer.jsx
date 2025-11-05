import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const DURATION = 5000; // 5s per story

const StoryViewer = ({ open, story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!open || !story) return;

    setProgress(0);
    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) {
        onNext();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [open, story, onNext]);

  if (!open || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl">
        {/* Progress */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center gap-3">
          <img src={story.avatar} alt={story.user} className="h-8 w-8 rounded-full border border-white/30" />
          <div className="text-white text-sm font-medium truncate">{story.user}</div>
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-full hover:bg-white/10 text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <img
          src={story.media}
          alt={`${story.user}'s story`}
          className="h-full w-full object-cover select-none"
          draggable={false}
        />

        {/* Nav zones */}
        <button
          onClick={onPrev}
          className="absolute inset-y-0 left-0 w-1/3 text-white/70 hover:text-white focus:outline-none"
          aria-label="Previous"
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full">
            <ChevronLeft />
          </div>
        </button>
        <button
          onClick={onNext}
          className="absolute inset-y-0 right-0 w-1/3 text-white/70 hover:text-white focus:outline-none"
          aria-label="Next"
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full">
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
