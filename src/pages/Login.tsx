import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import authBg from '@/assets/auth-bg.jpg';
import logo from '@/assets/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login functionality requires backend setup. Coming soon!');
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex">
        {/* Left — Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={authBg} alt="Gift boxes" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
            <img src={logo} alt="GiftBox" className="h-16 w-16 mb-6" />
            <h2 className="font-display text-4xl font-bold text-white mb-3">Welcome to <span className="text-gold">GiftBox</span></h2>
            <p className="text-white/70 max-w-sm">Premium curated gifts for every moment worth celebrating.</p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-charcoal relative">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
          <div className="w-full max-w-md px-8 relative z-10">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8 pt-20">
              <img src={logo} alt="GiftBox" className="h-10 w-10" />
              <span className="font-display text-2xl font-bold text-gold">GiftBox</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/50 mb-8">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-primary-foreground font-semibold py-3 rounded-full hover:bg-gold-dark transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-white/40 mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold hover:underline font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
