import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color: 'primary' | 'secondary' | 'accent' | 'critical';
  format?: 'number' | 'currency' | 'compact';
}

const colorVariants = {
  primary: 'from-primary-500 to-primary-600',
  secondary: 'from-secondary-500 to-secondary-600',
  accent: 'from-accent-500 to-accent-600',
  critical: 'from-critical-500 to-critical-600',
};

const iconBgVariants = {
  primary: 'bg-primary-100 text-primary-600',
  secondary: 'bg-secondary-100 text-secondary-600',
  accent: 'bg-accent-100 text-accent-600',
  critical: 'bg-critical-100 text-critical-600',
};

function AnimatedNumber({ value, format = 'number' }: { value: number; format?: 'number' | 'currency' | 'compact' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value]);

  const formatted = () => {
    if (format === 'compact') {
      if (displayValue >= 100000) {
        return (displayValue / 100000).toFixed(1) + 'L';
      }
      if (displayValue >= 1000) {
        return (displayValue / 1000).toFixed(1) + 'K';
      }
    }
    if (format === 'currency') {
      return displayValue.toLocaleString('en-IN');
    }
    return displayValue.toLocaleString('en-IN');
  };

  return <span>{formatted()}</span>;
}

export function StatCard({ title, value, unit, icon: Icon, trend, color, format = 'number' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-surface-200 p-5 shadow-soft hover:shadow-soft-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-surface-500 mb-1">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-surface-900 font-mono">
              <AnimatedNumber value={value} format={format} />
            </span>
            {unit && <span className="text-lg font-medium text-surface-600">{unit}</span>}
          </div>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.value >= 0 ? 'text-secondary-600' : 'text-critical-600'
                }`}
              >
                {trend.value >= 0 ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-xs text-surface-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBgVariants[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
