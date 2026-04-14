import React, { useState } from 'react';
import { Lock, Package, Truck, CheckCircle, Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Category, categoryInfo, Product } from '@/data/products';

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

const emptyForm = {
  name: '',
  description: '',
  longDescription: '',
  price: '',
  category: 'sweet-gifts' as Category,
  image: '',
  contents: '',
  inStock: true,
};

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState(mockOrders);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Product form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      contents: product.contents.join(', '),
      inStock: product.inStock,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      description: form.description,
      longDescription: form.longDescription,
      price: parseFloat(form.price) || 0,
      category: form.category,
      image: form.image || `/images/${form.category}.jpg`,
      contents: form.contents.split(',').map(s => s.trim()).filter(Boolean),
      inStock: form.inStock,
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const updateField = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

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
            Products ({products.length})
          </button>
        </div>

        {/* Orders Tab */}
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

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Products</h2>
              <button
                onClick={openAddForm}
                className="inline-flex items-center gap-1 px-4 py-2 bg-gold text-primary-foreground rounded-full text-sm font-medium hover:bg-gold-dark transition-colors"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold">
                      {editingId ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => updateField('name', e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. Chocolate Indulgence Box"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category *</label>
                      <select
                        value={form.category}
                        onChange={e => updateField('category', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {categoryInfo.map(c => (
                          <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (R) *</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={e => updateField('price', e.target.value)}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="450"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Short Description *</label>
                      <input
                        type="text"
                        value={form.description}
                        onChange={e => updateField('description', e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="A brief description for the product card"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Description</label>
                      <textarea
                        value={form.longDescription}
                        onChange={e => updateField('longDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Detailed product description shown on the product page"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contents (comma-separated)</label>
                      <input
                        type="text"
                        value={form.contents}
                        onChange={e => updateField('contents', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Item 1, Item 2, Item 3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                      <input
                        type="text"
                        value={form.image}
                        onChange={e => updateField('image', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Leave empty to use category default image"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={form.inStock}
                        onChange={e => updateField('inStock', e.target.checked)}
                        className="w-4 h-4 rounded border-input accent-gold"
                      />
                      <label htmlFor="inStock" className="text-sm font-medium">In Stock</label>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => { setShowForm(false); setEditingId(null); }}
                        className="px-6 py-2.5 rounded-full border border-border font-medium hover:border-gold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors"
                      >
                        <Save size={16} />
                        {editingId ? 'Save Changes' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="bg-card rounded-lg border border-border p-4 flex gap-4 items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{product.name}</p>
                      {!product.inStock && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">Out of Stock</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-display font-bold text-gold text-sm">R{product.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                        {categoryInfo.find(c => c.id === product.category)?.emoji} {categoryInfo.find(c => c.id === product.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditForm(product)}
                      className="p-2 rounded-lg border border-border hover:border-gold hover:text-gold transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    {deleteConfirm === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-medium"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg border border-border hover:border-destructive hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
