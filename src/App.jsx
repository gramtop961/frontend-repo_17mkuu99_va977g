import React, { useMemo, useState } from 'react';
import StoryBar from './components/StoryBar';
import ProfileGrid from './components/ProfileGrid';
import VisitHistory from './components/VisitHistory';
import StoryModal from './components/StoryModal';

const sampleAvatars = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
];

const sampleMedia = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517817748490-58fdd2146f35?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop',
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const useMockData = () => {
  return useMemo(() => {
    const profiles = Array.from({ length: 9 }).map((_, i) => ({
      id: `p_${i}`,
      name: ['Alex', 'Jordan', 'Taylor', 'Sam', 'Chris', 'Morgan', 'Riley', 'Jamie', 'Cameron'][i % 9],
      username: ['alex', 'jordan', 'taylor', 'sam', 'chris', 'morgan', 'riley', 'jamie', 'cameron'][i % 9],
      avatar: randomItem(sampleAvatars),
      bio: 'Loving sunsets, coffee, and candid moments.'
    }));

    const stories = profiles.slice(0, 8).map((p, i) => ({
      id: `s_${i}`,
      user: p.name,
      avatar: p.avatar,
      media: randomItem(sampleMedia),
      caption: 'A day to remember ✨',
    }));

    return { profiles, stories };
  }, []);
};

export default function App() {
  const { profiles, stories } = useMockData();
  const [visits, setVisits] = useState([]);
  const [activeStory, setActiveStory] = useState(null);

  const handleVisit = (profile) => {
    setVisits((prev) => [
      { id: `${Date.now()}_${profile.id}`,
        name: profile.name,
        avatar: profile.avatar,
        time: new Date().toISOString()
      },
      ...prev,
    ]);
  };

  const clearHistory = () => setVisits([]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">InstaView</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-600 text-white">demo</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Stories + Visit History</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section>
          <StoryBar stories={stories} onOpen={setActiveStory} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Explore Profiles</h2>
            <ProfileGrid profiles={profiles} onVisit={handleVisit} />
          </div>
          <div className="lg:col-span-1">
            <VisitHistory visits={visits} clear={clearHistory} />
          </div>
        </section>
      </main>

      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </div>
  );
}
