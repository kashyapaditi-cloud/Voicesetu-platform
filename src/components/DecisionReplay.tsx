import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Mic,
  Languages,
  Layers,
  Building2,
  Users,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Circle,
  Loader2,
} from 'lucide-react';
import type { DecisionStep } from '../types';

const stepIcons = [Mic, Languages, Layers, Building2, Users, IndianRupee, TrendingUp, CheckCircle2];

interface DecisionReplayProps {
  steps: DecisionStep[];
  isActive: boolean;
  onComplete: () => void;
}

export function DecisionReplay({ steps, isActive, onComplete }: DecisionReplayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStepIndex(-1);
      setCompletedSteps([]);
      setIsComplete(false);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];
    let currentDelay = 0;

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStepIndex(index);

        const processingTimeout = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, index]);

          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsComplete(true);
              onComplete();
            }, 500);
          }
        }, step.duration * 0.7);

        timeouts.push(processingTimeout);
      }, currentDelay);

      timeouts.push(timeout);
      currentDelay += step.duration;
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [isActive, steps, onComplete]);

  if (!isActive && !isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-surface-900/80 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-soft-xl w-full max-w-3xl mx-4 overflow-hidden"
      >
        <div className="p-8 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Decision Replay</h2>
              <p className="text-sm text-primary-200 mt-1">Step-by-step reasoning visualization</p>
            </div>
            {isComplete ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isProcessing = currentStepIndex === index && !completedSteps.includes(index);
              const isCompleted = completedSteps.includes(index);
              const isPending = index > currentStepIndex;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isPending ? 0.4 : 1,
                    x: 0,
                  }}
                  transition={{ delay: isActive ? 0 : index * 0.05 }}
                  className={`relative pl-16 ${index !== steps.length - 1 ? 'pb-8' : ''}`}
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-[27px] top-10 w-0.5 h-full transition-colors duration-300 ${
                        isCompleted ? 'bg-secondary-400' : 'bg-surface-200'
                      }`}
                    />
                  )}

                  <div
                    className={`absolute left-0 top-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-secondary-500 shadow-soft'
                        : isProcessing
                        ? 'bg-primary-500 shadow-soft'
                        : 'bg-surface-100'
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : isCompleted ? (
                      <Icon className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-surface-400" />
                    )}
                  </div>

                  <motion.div
                    animate={{
                      backgroundColor: isProcessing ? '#f5f3ff' : isCompleted ? '#f0fdf4' : '#fafafa',
                    }}
                    className="p-4 rounded-xl border transition-all"
                    style={{
                      borderColor: isCompleted ? '#a7f3d0' : isProcessing ? '#c7d2fe' : '#e5e5e5',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold ${
                          isCompleted || isProcessing ? 'text-surface-900' : 'text-surface-400'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {isCompleted && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs font-medium text-secondary-600 px-2 py-0.5 bg-secondary-100 rounded-full"
                        >
                          Completed
                        </motion.span>
                      )}
                    </div>
                    <p
                      className={`text-sm mb-3 ${
                        isCompleted || isProcessing ? 'text-surface-600' : 'text-surface-400'
                      }`}
                    >
                      {step.description}
                    </p>

                    <AnimatePresence>
                      {isCompleted && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          {step.outputs.map((output, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-xs"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                              <span className="text-surface-600">{output}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isProcessing && (
                      <div className="flex gap-1.5 mt-3">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="w-2 h-2 rounded-full bg-primary-400"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
