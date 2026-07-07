import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Ward } from '../types';

interface ConstituencyMapProps {
  wards: Ward[];
  selectedWardId: number | null;
  onWardSelect: (ward: Ward) => void;
  highlightMode?: 'population' | 'complaints' | 'infrastructure' | 'invisible';
}

export function ConstituencyMap({
  wards,
  selectedWardId,
  onWardSelect,
  highlightMode = 'population',
}: ConstituencyMapProps) {
  const [hoveredWard, setHoveredWard] = useState<Ward | null>(null);

  const maxMetric = Math.max(
    ...wards.map((w) =>
      highlightMode === 'population'
        ? w.population
        : highlightMode === 'complaints'
        ? w.complaintVolume
        : highlightMode === 'infrastructure'
        ? 100 - w.infrastructureScore
        : w.invisibleCitizens
    )
  );

  const getWardColor = (ward: Ward) => {
    const value =
      highlightMode === 'population'
        ? ward.population
        : highlightMode === 'complaints'
        ? ward.complaintVolume
        : highlightMode === 'infrastructure'
        ? 100 - ward.infrastructureScore
        : ward.invisibleCitizens;

    const intensity = value / maxMetric;

    if (highlightMode === 'infrastructure') {
      if (intensity > 0.7) return 'bg-critical-500';
      if (intensity > 0.5) return 'bg-accent-500';
      if (intensity > 0.3) return 'bg-secondary-500';
      return 'bg-secondary-400';
    }

    if (highlightMode === 'invisible') {
      if (intensity > 0.7) return 'bg-critical-500';
      if (intensity > 0.5) return 'bg-accent-600';
      if (intensity > 0.3) return 'bg-accent-500';
      return 'bg-surface-300';
    }

    if (intensity > 0.7) return 'bg-primary-700';
    if (intensity > 0.5) return 'bg-primary-500';
    if (intensity > 0.3) return 'bg-primary-400';
    return 'bg-primary-300';
  };

  return (
    <div className="relative w-full h-full bg-surface-50 rounded-2xl overflow-hidden border border-surface-200">
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white rounded-xl shadow-soft p-3 border border-surface-200">
          <p className="text-xs font-medium text-surface-500 mb-2">View Mode</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <span className={`px-2 py-1 rounded-lg ${highlightMode === 'population' ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
              Population
            </span>
            <span className={`px-2 py-1 rounded-lg ${highlightMode === 'complaints' ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
              Complaints
            </span>
            <span className={`px-2 py-1 rounded-lg ${highlightMode === 'infrastructure' ? 'bg-critical-100 text-critical-700' : 'bg-surface-100 text-surface-500'}`}>
              Gaps
            </span>
            <span className={`px-2 py-1 rounded-lg ${highlightMode === 'invisible' ? 'bg-accent-100 text-accent-700' : 'bg-surface-100 text-surface-500'}`}>
              Invisible
            </span>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: '300px' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {wards.map((ward) => {
          const isSelected = selectedWardId === ward.id;
          const isHovered = hoveredWard?.id === ward.id;
          const size = 8 + (ward.population / 25000) * 4;

          return (
            <g key={ward.id}>
              <motion.circle
                cx={ward.coordinates.x}
                cy={ward.coordinates.y}
                r={size}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className={`${getWardColor(ward)} cursor-pointer`}
                style={{
                  filter: isSelected ? 'url(#glow)' : 'none',
                }}
                onMouseEnter={() => setHoveredWard(ward)}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => onWardSelect(ward)}
              />
              <motion.circle
                cx={ward.coordinates.x}
                cy={ward.coordinates.y}
                r={isSelected ? size + 3 : size + 1}
                fill="none"
                stroke={isSelected ? '#4f46e5' : 'rgba(255,255,255,0.3)'}
                strokeWidth={isSelected ? 2 : 1}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: isSelected ? [1, 1.2, 1] : 1,
                  opacity: isSelected ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isSelected ? Infinity : 0,
                  repeatType: 'loop',
                }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredWard(ward)}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => onWardSelect(ward)}
              />
              <text
                x={ward.coordinates.x}
                y={ward.coordinates.y}
                textAnchor="middle"
                dy="0.35em"
                className="text-xs font-medium fill-white pointer-events-none select-none"
                style={{ fontSize: '3px', fontWeight: 600 }}
              >
                {ward.id}
              </text>
            </g>
          );
        })}

        <line x1="10" y1="90" x2="90" y2="90" stroke="#e5e5e5" strokeWidth="0.5" />
        <line x1="10" y1="10" x2="10" y2="90" stroke="#e5e5e5" strokeWidth="0.5" />
        <text x="50" y="95" textAnchor="middle" style={{ fontSize: '3px' }} fill="#a3a3a3">
          Constituency Boundary
        </text>
      </svg>

      {hoveredWard && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-white rounded-xl shadow-soft-lg p-4 border border-surface-200 max-w-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-surface-900">{hoveredWard.name}</h4>
            <span className="text-xs text-surface-500">Ward {hoveredWard.id}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-surface-500">Population</p>
              <p className="font-semibold text-surface-900">{hoveredWard.population.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-surface-500">Infrastructure</p>
              <p className="font-semibold text-surface-900">{hoveredWard.infrastructureScore}%</p>
            </div>
            <div>
              <p className="text-surface-500">Complaints</p>
              <p className="font-semibold text-surface-900">{hoveredWard.complaintVolume}</p>
            </div>
            <div>
              <p className="text-surface-500">Invisible Citizens</p>
              <p className="font-semibold text-critical-600">{hoveredWard.invisibleCitizens}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
