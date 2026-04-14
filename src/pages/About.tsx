import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl font-bold mb-6">
            About <span className="text-gold">GiftBox</span>
          </h1>

          <div className="prose max-w-none mb-12">
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              GiftBox was born from a simple idea — finding the perfect gift shouldn't be stressful. We carefully curate premium pre-packed gift boxes for birthdays, celebrations, holidays, and every moment worth remembering.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each box is hand-assembled with love, featuring only the finest locally sourced and imported products. From rich Belgian chocolates to handcrafted jewellery, our collections are designed to delight and surprise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in Johannesburg, South Africa, we deliver nationwide and pride ourselves on speed, quality, and presentation. Because the way a gift arrives matters just as much as what's inside.
            </p>
          </div>

          {/* Socials */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Follow Us</h2>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter / X', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-card hover:border-gold/40 hover:text-gold transition-all text-sm font-medium"
                >
                  <s.icon size={18} />
                  {s.label}
                </a>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-6">Contact Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 p-5 rounded-lg border border-border bg-card">
                <Mail size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <a href="mailto:hello@giftbox.co.za" className="text-sm text-muted-foreground hover:text-gold transition-colors">hello@giftbox.co.za</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-lg border border-border bg-card">
                <Phone size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Phone</p>
                  <a href="tel:+27123456789" className="text-sm text-muted-foreground hover:text-gold transition-colors">+27 12 345 6789</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-lg border border-border bg-card">
                <MapPin size={20} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Location</p>
                  <p className="text-sm text-muted-foreground">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
