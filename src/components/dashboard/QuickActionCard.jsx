import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

/**
 * QuickActionCard Component
 * 
 * Displays a quick action button with icon, title, and description.
 * Includes gradient background and hover animations.
 * 
 * @param {Object} props
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.title - Action title
 * @param {string} props.description - Action description
 * @param {string} props.href - Navigation path
 * @param {string} props.gradient - Tailwind gradient classes
 */
export function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  gradient,
  className,
}) {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'group relative overflow-hidden rounded-xl p-6 shadow-md transition-shadow hover:shadow-xl',
          'bg-gradient-to-br',
          gradient,
          className
        )}
      >
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm p-3 mb-4">
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-white/90 mb-4">
            {description}
          </p>
          
          {/* Arrow */}
          <div className="flex items-center gap-2 text-white font-medium">
            <span>Los geht&apos;s</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      </motion.div>
    </Link>
  );
}
