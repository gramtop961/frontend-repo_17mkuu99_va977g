import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-neutral-950">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Grain and gradient overlays (won't block interactions) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/30 to-neutral-950/80" />
        <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{
          backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
          backgroundSize: '300px 300px'
        }} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col items-start justify-end pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 text-white grid place-items-center">
              <Rocket size={18} />
            </div>
            <div>
              <h1 className="text-white font-semibold text-xl sm:text-2xl tracking-tight">
                Futuristic Stories • Smooth & Interactive
              </h1>
              <p className="text-white/70 text-xs sm:text-sm mt-1">
                Explore immersive stories and log profile visits in real-time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
