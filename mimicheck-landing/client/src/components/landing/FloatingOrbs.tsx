import { motion } from 'framer-motion';

/**
 * Floating Orbs - Ultra Modern
 * Inspired by: Linear, Notion, Superhuman, YC Startups 2024/2025
 * 
 * Creates beautiful floating gradient orbs with glassmorphism
 */
export default function FloatingOrbs() {
  const orbs = [
    {
      size: 'w-[500px] h-[500px]',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      blur: 'blur-[100px]',
      position: 'top-20 -left-40',
      animation: {
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      },
      duration: 25,
    },
    {
      size: 'w-[600px] h-[600px]',
      gradient: 'from-teal-500/15 via-cyan-500/10 to-transparent',
      blur: 'blur-[120px]',
      position: 'top-1/3 -right-60',
      animation: {
        x: [0, -80, 0],
        y: [0, 100, 0],
        scale: [1, 1.15, 1],
      },
      duration: 30,
    },
    {
      size: 'w-[450px] h-[450px]',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      blur: 'blur-[90px]',
      position: 'bottom-40 left-1/4',
      animation: {
        x: [0, 60, 0],
        y: [0, -80, 0],
        scale: [1, 1.25, 1],
      },
      duration: 28,
    },
    {
      size: 'w-[550px] h-[550px]',
      gradient: 'from-emerald-400/15 via-teal-400/8 to-transparent',
      blur: 'blur-[110px]',
      position: 'bottom-20 right-1/4',
      animation: {
        x: [0, -70, 0],
        y: [0, 60, 0],
        scale: [1, 1.18, 1],
      },
      duration: 32,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} rounded-full bg-gradient-radial ${orb.gradient} ${orb.blur}`}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 2,
          }}
        />
      ))}
    </div>
  );
}
