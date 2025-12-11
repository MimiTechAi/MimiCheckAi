import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MagneticButton({ children, className = "", size = "default", ...props }) {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const sizeClasses = {
        default: "px-6 py-3",
        touch: "min-h-[48px] min-w-[48px] px-4 py-3 md:px-6",
        lg: "px-8 py-4",
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Limit magnetic effect to 20px
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;

            if (distance < maxDistance) {
                const strength = 0.3;
                setPosition({ x: x * strength, y: y * strength });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <motion.button
            ref={buttonRef}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(sizeClasses[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
}
