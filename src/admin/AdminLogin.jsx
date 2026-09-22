import React, { useState } from 'react';
import { Trees, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { apiLogin } from '../services/api';

export function AdminLogin({ onLoginSuccess, onBackToSite, initialError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialError || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await apiLogin(email, password);
      if (!res?.data?.token) {
        throw new Error(res?.message || 'Login failed');
      }
      localStorage.setItem('ssr_admin_token', res.data.token);
      localStorage.setItem('ssr_admin_user', JSON.stringify(res.data.user || { name: 'Resort Staff', email }));
      onLoginSuccess(res.data.user);
    } catch (err) {
      // No local fallback. Fabricating a token here is what produced a portal that looked
      // signed in while every request behind it 401'd — the failure has to surface instead.
      const isNetworkFailure = !err.message || err.message === 'Failed to fetch' || err.name === 'AbortError';
      setErrorMessage(
        isNetworkFailure
          ? 'Could not reach the server. Check your connection and try again.'
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E261C] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#F9F6F0]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#143628] border-2 border-[#C5A059] flex items-center justify-center shadow-lg">
            <Trees className="w-8 h-8 text-[#C5A059]" />
          </div>
        </div>
        <h2 className="text-center font-cinzel text-2xl font-bold tracking-wide text-white">
          Saranda Safari Resort
        </h2>
        <p className="mt-1 text-center text-xs text-[#DFCA95] uppercase tracking-wider font-semibold">
          Staff & Management Portal • Estd. 1998
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#143628] py-8 px-6 shadow-2xl rounded-xl border border-[#C5A059]/30 sm:px-10">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-rose-900/40 border border-rose-500/50 flex items-start gap-2.5 text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#DFCA95] mb-1">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#C5A059]/70 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@sarandasafariresort.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#0E261C] border border-[#C5A059]/40 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#DFCA95] mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#C5A059]/70 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#0E261C] border border-[#C5A059]/40 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#143628] bg-[#C5A059] hover:bg-[#B38F46] focus:outline-none transition-colors disabled:opacity-50 cursor-pointer font-serif tracking-wide"
            >
              {isLoading ? 'Verifying Access...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Guest Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
