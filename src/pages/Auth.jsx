import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error('❌ Auth: Login error:', error);
          throw error;
        }



        if (data.session) {
          // Warte kurz damit Session persistiert wird
          await new Promise(resolve => setTimeout(resolve, 300));

          // Verifiziere Session
          const { data: verifyData } = await supabase.auth.getSession();


          // Verwende window.location für harten Redirect (zuverlässiger als navigate)
          window.location.href = '/profilseite';
        }
      } else {
        // Signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name || email }
          }
        });

        if (error) throw error;

        if (data.session) {
          localStorage.setItem('justLoggedIn', '1');
          navigate('/profilseite');
        } else {
          setError('Registrierung erfolgreich! Bitte bestätige deine E-Mail.');
        }
      }
    } catch (err) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md p-8">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Willkommen zurück' : 'Konto erstellen'}
            </h1>
            <p className="text-slate-400">
              {isLogin ? 'Melde dich an' : 'Registriere dich kostenlos'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Dein Name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="deine@email.de"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className={`p-3 rounded-lg ${error.includes('erfolgreich') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Bitte warten...' : (isLogin ? 'Anmelden' : 'Registrieren')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              {isLogin ? 'Noch kein Konto? Jetzt registrieren' : 'Bereits registriert? Anmelden'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="https://mimicheck.ai" className="text-slate-400 hover:text-slate-300 text-sm">
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
