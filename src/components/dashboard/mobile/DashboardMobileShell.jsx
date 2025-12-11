import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function DashboardMobileShell({ children }) {
  const { isMobile } = useBreakpoint();

  return (
    <div 
      className="w-full min-h-full"
      style={{
        paddingTop: isMobile ? 'max(16px, env(safe-area-inset-top))' : '0',
        paddingRight: isMobile ? 'max(16px, env(safe-area-inset-right))' : '0',
        paddingBottom: isMobile ? 'max(80px, calc(80px + env(safe-area-inset-bottom)))' : '0',
        paddingLeft: isMobile ? 'max(16px, env(safe-area-inset-left))' : '0',
      }}
    >
      <div className="space-y-5 md:space-y-8">
        {children}
      </div>
    </div>
  );
}
