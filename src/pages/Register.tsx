import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Register: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: implement real auth with Lovable Cloud
    alert('Registration functionality requires backend setup. Coming soon!');
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-card rounded-xl border border-border p-8 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <h1 className="font-display text-2xl font-bold text-center mb-6">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => update('firstName', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => update('lastName', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+27 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Min 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Repeat password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
