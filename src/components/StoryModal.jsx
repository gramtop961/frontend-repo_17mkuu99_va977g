import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const StoryModal = ({ story, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Close story"
        >
          <X size={18} />
        </button>
        <img src={story.media} alt={story.user} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-center gap-3">
            <img src={story.avatar} alt={story.user} className="h-8 w-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold">{story.user}</p>
              <p className="text-xs text-white/80">{story.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
