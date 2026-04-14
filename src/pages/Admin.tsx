import React, { useState, useRef } from 'react';
import { Lock, Truck, CheckCircle, Plus, Pencil, Trash2, X, Save, Upload, Image, ChevronDown, ChevronUp, Package, Clock, MapPin, Phone, User, Camera } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Category, categoryInfo, Product } from '@/data/products';

const ADMIN_PASSWORD = 'giftbox2024';

type OrderStage = 'confirmed' | 'processing' | 'out-for-delivery' | 'delivered';
const ORDER_STAGES: { key: OrderStage; label: string; icon: React.ReactNode }[] = [
  { key: 'confirmed', label: 'Order Confirmed', icon: <CheckCircle size={16} /> },
  { key: 'processing', label: 'Packing & Processing', icon: <Package size={16} /> },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: <Truck size={16} /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircle size={16} /> },
];

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
  status: OrderStage;
  date: string;
  expectedDelivery: string;
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
  };
  deliveryTo: 'self' | 'other';
  proofPhoto?: string;
}

const mockOrders: AdminOrder[] = [
  {
    id: 'ORD-001', customer: 'Thabo M.', email: 'thabo@email.com', phone: '+27 82 345 6789',
    items: ['Chocolate Indulgence Box', 'Tea Lover\'s Hamper'], total: 940, status: 'confirmed',
    date: '2026-04-12', expectedDelivery: '2026-04-15',
    deliveryAddress: { name: 'Thabo Mokoena', street: '12 Nelson Mandela Drive', city: 'Johannesburg', postalCode: '2001' },
    deliveryTo: 'self',
  },
  {
    id: 'ORD-002', customer: 'Naledi K.', email: 'naledi@email.com', phone: '+27 71 234 5678',
    items: ['Golden Elegance Set'], total: 950, status: 'delivered',
    date: '2026-04-10', expectedDelivery: '2026-04-13',
    deliveryAddress: { name: 'Sipho Khumalo', street: '45 Church Street', city: 'Pretoria', postalCode: '0002' },
    deliveryTo: 'other',
  },
  {
    id: 'ORD-003', customer: 'James R.', email: 'james@email.com', phone: '+27 63 987 6543',
    items: ['Savory Snack Crate', 'Exam Survival Kit'], total: 840, status: 'processing',
    date: '2026-04-13', expectedDelivery: '2026-04-16',
    deliveryAddress: { name: 'James Roux', street: '8 Long Street', city: 'Cape Town', postalCode: '8001' },
    deliveryTo: 'self',
  },
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // Product form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const advanceOrderStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const currentIdx = ORDER_STAGES.findIndex(s => s.key === o.status);
      if (currentIdx < ORDER_STAGES.length - 1) {
        return { ...o, status: ORDER_STAGES[currentIdx + 1].key };
      }
      return o;
    }));
  };

  const revertOrderStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const currentIdx = ORDER_STAGES.findIndex(s => s.key === o.status);
      if (currentIdx > 0) {
        return { ...o, status: ORDER_STAGES[currentIdx - 1].key };
      }
      return o;
    }));
  };

  const handleProofUpload = (orderId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, proofPhoto: result } : o));
    };
    reader.readAsDataURL(file);
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setImagePreview(null);
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
    setImagePreview(product.image);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setForm(prev => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
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
    setImagePreview(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const updateField = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  const getStageIndex = (status: OrderStage) => ORDER_STAGES.findIndex(s => s.key === status);

  const getStatusColor = (status: OrderStage) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500/10 text-blue-500';
      case 'processing': return 'bg-gold/10 text-gold';
      case 'out-for-delivery': return 'bg-orange-500/10 text-orange-500';
      case 'delivered': return 'bg-accent/10 text-accent';
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-8 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock size={20} className="text-emerald-400" />
            <h1 className="font-display text-xl font-bold text-white">Admin Access</h1>
          </div>
          <p className="text-center text-slate-400 text-sm mb-6">GiftBox Management Panel</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-emerald-500 text-white font-semibold py-2.5 rounded-full hover:bg-emerald-600 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Package size={16} className="text-emerald-400" />
            </div>
            <h1 className="font-display text-lg font-semibold text-white">GiftBox <span className="text-emerald-400">Admin</span></h1>
          </div>
          <button onClick={() => setAuthenticated(false)} className="text-sm text-slate-400 hover:text-white transition-colors">
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

        {/* ======== ORDERS TAB ======== */}
        {tab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold mb-4">Recent Orders</h2>
            {orders.map(order => {
              const isExpanded = expandedOrder === order.id;
              const stageIdx = getStageIndex(order.status);

              return (
                <div key={order.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  {/* Order header — click to expand */}
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full p-5 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer} — {order.date}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.items.join(', ')}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {ORDER_STAGES[stageIdx].icon}
                          {ORDER_STAGES[stageIdx].label}
                        </span>
                        <span className="font-display font-bold text-gold">R{order.total.toFixed(2)}</span>
                        {isExpanded ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-border p-5 space-y-6 animate-fade-in">
                      {/* Delivery Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <User size={14} className="text-gold" /> Customer Details
                          </h4>
                          <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
                            <p><span className="text-muted-foreground">Name:</span> {order.customer}</p>
                            <p className="flex items-center gap-1"><span className="text-muted-foreground">Email:</span> {order.email}</p>
                            <p className="flex items-center gap-1"><Phone size={12} className="text-muted-foreground" /> {order.phone}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {order.deliveryTo === 'self' ? '📦 Delivering to themselves' : '🎁 Gift for someone else'}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <MapPin size={14} className="text-gold" /> Delivery Address
                          </h4>
                          <div className="bg-secondary/30 rounded-lg p-4 space-y-1 text-sm">
                            <p className="font-medium">{order.deliveryAddress.name}</p>
                            <p className="text-muted-foreground">{order.deliveryAddress.street}</p>
                            <p className="text-muted-foreground">{order.deliveryAddress.city}, {order.deliveryAddress.postalCode}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={14} className="text-gold" />
                            <span className="text-muted-foreground">Expected: </span>
                            <span className="font-medium">{order.expectedDelivery}</span>
                          </div>
                        </div>
                      </div>

                      {/* 4-Stage Progress */}
                      <div>
                        <h4 className="font-semibold text-sm mb-4">Order Progress</h4>
                        <div className="flex items-center gap-1">
                          {ORDER_STAGES.map((stage, idx) => {
                            const isComplete = idx <= stageIdx;
                            const isCurrent = idx === stageIdx;
                            return (
                              <React.Fragment key={stage.key}>
                                <div className={`flex flex-col items-center gap-1.5 flex-1`}>
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    isComplete
                                      ? isCurrent ? 'bg-gold text-primary-foreground ring-2 ring-gold/30' : 'bg-gold/80 text-primary-foreground'
                                      : 'bg-secondary text-muted-foreground'
                                  }`}>
                                    {stage.icon}
                                  </div>
                                  <span className={`text-[10px] text-center leading-tight ${isCurrent ? 'font-semibold' : 'text-muted-foreground'}`}>
                                    {stage.label}
                                  </span>
                                </div>
                                {idx < ORDER_STAGES.length - 1 && (
                                  <div className={`h-0.5 flex-1 mt-[-20px] rounded ${idx < stageIdx ? 'bg-gold' : 'bg-secondary'}`} />
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      {/* Status controls */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => revertOrderStatus(order.id)}
                          disabled={stageIdx === 0}
                          className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ← Previous Stage
                        </button>
                        <button
                          onClick={() => advanceOrderStatus(order.id)}
                          disabled={stageIdx === ORDER_STAGES.length - 1}
                          className="px-4 py-2 rounded-full bg-gold text-primary-foreground text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Advance to Next Stage →
                        </button>
                      </div>

                      {/* Proof of delivery photo */}
                      <div>
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Camera size={14} className="text-gold" /> Proof of Delivery
                        </h4>
                        {order.proofPhoto ? (
                          <div className="space-y-2">
                            <img src={order.proofPhoto} alt="Delivery proof" className="w-full max-w-sm rounded-lg border border-border" />
                            <button
                              onClick={() => setOrders(prev => prev.map(o => o.id === order.id ? { ...o, proofPhoto: undefined } : o))}
                              className="text-xs text-destructive hover:underline"
                            >
                              Remove photo
                            </button>
                          </div>
                        ) : (
                          <div>
                            <input
                              ref={proofInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleProofUpload(order.id, file);
                              }}
                            />
                            <button
                              onClick={() => proofInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-gold text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Upload size={16} />
                              Upload delivery photo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ======== PRODUCTS TAB ======== */}
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
                    <button onClick={() => { setShowForm(false); setEditingId(null); setImagePreview(null); }} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Image</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {imagePreview ? (
                        <div className="relative group">
                          <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-border" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-2 bg-card rounded-full text-sm font-medium"
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={() => { setImagePreview(null); setForm(prev => ({ ...prev, image: '' })); }}
                              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-full text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-48 rounded-lg border-2 border-dashed border-border hover:border-gold flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Image size={32} />
                          <span className="text-sm font-medium">Click to upload image</span>
                          <span className="text-xs">Supports JPG, PNG, WEBP, GIF, SVG</span>
                        </button>
                      )}
                    </div>
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
                        onClick={() => { setShowForm(false); setEditingId(null); setImagePreview(null); }}
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
