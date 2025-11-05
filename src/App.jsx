import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import StoryBar from './components/StoryBar';
import StoryViewer from './components/StoryViewer';
import ProfilesList from './components/ProfilesList';
import VisitHistory from './components/VisitHistory';

const sampleProfiles = [
  {
    id: '1',
    name: 'Ava Thompson',
    username: 'ava',
    avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Leo Park',
    username: 'leo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Maya Patel',
    username: 'maya',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Kai Nakamura',
    username: 'kai',
    avatar: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=300&auto=format&fit=crop',
  },
];

export default function App() {
  const stories = useMemo(() => [
    {
      id: 's1',
      user: sampleProfiles[0].name,
      avatar: sampleProfiles[0].avatar,
      media: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      profile: sampleProfiles[0],
    },
    {
      id: 's2',
      user: sampleProfiles[1].name,
      avatar: sampleProfiles[1].avatar,
      media: 'https://images.unsplash.com/photo-1520975922071-a112b4df3b30?q=80&w=1200&auto=format&fit=crop',
      profile: sampleProfiles[1],
    },
    {
      id: 's3',
      user: sampleProfiles[2].name,
      avatar: sampleProfiles[2].avatar,
      media: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
      profile: sampleProfiles[2],
    },
    {
      id: 's4',
      user: sampleProfiles[3].name,
      avatar: sampleProfiles[3].avatar,
      media: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      profile: sampleProfiles[3],
    },
  ], []);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visits, setVisits] = useState([]);

  const openStory = (story) => {
    const index = stories.findIndex((s) => s.id === story.id);
    setCurrentIndex(index === -1 ? 0 : index);
    setViewerOpen(true);
    // Log visit
    logVisit(story.profile);
  };

  const onNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    logVisit(stories[(currentIndex + 1) % stories.length].profile);
  };

  const onPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    const idx = (currentIndex - 1 + stories.length) % stories.length;
    logVisit(stories[idx].profile);
  };

  const visitProfile = (profile) => {
    logVisit(profile);
  };

  const logVisit = (profile) => {
    setVisits((v) => [
      { id: profile.id, name: profile.name, username: profile.username, avatar: profile.avatar, visitedAt: new Date().toISOString() },
      ...v,
    ]);
  };

  const clearVisits = () => setVisits([]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Hero />

      <main className="relative -mt-8 md:-mt-10 z-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Stories */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="px-4 pt-4 text-sm text-white/70">Stories</div>
              <StoryBar stories={stories} onOpen={openStory} />
            </div>

            {/* Profiles */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="mb-3 font-medium text-white">Suggested profiles</div>
              <ProfilesList profiles={sampleProfiles} onVisit={visitProfile} />
            </div>
          </div>

          {/* History */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <VisitHistory visits={visits} onClear={clearVisits} />
            </div>
          </div>
        </div>
      </main>

      <StoryViewer
        open={viewerOpen}
        story={stories[currentIndex]}
        onClose={() => setViewerOpen(false)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}
