import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: 'y', secs: 31536000 },
    { label: 'mo', secs: 2592000 },
    { label: 'w', secs: 604800 },
    { label: 'd', secs: 86400 },
    { label: 'h', secs: 3600 },
    { label: 'm', secs: 60 },
  ];
  for (const i of intervals) {
    const v = Math.floor(seconds / i.secs);
    if (v >= 1) return `${v}${i.label}`;
  }
  return 'now';
}

const VisitHistory = ({ visits, onClear }) => {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-medium">
          <Clock size={18} />
          Profile visit history
        </div>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:opacity-90"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      {visits.length === 0 ? (
        <div className="p-6 text-sm text-neutral-500">No visits yet. Interact with profiles to build history.</div>
      ) : (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {visits.map((v) => (
            <li key={v.id + v.visitedAt} className="flex items-center gap-3 px-4 py-3">
              <img src={v.avatar} alt={v.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{v.name}</div>
                <div className="text-xs text-neutral-500">@{v.username}</div>
              </div>
              <div className="ml-auto text-xs text-neutral-500 tabular-nums">{timeAgo(new Date(v.visitedAt))} ago</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VisitHistory;
