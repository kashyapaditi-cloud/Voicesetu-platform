import { motion } from 'framer-motion';
import { GraduationCap, Droplet, Route, HeartPulse, Zap, Trash2, MapPin, Users, TrendingUp, Clock } from 'lucide-react';
import type { Priority } from '../types';
import { formatNumber, getUrgencyColor, getUrgencyTextColor } from '../utils/formatters';

interface PriorityCardProps {
  priority: Priority;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  showEvidence?: boolean;
}

const categoryIcons: Record<string, typeof GraduationCap> = {
  education: GraduationCap,
  water_supply: Droplet,
  roads: Route,
  healthcare: HeartPulse,
  power: Zap,
  sanitation: Trash2,
};

export function PriorityCard({ priority, index, isSelected, onSelect, showEvidence = false }: PriorityCardProps) {
  const CategoryIcon = categoryIcons[priority.category] || GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      onClick={onSelect}
      className={`relative bg-white rounded-2xl border transition-all cursor-pointer priority-glow ${
        isSelected
          ? 'border-primary-300 shadow-soft-lg ring-1 ring-primary-100'
          : 'border-surface-200 shadow-soft hover:shadow-soft-md'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-primary-100' : 'bg-surface-100'
              }`}
            >
              <CategoryIcon className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-surface-600'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-surface-400">#{index + 1}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    priority.urgency === 'critical'
                      ? 'bg-critical-100 text-critical-700'
                      : priority.urgency === 'high'
                      ? 'bg-accent-100 text-accent-700'
                      : 'bg-secondary-100 text-secondary-700'
                  }`}
                >
                  {priority.urgency.toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-surface-900 mt-0.5">{priority.title}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-surface-500">AI Confidence</span>
              <span className="text-sm font-bold text-secondary-600">{priority.aiConfidence}%</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-surface-600 mb-4 line-clamp-2">{priority.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-50">
            <MapPin className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Ward</p>
              <p className="text-sm font-semibold text-surface-900">{priority.wardId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-50">
            <Users className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-xs text-surface-500">Citizens</p>
              <p className="text-sm font-semibold text-surface-900">{formatNumber(priority.citizensBenefited)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50">
            <TrendingUp className="w-4 h-4 text-primary-500" />
            <div>
              <p className="text-xs text-surface-500">Cost</p>
              <p className="text-sm font-semibold text-primary-700"> {priority.cost.toFixed(1)} Cr</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-50">
            <TrendingUp className="w-4 h-4 text-secondary-500" />
            <div>
              <p className="text-xs text-surface-500">Impact</p>
              <p className="text-sm font-semibold text-secondary-700">{priority.impactScore}/100</p>
            </div>
          </div>
        </div>

        <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${priority.impactScore}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className={`h-full rounded-full ${
              priority.urgency === 'critical'
                ? 'bg-gradient-to-r from-critical-500 to-critical-400'
                : priority.urgency === 'high'
                ? 'bg-gradient-to-r from-accent-500 to-accent-400'
                : 'bg-gradient-to-r from-secondary-500 to-secondary-400'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
