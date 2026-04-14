import React, { useState } from 'react';
import { Lock, Package, Truck, CheckCircle, Plus, Eye } from 'lucide-react';

const ADMIN_PASSWORD = 'giftbox2024';

interface MockOrder {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'awaiting' | 'delivered';
  date: string;
  expectedDelivery: string;
}

const mockOrders: MockOrder[] = [
  { id: 'ORD-001', customer: 'Thabo M.', items: ['Chocolate Indulgence Box', 'Tea Lover\'s Hamper'], total: 940, status: 'awaiting', date: '2026-04-12', expectedDelivery: '2026-04-15' },
  { id: 'ORD-002', customer: 'Naledi K.', items: ['Golden Elegance Set'], total: 950, status: 'delivered', date: '2026-04-10', expectedDelivery: '2026-04-13' },
  { id: 'ORD-003', customer: 'James R.', items: ['Savory Snack Crate', 'Exam Survival Kit'], total: 840, status: 'awaiting', date: '2026-04-13', expectedDelivery: '2026-04-16' },
];

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState(mockOrders);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const toggleOrderStatus = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'awaiting' ? 'delivered' : 'awaiting' } : o));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-card rounded-xl border border-border p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock size={20} className="text-gold" />
            <h1 className="font-display text-xl font-bold">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-charcoal text-nav py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-lg font-semibold text-gold">GiftBox Admin</h1>
          <button onClick={() => setAuthenticated(false)} className="text-sm text-nav opacity-70 hover:opacity-100 transition-opacity">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('orders')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${tab === 'orders' ? 'bg-gold text-primary-foreground' : 'bg-card border border-border hover:border-gold/40'}`}
          >
            Orders
          </button>
          <button
            onClick={() => setTab('products')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${tab === 'products' ? 'bg-gold text-primary-foreground' : 'bg-card border border-border hover:border-gold/40'}`}
          >
            Products
          </button>
        </div>

        {tab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold mb-4">Recent Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer} — {order.date}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-accent/10 text-accent' : 'bg-gold/10 text-gold'
                  }`}>
                    {order.status === 'delivered' ? <CheckCircle size={12} /> : <Truck size={12} />}
                    {order.status === 'delivered' ? 'Delivered' : 'Awaiting Delivery'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {order.items.join(', ')}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display font-bold text-gold">R{order.total.toFixed(2)}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">Expected: {order.expectedDelivery}</span>
                    <button
                      onClick={() => toggleOrderStatus(order.id)}
                      className="px-3 py-1 rounded-full border border-border text-sm font-medium hover:border-gold hover:text-gold transition-colors"
                    >
                      {order.status === 'awaiting' ? 'Mark Delivered' : 'Mark Awaiting'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">Products</h2>
              <button className="inline-flex items-center gap-1 px-4 py-2 bg-gold text-primary-foreground rounded-full text-sm font-medium hover:bg-gold-dark transition-colors">
                <Plus size={16} />
                Add Product
              </button>
            </div>
            <p className="text-muted-foreground text-sm">
              Product management will be fully functional once Lovable Cloud is enabled with a database. For now, products are managed in code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
