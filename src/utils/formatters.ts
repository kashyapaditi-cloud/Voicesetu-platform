export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  }
  return num.toLocaleString('en-IN');
}

export function formatCurrency(num: number, unit: 'Cr' | 'L' | 'Rs' = 'Cr'): string {
  const symbols = { Cr: 'Crore', L: 'Lakh', Rs: 'Rs' };
  return `${unit === 'Rs' ? ' ' : ' '}${num.toFixed(unit === 'Cr' ? 1 : 2)} ${symbols[unit]}`;
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(0)}%`;
}

export function getUrgencyColor(urgency: 'critical' | 'high' | 'medium' | 'low'): string {
  const colors = {
    critical: 'bg-critical-500',
    high: 'bg-accent-500',
    medium: 'bg-accent-600',
    low: 'bg-secondary-500',
  };
  return colors[urgency];
}

export function getUrgencyBgColor(urgency: 'critical' | 'high' | 'medium' | 'low'): string {
  const colors = {
    critical: 'bg-critical-50 border-critical-200',
    high: 'bg-accent-50 border-accent-200',
    medium: 'bg-accent-100 border-accent-300',
    low: 'bg-secondary-50 border-secondary-200',
  };
  return colors[urgency];
}

export function getUrgencyTextColor(urgency: 'critical' | 'high' | 'medium' | 'low'): string {
  const colors = {
    critical: 'text-critical-700',
    high: 'text-accent-700',
    medium: 'text-accent-800',
    low: 'text-secondary-700',
  };
  return colors[urgency];
}

export function getStatusColor(status: 'pending' | 'approved' | 'rejected' | 'under_review'): string {
  const colors = {
    pending: 'bg-surface-200 text-surface-700',
    approved: 'bg-secondary-100 text-secondary-700',
    rejected: 'bg-critical-100 text-critical-700',
    under_review: 'bg-primary-100 text-primary-700',
  };
  return colors[status];
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    education: 'GraduationCap',
    water_supply: 'Droplet',
    roads: 'Road',
    healthcare: 'HeartPulse',
    power: 'Zap',
    sanitation: 'Trash2',
    transport: 'Bus',
    street_lighting: 'Lightbulb',
  };
  return icons[category] || 'FileText';
}
