import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-footer border-t border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left — Logo & About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GiftBox" className="h-10 w-10" />
              <span className="font-display text-2xl font-semibold text-gold">GiftBox</span>
            </Link>
            <p className="text-footer text-sm leading-relaxed opacity-70 max-w-sm">
              Premium curated gift boxes for every occasion. We handpick the finest products and wrap them with love so you don't have to.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-footer opacity-60 hover:text-gold hover:opacity-100 transition-all"><Instagram size={18} /></a>
              <a href="#" className="text-footer opacity-60 hover:text-gold hover:opacity-100 transition-all"><Facebook size={18} /></a>
              <a href="#" className="text-footer opacity-60 hover:text-gold hover:opacity-100 transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Right — Contact */}
          <div className="md:text-right">
            <h3 className="font-display text-lg font-semibold text-gold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a href="mailto:hello@giftbox.co.za" className="flex items-center gap-2 text-footer text-sm opacity-70 hover:text-gold hover:opacity-100 transition-all md:justify-end">
                <Mail size={16} />
                hello@giftbox.co.za
              </a>
              <a href="tel:+27123456789" className="flex items-center gap-2 text-footer text-sm opacity-70 hover:text-gold hover:opacity-100 transition-all md:justify-end">
                <Phone size={16} />
                +27 12 345 6789
              </a>
              <div className="flex items-center gap-2 text-footer text-sm opacity-70 md:justify-end">
                <MapPin size={16} />
                Johannesburg, South Africa
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 mt-10 pt-6 text-center">
          <p className="text-footer text-xs opacity-50">
            © {new Date().getFullYear()} GiftBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
