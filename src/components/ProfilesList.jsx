import React from 'react';
import { Eye } from 'lucide-react';

const ProfileCard = ({ profile, onVisit }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      <img src={profile.avatar} alt={profile.name} className="h-12 w-12 rounded-full object-cover" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">{profile.name}</div>
        <div className="text-xs text-neutral-500">@{profile.username}</div>
      </div>
      <button
        onClick={() => onVisit(profile)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
      >
        <Eye size={16} />
        View
      </button>
    </div>
  );
};

const ProfilesList = ({ profiles, onVisit }) => {
  return (
    <div className="space-y-3">
      {profiles.map((p) => (
        <ProfileCard key={p.id} profile={p} onVisit={onVisit} />
      ))}
    </div>
  );
};

export default ProfilesList;
