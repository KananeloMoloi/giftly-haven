import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement real auth with Lovable Cloud
    alert('Login functionality requires backend setup. Coming soon!');
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="bg-card rounded-xl border border-border p-8">
            <h1 className="font-display text-2xl font-bold text-center mb-6">Welcome Back</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
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
