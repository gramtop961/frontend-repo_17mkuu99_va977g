import React from 'react';
import { User, Eye } from 'lucide-react';

const ProfileCard = ({ profile, onVisit }) => {
  return (
    <button
      onClick={() => onVisit(profile)}
      className="group rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow text-left w-full"
      aria-label={`Visit ${profile.name}'s profile`}
    >
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-900 dark:text-white truncate">{profile.name}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">@{profile.username}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-pink-600">
          <Eye size={18} />
          <span className="text-sm font-medium">Visit</span>
        </span>
      </div>
      {profile.bio && (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{profile.bio}</p>
      )}
    </button>
  );
};

const ProfileGrid = ({ profiles, onVisit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((p) => (
        <ProfileCard key={p.id} profile={p} onVisit={onVisit} />
      ))}
    </div>
  );
};

export default ProfileGrid;
