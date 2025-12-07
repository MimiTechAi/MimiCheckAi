import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatCard Component
 * 
 * Displays a statistic with icon, label, value, and optional trend.
 * Includes hover animations and responsive design.
 * 
 * @param {Object} props
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.label - Stat label
 * @param {string|number} props.value - Stat value
 * @param {string} [props.trend] - Trend text (e.g., "+2 diese Woche")
 * @param {'up'|'down'|'neutral'} [props.trendDirection] - Trend direction
 * @param {'blue'|'emerald'|'teal'|'amber'} props.color - Color theme
 * @param {Function} [props.onClick] - Click handler
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendDirection = 'neutral',
  color = 'blue',
  onClick,
  className,
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  
  const iconColorClasses = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    teal: 'text-teal-600',
    amber: 'text-amber-600',
  };
  
  const TrendIcon = trendDirection === 'up' ? TrendingUp : 
                    trendDirection === 'down' ? TrendingDown : 
                    Minus;
  
  const trendColorClass = trendDirection === 'up' ? 'text-emerald-600' :
                          trendDirection === 'down' ? 'text-red-600' :
                          'text-muted-foreground';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Icon Badge */}
      <div className={cn(
        'inline-flex items-center justify-center rounded-lg p-3 mb-4',
        colorClasses[color]
      )}>
        <Icon className={cn('h-6 w-6', iconColorClasses[color])} />
      </div>
      
      {/* Label */}
      <p className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </p>
      
      {/* Value */}
      <h3 className="text-3xl font-bold text-foreground mb-2">
        {value}
      </h3>
      
      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1">
          <TrendIcon className={cn('h-4 w-4', trendColorClass)} />
          <span className={cn('text-sm font-medium', trendColorClass)}>
            {trend}
          </span>
        </div>
      )}
      
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl -z-10" />
    </motion.div>
  );
}
