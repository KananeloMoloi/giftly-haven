import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';

type DeliveryTo = 'self' | 'other' | null;

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'delivery' | 'address' | 'confirm'>('delivery');
  const [deliveryTo, setDeliveryTo] = useState<DeliveryTo>(null);
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', postalCode: '' });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const updateAddress = (field: string, value: string) => setAddress(prev => ({ ...prev, [field]: value }));

  const handlePlaceOrder = () => {
    // TODO: connect to payment provider
    alert('Payment integration coming soon! Your order has been noted.');
    clearCart();
    navigate('/');
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

          {/* Step 1 — Delivery question */}
          {step === 'delivery' && (
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="font-display text-xl font-semibold mb-6">Who is this delivery for?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setDeliveryTo('self'); setStep('address'); }}
                  className="p-6 rounded-lg border-2 border-border hover:border-gold text-center transition-colors"
                >
                  <span className="text-3xl block mb-2">🙋</span>
                  <span className="font-semibold">Myself</span>
                </button>
                <button
                  onClick={() => { setDeliveryTo('other'); setStep('address'); }}
                  className="p-6 rounded-lg border-2 border-border hover:border-gold text-center transition-colors"
                >
                  <span className="text-3xl block mb-2">🎁</span>
                  <span className="font-semibold">Someone Else</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Address */}
          {step === 'address' && (
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="font-display text-xl font-semibold mb-6">
                {deliveryTo === 'self' ? 'Your Delivery Details' : 'Recipient Details'}
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep('confirm'); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{deliveryTo === 'self' ? 'Your Name' : 'Recipient Name'}</label>
                  <input type="text" value={address.name} onChange={e => updateAddress('name', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input type="tel" value={address.phone} onChange={e => updateAddress('phone', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+27 ..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <input type="text" value={address.street} onChange={e => updateAddress('street', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" value={address.city} onChange={e => updateAddress('city', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input type="text" value={address.postalCode} onChange={e => updateAddress('postalCode', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep('delivery')} className="px-6 py-2.5 rounded-full border border-border font-medium hover:border-gold transition-colors">Back</button>
                  <button type="submit" className="flex-1 bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors">Continue</button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3 — Confirm & Pay */}
          {step === 'confirm' && (
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span>{product.name} × {quantity}</span>
                    <span className="font-medium">R{(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between font-display text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold">R{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-sm">
                <p className="font-medium mb-1">Delivering to:</p>
                <p className="text-muted-foreground">{address.name}, {address.street}, {address.city} {address.postalCode}</p>
                <p className="text-muted-foreground">{address.phone}</p>
                <p className="text-gold mt-2 font-medium">Expected delivery: 1–3 business days</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('address')} className="px-6 py-2.5 rounded-full border border-border font-medium hover:border-gold transition-colors">Back</button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors">
                  Pay with Card 💳
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
