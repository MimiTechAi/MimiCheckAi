import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Floating particles for ambient effect
const FloatingParticle = ({ delay, duration, size, x, y }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)',
      filter: 'blur(1px)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 10, -10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Orbiting ring
const OrbitRing = ({ size, duration, delay, color, thickness = 2 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      border: `${thickness}px solid transparent`,
      borderTopColor: color,
      borderRightColor: `${color}50`,
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// Pulsing glow orb
const GlowOrb = ({ size, color, pulseDelay = 0 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(20px)',
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.4, 0.8, 0.4],
    }}
    transition={{
      duration: 2,
      delay: pulseDelay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Progress steps with icons
const loadingSteps = [
  { icon: '🔐', text: 'Sichere Verbindung wird hergestellt...' },
  { icon: '✨', text: 'Dein Profil wird vorbereitet...' },
  { icon: '🚀', text: 'Fast geschafft...' },
  { icon: '🎉', text: 'Willkommen!' },
];

export default function PremiumLoader({ 
  message = 'Einen Moment bitte...', 
  showProgress = true,
  variant: _variant = 'default' // 'default' | 'auth' | 'minimal'
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showProgress) return;
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 2 : 100));
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [showProgress]);

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 4 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map(p => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Main loader container */}
      <div className="relative flex flex-col items-center">
        {/* 3D Orbital Animation */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-8">
          {/* Background glow */}
          <GlowOrb size={160} color="rgba(16, 185, 129, 0.3)" pulseDelay={0} />
          <GlowOrb size={120} color="rgba(59, 130, 246, 0.2)" pulseDelay={0.5} />
          
          {/* Orbiting rings */}
          <OrbitRing size={140} duration={3} delay={0} color="#10b981" thickness={2} />
          <OrbitRing size={120} duration={2.5} delay={0.2} color="#3b82f6" thickness={1.5} />
          <OrbitRing size={100} duration={2} delay={0.4} color="#8b5cf6" thickness={1} />
          
          {/* Center logo/icon */}
          <motion.div
            className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.4), 0 0 80px rgba(16, 185, 129, 0.2)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotateY: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.span
              className="text-3xl sm:text-4xl"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {showProgress ? loadingSteps[currentStep].icon : '✨'}
            </motion.span>
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-emerald-400"
              style={{
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-emerald-400"
                style={{
                  transform: `translateX(${50 + i * 10}px)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Text content */}
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-white mb-2"
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {showProgress ? loadingSteps[currentStep].text : message}
          </motion.h2>
          
          {/* Progress bar */}
          {showProgress && (
            <div className="mt-6 w-64 sm:w-80">
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-slate-500 text-sm mt-2">{progress}%</p>
            </div>
          )}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-32 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Bottom branding */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="text-slate-400 text-sm font-medium">MiMiCheck</span>
      </motion.div>
    </div>
  );
}
