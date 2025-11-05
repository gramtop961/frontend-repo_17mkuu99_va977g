import React from 'react';
import { Play } from 'lucide-react';

const StoryItem = ({ story, onOpen }) => {
  return (
    <button
      onClick={() => onOpen(story)}
      className="flex flex-col items-center w-20 shrink-0 focus:outline-none group"
      aria-label={`Open story from ${story.user}`}
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-0.5" />
        <div className="relative rounded-full p-1 bg-white dark:bg-neutral-900">
          <img
            src={story.avatar}
            alt={story.user}
            className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-neutral-900"
          />
          <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white rounded-full p-1 shadow-md">
            <Play size={14} />
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 truncate w-full group-hover:text-neutral-900 dark:group-hover:text-white">
        {story.user}
      </span>
    </button>
  );
};

const StoryBar = ({ stories, onOpen }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-4 px-2 py-3">
        {stories.map((s) => (
          <StoryItem key={s.id} story={s} onOpen={onOpen} />)
        )}
      </div>
    </div>
  );
};

export default StoryBar;
