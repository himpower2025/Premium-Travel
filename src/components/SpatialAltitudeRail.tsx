import React, { useState, useEffect } from 'react';
import { Compass, Mountain, MapPin, Gauge } from 'lucide-react';

interface Waypoint {
  id: string;
  name: string;
  code: string;
  altitude: string;
  coords: string;
  sectionId: string;
}

const WAYPOINTS: Waypoint[] = [
  { id: 'ktm', name: 'Kathmandu Valley', code: 'KTM', altitude: '1,400m', coords: '27.7172° N · 85.3240° E', sectionId: 'hero' },
  { id: 'sky', name: 'Lukla Skyways & Aviation', code: 'LUA', altitude: '2,846m', coords: '27.6869° N · 86.7291° E', sectionId: 'aviation' },
  { id: 'pkr', name: 'Pokhara Annapurna Sanctuary', code: 'PKR', altitude: '822m', coords: '28.2096° N · 83.9856° E', sectionId: 'sanctuaries' },
  { id: 'mst', name: 'Mustang 4WD Mountain Pass', code: 'JOM', altitude: '3,840m', coords: '28.7842° N · 83.7239° E', sectionId: 'fleet' },
  { id: 'ebc', name: 'Himalayan Signature Combos', code: 'EBC', altitude: '5,364m', coords: '28.0044° N · 86.8567° E', sectionId: 'odysseys' },
];

export const SpatialAltitudeRail: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = ['hero', 'aviation', 'sanctuaries', 'fleet', 'odysseys', 'about'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveWaypoint(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentWp = WAYPOINTS.find((w) => w.sectionId === activeWaypoint) || WAYPOINTS[0];

  return (
    <nav
      aria-label="Spatial Navigation Rail"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-4 pointer-events-none select-none"
    >
      {/* Current Coordinate Telemetry Box */}
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-blue-200/80 px-4 py-3 rounded-2xl shadow-xl text-slate-800 font-mono text-[10px] space-y-1">
        <div className="flex items-center gap-1.5 text-blue-900 font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
          <span>Spatial Radar</span>
        </div>
        <div className="text-slate-900 font-bold flex items-center gap-1">
          <Mountain className="w-3.5 h-3.5 text-blue-700" />
          <span>ELEV: {currentWp.altitude}</span>
        </div>
        <div className="text-[9px] text-slate-500 truncate max-w-[130px]">
          {currentWp.coords}
        </div>
      </div>

      {/* Progress Track with interactive Waypoint Nodes */}
      <div className="pointer-events-auto relative pl-4 flex flex-col gap-5 border-l-2 border-slate-300/80 py-2">
        {/* Animated Active Indicator Pill */}
        <div
          className="absolute left-[-2px] w-[4px] bg-gradient-to-b from-blue-700 via-amber-500 to-blue-700 rounded-full transition-all duration-300 shadow-xs"
          style={{
            top: `${Math.min(Math.max(scrollProgress, 5), 90)}%`,
            height: '24px',
            transform: 'translateY(-50%)',
          }}
        />

        {WAYPOINTS.map((wp) => {
          const isActive = activeWaypoint === wp.sectionId;
          return (
            <button
              key={wp.id}
              onClick={() => scrollToSection(wp.sectionId)}
              className="group flex items-center gap-3 text-left transition-all cursor-pointer"
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500 border-white ring-4 ring-amber-400/30 scale-125'
                    : 'bg-white border-slate-400 group-hover:border-blue-600 group-hover:bg-blue-50'
                }`}
              />

              <div
                className={`font-mono transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-x-1' : 'opacity-60 group-hover:opacity-100 translate-x-0'
                }`}
              >
                <div className={`text-[11px] font-bold ${isActive ? 'text-blue-900 font-extrabold' : 'text-slate-700'}`}>
                  {wp.code} · {wp.altitude}
                </div>
                <div className="text-[9px] text-slate-500 tracking-tight whitespace-nowrap font-medium">
                  {wp.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
