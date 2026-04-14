import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import authBg from '@/assets/auth-bg.jpg';
import logo from '@/assets/logo.png';

const Register: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Registration functionality requires backend setup. Coming soon!');
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors";

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex">
        {/* Left — Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={authBg} alt="Gift boxes" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
            <img src={logo} alt="GiftBox" className="h-16 w-16 mb-6" />
            <h2 className="font-display text-4xl font-bold text-white mb-3">Join <span className="text-gold">GiftBox</span></h2>
            <p className="text-white/70 max-w-sm">Create an account to start sending curated gifts to those you love.</p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-charcoal relative overflow-y-auto">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
          <div className="w-full max-w-md px-8 py-8 relative z-10">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8 pt-16">
              <img src={logo} alt="GiftBox" className="h-10 w-10" />
              <span className="font-display text-2xl font-bold text-gold">GiftBox</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/50 mb-8">Fill in your details to get started</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">First Name</label>
                  <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Last Name</label>
                  <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} required className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required className={inputClass} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} required className={inputClass} placeholder="+27 ..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required minLength={8} className={inputClass} placeholder="Min 8 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required className={inputClass} placeholder="Repeat password" />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-primary-foreground font-semibold py-3 rounded-full hover:bg-gold-dark transition-colors mt-2"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-white/40 mt-8">
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
