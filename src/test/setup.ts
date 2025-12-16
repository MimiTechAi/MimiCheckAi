import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

// Note: jest-axe will be imported in tests that need it
// to avoid loading issues

// Mock Canvas API (für DashboardAnimation etc.)
class MockCanvasRenderingContext2D {
  clearRect = vi.fn();
  fillRect = vi.fn();
  beginPath = vi.fn();
  moveTo = vi.fn();
  lineTo = vi.fn();
  stroke = vi.fn();
  fill = vi.fn();
  arc = vi.fn();
  createLinearGradient = vi.fn(() => ({
    addColorStop: vi.fn(),
  }));
  createRadialGradient = vi.fn(() => ({
    addColorStop: vi.fn(),
  }));
  fillStyle = '';
  strokeStyle = '';
  lineWidth = 1;
  globalAlpha = 1;
  shadowBlur = 0;
  shadowColor = '';
}

HTMLCanvasElement.prototype.getContext = vi.fn(
  () => new MockCanvasRenderingContext2D() as unknown as CanvasRenderingContext2D,
) as unknown as HTMLCanvasElement['getContext'];

const ensureDomCtor = (name: 'HTMLIFrameElement' | 'HTMLFrameElement') => {
  const w = window as unknown as Record<string, unknown>;
  const g = globalThis as unknown as Record<string, unknown>;

  if (typeof w[name] === 'function') return;
  if (typeof g[name] === 'function') {
    w[name] = g[name];
    return;
  }

  if (typeof (globalThis as unknown as { HTMLElement?: unknown }).HTMLElement !== 'function') return;

  const Base = (globalThis as unknown as { HTMLElement: typeof HTMLElement }).HTMLElement;
  const Ctor = class extends Base {};
  w[name] = Ctor;
  g[name] = Ctor;
};

ensureDomCtor('HTMLIFrameElement');
ensureDomCtor('HTMLFrameElement');

const ensurePerformanceNow = () => {
  const g = globalThis as unknown as Record<string, unknown>;
  const w = window as unknown as Record<string, unknown>;

  const fallbackNow = () => Date.now();

  const gp = g.performance as { now?: unknown } | undefined;
  const wp = w.performance as { now?: unknown } | undefined;

  if (!gp) {
    Object.defineProperty(globalThis, 'performance', {
      value: { now: fallbackNow },
      configurable: true,
      writable: true,
    });
  } else if (typeof gp.now !== 'function') {
    Object.defineProperty(gp, 'now', {
      value: fallbackNow,
      configurable: true,
      writable: true,
    });
  }

  const finalGp = (g.performance as { now?: unknown } | undefined) ?? undefined;

  if (!wp) {
    Object.defineProperty(window, 'performance', {
      value: finalGp ?? { now: fallbackNow },
      configurable: true,
      writable: true,
    });
  } else if (typeof wp.now !== 'function') {
    Object.defineProperty(wp, 'now', {
      value: (finalGp && typeof finalGp.now === 'function') ? (finalGp.now as () => number) : fallbackNow,
      configurable: true,
      writable: true,
    });
  }
};

ensurePerformanceNow();

try {
  const w = window as unknown as Record<string, unknown>;
  const g = globalThis as unknown as Record<string, unknown>;

  if (typeof g.navigator === 'undefined' && typeof w.navigator !== 'undefined') {
    Object.defineProperty(globalThis, 'navigator', {
      value: w.navigator,
      configurable: true,
      writable: true,
    });
  }

  if (typeof w.navigator === 'undefined' && typeof g.navigator !== 'undefined') {
    Object.defineProperty(window, 'navigator', {
      value: g.navigator,
      configurable: true,
      writable: true,
    });
  }

  const nav = (globalThis as unknown as { navigator?: unknown }).navigator as undefined | { clipboard?: unknown };

  if (nav && typeof nav.clipboard === 'undefined') {
    Object.defineProperty(nav, 'clipboard', {
      value: {
        readText: vi.fn(async () => ''),
        writeText: vi.fn(async () => undefined),
      },
      configurable: true,
    });
  }
} catch {
  // ignore
}

if (
  typeof (globalThis as unknown as { HTMLElement?: unknown }).HTMLElement === 'function' &&
  typeof (HTMLElement.prototype as unknown as { attachEvent?: unknown }).attachEvent !== 'function'
) {
  Object.defineProperty(HTMLElement.prototype, 'attachEvent', {
    value: vi.fn(),
    configurable: true,
  });
}

if (
  typeof (globalThis as unknown as { HTMLElement?: unknown }).HTMLElement === 'function' &&
  typeof (HTMLElement.prototype as unknown as { detachEvent?: unknown }).detachEvent !== 'function'
) {
  Object.defineProperty(HTMLElement.prototype, 'detachEvent', {
    value: vi.fn(),
    configurable: true,
  });
}

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof IntersectionObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => {
    return Object.prototype.hasOwnProperty.call(localStorageMock.store, key)
      ? localStorageMock.store[key]
      : null;
  }),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = String(value);
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true,
  writable: true,
});

try {
  if ((globalThis as unknown as { localStorage?: unknown }).localStorage !== window.localStorage) {
    Object.defineProperty(globalThis, 'localStorage', {
      value: window.localStorage,
      configurable: true,
      writable: true,
    });
  }
} catch {
  (globalThis as unknown as { localStorage: Storage }).localStorage = window.localStorage;
}

if (typeof window.location === 'undefined') {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost/',
      search: '',
      hash: '',
    },
    configurable: true,
    writable: true,
  });
}

if (typeof window.history === 'undefined') {
  Object.defineProperty(window, 'history', {
    value: {
      pushState: vi.fn(),
      replaceState: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      go: vi.fn(),
      state: null,
    },
    configurable: true,
    writable: true,
  });
} else if (typeof window.history.pushState !== 'function') {
  Object.defineProperty(window.history, 'pushState', {
    value: vi.fn(),
    configurable: true,
    writable: true,
  });
}

try {
  if ((globalThis as unknown as { history?: unknown }).history !== window.history) {
    Object.defineProperty(globalThis, 'history', {
      value: window.history,
      configurable: true,
      writable: true,
    });
  }
} catch {
  // ignore
}

if (typeof window.addEventListener !== 'function') {
  Object.defineProperty(window, 'addEventListener', {
    value: vi.fn(),
    configurable: true,
    writable: true,
  });
}

if (typeof window.removeEventListener !== 'function') {
  Object.defineProperty(window, 'removeEventListener', {
    value: vi.fn(),
    configurable: true,
    writable: true,
  });
}

if (typeof window.dispatchEvent !== 'function') {
  Object.defineProperty(window, 'dispatchEvent', {
    value: vi.fn(() => true),
    configurable: true,
    writable: true,
  });
}

afterEach(async () => {
  // Prevent timer mode leaking across tests (some tests may enable fake timers)
  vi.useRealTimers();
  vi.clearAllMocks();
});

// Mock für Import.meta.env
if (typeof import.meta.env === 'undefined') {
  (globalThis as unknown as { import: unknown }).import = {
    meta: {
      env: {
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'test-key',
        DEV: true,
        PROD: false,
      }
    }
  };
}

// Mock Supabase Client für Tests
vi.mock('@/api/supabaseClient', () => ({
  SUPABASE_STORAGE_KEY: 'sb-test-auth-token',
  deriveSupabaseStorageKey: vi.fn().mockReturnValue('sb-test-auth-token'),
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ 
        data: { user: null }, 
        error: null 
      }),
      getSession: vi.fn().mockResolvedValue({ 
        data: { session: null }, 
        error: null 
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ 
        data: { user: { id: 'test-user-id' } }, 
        error: null 
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }),
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: { path: 'test/path' }, error: null }),
        download: vi.fn().mockResolvedValue({ data: new Blob(), error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://test.url' } }),
      }),
    },
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },
  },
}));

// Mock mimitech/localClient
vi.mock('@/api/mimitechClient', () => ({
  mimitech: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ 
        data: { user: null }, 
        error: null 
      }),
      getSession: vi.fn().mockResolvedValue({ 
        data: { session: null }, 
        error: null 
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }),
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },
    entities: {
      Abrechnung: {},
      Anspruchspruefung: {},
      Foerderleistung: {},
      Nutzer: {},
      Dokument: {},
    },
  },
  localClient: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ user: { id: 'test-user-id' } }),
      signOut: vi.fn().mockResolvedValue({}),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  },
}))

vi.mock('framer-motion', async () => {
  const React = await import('react');

  type MotionProps = Record<string, unknown> & { children?: import('react').ReactNode };

  const createMotionComponent = (tag: string) => {
    const Comp = React.forwardRef<unknown, MotionProps>(({ children, ...rest }, ref) =>
      React.createElement(tag, { ...rest, ref }, children as import('react').ReactNode),
    );
    Comp.displayName = `motion.${tag}`;
    return Comp;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target, prop) => {
        const tag = typeof prop === 'string' ? prop : 'div';
        return createMotionComponent(tag);
      },
    },
  ) as unknown;

  return {
    motion,
    AnimatePresence: ({ children }: MotionProps) => React.createElement(React.Fragment, null, children),
    LayoutGroup: ({ children }: MotionProps) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => true,
    useAnimation: () => ({ start: async () => undefined, stop: () => undefined }),
  };
});

// Mock entities
vi.mock('@/api/entities', () => ({
  Abrechnung: {},
  Anspruchspruefung: {},
  Foerderleistung: {},
  Nutzer: {},
  Dokument: {},
  User: {
    me: vi.fn().mockResolvedValue(null),
  },
}))
