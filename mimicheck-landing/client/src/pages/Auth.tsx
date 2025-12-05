import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 AUTH START:', { email: formData.email, isLogin });
    
    try {
      if (isLogin) {
        console.log('🔑 Attempting login...');
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        console.log('🔑 Login response:', { data, error });
        if (error) throw error;
      } else {
        console.log('📝 Attempting signup...');
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { name: formData.name || formData.email } },
        });
        console.log('📝 Signup response:', { data, error });
        if (error) throw error;
      }

      console.log('🔍 Getting session...');
      const { data: sess, error: sessErr } = await supabase.auth.getSession();
      console.log('📦 Session:', { sess, sessErr });
      
      if (sessErr) throw sessErr;
      
      // Main App URL - hardcoded for production reliability
      const mainUrl = 'https://app.mimicheck.ai';
      console.log('🔧 Main App URL:', mainUrl);
      
      const access_token = sess.session?.access_token;
      const refresh_token = sess.session?.refresh_token as string | undefined;
      
      console.log('🎫 Tokens:', { 
        hasAccess: !!access_token, 
        hasRefresh: !!refresh_token,
        accessLength: access_token?.length,
        refreshLength: refresh_token?.length
      });
      
      if (!access_token || !refresh_token) {
        console.log('⚠️ Keine Session - versuche erneute Anmeldung...');
        // Bei neuen Usern dauert es manchmal einen Moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Nochmal versuchen
        const { data: retrySession } = await supabase.auth.getSession();
        if (retrySession.session) {
          console.log('✅ Session nach Retry gefunden!');
          const access_token = retrySession.session.access_token;
          const refresh_token = retrySession.session.refresh_token;
          
          const emailParam = encodeURIComponent(formData.email);
          const nameParam = encodeURIComponent(formData.name || '');
          const qs = `access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refresh_token)}&email=${emailParam}&name=${nameParam}`;
          const redirectUrl = `${mainUrl}/auth-bridge?${qs}`;
          
          console.log('🚀 Redirecting after retry...');
          window.location.href = redirectUrl;
          return;
        }
        
        throw new Error('Session konnte nicht erstellt werden. Bitte erneut versuchen.');
      }

      console.log('🚀 Redirect URL:', mainUrl);
      
      toast.success(isLogin ? 'Anmeldung erfolgreich!' : 'Registrierung erfolgreich!', {
        description: 'Weiterleitung …'
      });
      
      const emailParam = encodeURIComponent(formData.email);
      const nameParam = encodeURIComponent(formData.name || '');
      const qs = `access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refresh_token)}&email=${emailParam}&name=${nameParam}`;
      const redirectUrl = `${mainUrl}/auth-bridge?${qs}`;
      
      console.log('🔗 Full redirect URL:', redirectUrl.substring(0, 100) + '...');
      console.log('🏃 Redirecting NOW!');
      
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error('❌ Auth error:', err);
      toast.error('Auth fehlgeschlagen', { description: err?.message || String(err) });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to home */}
        <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </a>

        {/* Auth Card - Glassmorphism */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              {isLogin ? 'Willkommen zurück' : 'Konto erstellen'}
            </h1>
            <p className="text-slate-400">
              {isLogin
                ? 'Melde dich an, um fortzufahren'
                : 'Registriere dich kostenlos'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dein Name"
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="deine@email.de"
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-300">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  Passwort vergessen?
                </a>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/50 transition-all duration-300"
            >
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">
              {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              {isLogin ? 'Jetzt registrieren' : 'Anmelden'}
            </button>
          </div>

          {/* Legal Notice */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
            Mit der Registrierung akzeptierst du unsere{' '}
            <a href="/agb" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              AGB
            </a>{' '}
            und{' '}
            <a href="/datenschutz" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Datenschutzerklärung
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>DSGVO-konform</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>ISO zertifiziert</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>EU AI Act</span>
          </div>
        </div>
      </div>
    </div>
  );
}
