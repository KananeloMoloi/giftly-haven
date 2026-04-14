import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <div className="bg-charcoal backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-gold/20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="GiftBox" className="h-8 w-8" />
          <span className="font-display text-lg font-semibold text-gold">GiftBox</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to) ? 'text-gold' : 'text-nav hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-nav hover:text-gold transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/login" className="hidden md:flex text-nav hover:text-gold transition-colors">
            <User size={20} />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-nav hover:text-gold">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-charcoal backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-gold/20">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                isActive(link.to) ? 'text-gold' : 'text-nav hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-nav hover:text-gold">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
