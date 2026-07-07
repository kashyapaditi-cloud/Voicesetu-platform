import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lightbulb, Play, ChevronRight, MapPin } from 'lucide-react';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { PriorityCard } from '../components/PriorityCard';
import { EvidencePanel } from '../components/EvidencePanel';
import { DecisionReplay } from '../components/DecisionReplay';
import { wards, priorities, decisionSteps } from '../data/mockData';
import type { Ward, Priority } from '../types';

export function DecisionStudio() {
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [highlightMode, setHighlightMode] = useState<'population' | 'complaints' | 'infrastructure' | 'invisible'>('infrastructure');
  const [showReplay, setShowReplay] = useState(false);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Decision Studio</h1>
              <p className="text-sm text-surface-500">Interactive investment prioritization workspace</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowReplay(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl shadow-soft hover:bg-primary-600 transition-colors"
        >
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">Decision Replay</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-12rem)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-4 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
        >
          <div className="p-4 border-b border-surface-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-surface-900">Constituency Map</h2>
                <p className="text-xs text-surface-500">Interactive ward analysis</p>
              </div>
              <span className="text-xs px-2 py-0.5 bg-surface-100 rounded-full text-surface-600">
                12 Wards
              </span>
            </div>
            <div className="flex gap-1.5">
              {[
                { mode: 'population', label: 'Population' },
                { mode: 'complaints', label: 'Complaints' },
                { mode: 'infrastructure', label: 'Gaps' },
                { mode: 'invisible', label: 'Invisible' },
              ].map((item) => (
                <button
                  key={item.mode}
                  onClick={() => setHighlightMode(item.mode as typeof highlightMode)}
                  className={`text-xs px-2 py-1 rounded-lg transition-all ${
                    highlightMode === item.mode
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[calc(100%-110px)]">
            <ConstituencyMap
              wards={wards}
              selectedWardId={selectedWard?.id || null}
              onWardSelect={(ward) => setSelectedWard(ward)}
              highlightMode={highlightMode}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-5 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-surface-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-surface-900">Priority Ranking</h2>
                <p className="text-xs text-surface-500">AI-optimized by impact score</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-500">Total Budget:</span>
                <span className="text-sm font-bold text-primary-600"> 48.5 Cr</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {priorities.map((priority, index) => (
              <PriorityCard
                key={priority.id}
                priority={priority}
                index={index}
                isSelected={selectedPriority?.id === priority.id}
                onSelect={() => setSelectedPriority(priority)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-3"
        >
          <EvidencePanel priority={selectedPriority} />
        </motion.div>
      </div>

      <DecisionReplay steps={decisionSteps} isActive={showReplay} onComplete={() => setShowReplay(false)} />
    </div>
  );
}
