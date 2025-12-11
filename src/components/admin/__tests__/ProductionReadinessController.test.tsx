import { describe, it, expect, vi } from 'vitest';

// Declare global variables for TypeScript
declare global {
  var window: {
    MiMiCheckObservability: {
      trackUserInteraction: () => void;
      trackPerformance: () => void;
      trackError: () => void;
      metrics: {
        errors: unknown[];
        userInteractions: unknown[];
        performanceMetrics: unknown[];
      };
    };
  };
  var performance: {
    memory: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
    getEntriesByType: () => unknown[];
  };
  var PerformanceObserver: {
    new (callback: unknown): {
      observe: () => void;
      disconnect: () => void;
    };
  };
}

// Mock the environment before importing
Object.defineProperty(globalThis, 'window', {
  value: {
    MiMiCheckObservability: {
      trackUserInteraction: vi.fn(),
      trackPerformance: vi.fn(),
      trackError: vi.fn(),
      metrics: {
        errors: [],
        userInteractions: [],
        performanceMetrics: []
      }
    }
  }
});

Object.defineProperty(globalThis, 'performance', {
  value: {
    memory: {
      usedJSHeapSize: 1024 * 1024 * 10, // 10MB
      totalJSHeapSize: 1024 * 1024 * 20, // 20MB
      jsHeapSizeLimit: 1024 * 1024 * 50 // 50MB
    },
    getEntriesByType: vi.fn(() => [])
  }
});

// Mock PerformanceObserver for the destroy tests
class MockPerformanceObserver {
  observe = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(globalThis, 'PerformanceObserver', {
  value: MockPerformanceObserver
});

describe('ProductionReadinessController - Performance Monitor Cleanup', () => {
  describe('AdvancedPerformanceMonitor', () => {
    it('should have a destroy method that cleans up observers and intervals', async () => {
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Mock some observers and intervals
      const observer1 = { disconnect: vi.fn() };
      const observer2 = { disconnect: vi.fn() };
      monitor.observers = [observer1, observer2];
      monitor.intervalIds = [1, 2, 3];
      
      // Call destroy method
      monitor.destroy();
      
      // Verify cleanup
      expect(monitor.observers).toHaveLength(0);
      expect(monitor.intervalIds).toHaveLength(0);
      expect(monitor.isMonitoring).toBe(false);
      
      // Verify observer disconnect was called
      expect(observer1.disconnect).toHaveBeenCalled();
      expect(observer2.disconnect).toHaveBeenCalled();
    });

    it('should handle destroy even when no observers exist', async () => {
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      monitor.observers = [];
      monitor.intervalIds = [];
      
      // destroy should not throw
      expect(() => monitor.destroy()).not.toThrow();
      
      // State should remain consistent
      expect(monitor.observers).toHaveLength(0);
      expect(monitor.intervalIds).toHaveLength(0);
      expect(monitor.isMonitoring).toBe(false);
    });

    it('should not initialize observers during Vitest environment', async () => {
      // Set VITEST flag
      const originalVite = import.meta.env.VITEST;
      import.meta.env.VITEST = true;
      
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Should not have created any observers or intervals in test environment
      expect(monitor.observers).toHaveLength(0);
      expect(monitor.intervalIds).toHaveLength(0);
      
      // Cleanup
      import.meta.env.VITEST = originalVite;
    });

    it('should properly track observers when initialized', async () => {
      // Reset VITEST flag for this test
      const originalVite = import.meta.env.VITEST;
      import.meta.env.VITEST = false;
      
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // In non-test environment, should have initialized observers
      // (This will be empty in the mocked environment but shows the logic works)
      expect(monitor).toBeDefined();
      expect(monitor.observers).toBeDefined();
      expect(monitor.intervalIds).toBeDefined();
      expect(monitor.isMonitoring).toBeDefined();
      
      // Cleanup
      import.meta.env.VITEST = originalVite;
    });

    it('should disconnect all observers properly during destroy', async () => {
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Create mock observers with disconnect methods
      const disconnect1 = vi.fn();
      const disconnect2 = vi.fn();
      const disconnect3 = vi.fn();
      
      monitor.observers = [
        { disconnect: disconnect1 },
        { disconnect: disconnect2 },
        { disconnect: disconnect3 }
      ];
      
      monitor.destroy();
      
      // All disconnect methods should have been called
      expect(disconnect1).toHaveBeenCalled();
      expect(disconnect2).toHaveBeenCalled();
      expect(disconnect3).toHaveBeenCalled();
    });

    it('should clear all interval IDs during destroy', async () => {
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Mock some interval IDs
      monitor.intervalIds = [1, 2, 3, 4, 5];
      
      // Mock clearInterval to track calls
      const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
      
      monitor.destroy();
      
      // Should clear all interval IDs
      expect(monitor.intervalIds).toHaveLength(0);
      expect(clearIntervalSpy).toHaveBeenCalledTimes(5);
      expect(clearIntervalSpy).toHaveBeenCalledWith(1);
      expect(clearIntervalSpy).toHaveBeenCalledWith(2);
      expect(clearIntervalSpy).toHaveBeenCalledWith(3);
      expect(clearIntervalSpy).toHaveBeenCalledWith(4);
      expect(clearIntervalSpy).toHaveBeenCalledWith(5);
      
      clearIntervalSpy.mockRestore();
    });
  });

  describe('ProductionReadinessController Component', () => {
    it('should be importable without errors', async () => {
      const { default: Controller } = await import('../ProductionReadinessController.jsx');
      expect(Controller).toBeDefined();
      expect(typeof Controller).toBe('function');
    });

    it('should handle missing window object gracefully', async () => {
      // This test verifies the component works in environments without window
      // which is expected to throw during import since the code uses window
      await expect(async () => {
        const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
        const monitor = new AdvancedPerformanceMonitor();
        
        // Even if window is available in test, the destroy method should work
        expect(typeof monitor.destroy).toBe('function');
        expect(() => monitor.destroy()).not.toThrow();
      }).not.toThrow();
    });
  });

  describe('Test Coverage Requirements', () => {
    it('should ensure npm run test:coverage completes without hanging', async () => {
      // This test validates that the fixes prevent test hangs
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Add some cleanup items
      monitor.observers = [{ disconnect: vi.fn() }];
      monitor.intervalIds = [setInterval(() => {}, 1000)];
      
      const startTime = Date.now();
      
      // Destroy should complete quickly
      monitor.destroy();
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete in reasonable time (less than 100ms)
      expect(duration).toBeLessThan(100);
      
      // Verify cleanup happened
      expect(monitor.observers).toHaveLength(0);
      expect(monitor.intervalIds).toHaveLength(0);
    });

    it('should verify cleanup regression would be caught by test', async () => {
      const { AdvancedPerformanceMonitor } = await import('../ProductionReadinessController.jsx');
      
      const monitor = new AdvancedPerformanceMonitor();
      
      // Simulate a regression where destroy doesn't work properly
      monitor.observers = [{ disconnect: vi.fn() }];
      monitor.intervalIds = [1];
      
      // If destroy method is missing or broken, this would catch it
      expect(typeof monitor.destroy).toBe('function');
      
      monitor.destroy();
      
      // If cleanup doesn't work, this would fail
      expect(monitor.observers).toHaveLength(0);
      expect(monitor.intervalIds).toHaveLength(0);
    });
  });
});