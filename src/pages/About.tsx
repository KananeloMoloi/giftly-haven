import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Gift } from 'lucide-react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import aboutVideo from '@/assets/about-gifts-video.mp4.asset.json';

const About: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xwpkgjvl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
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

          {/* Form + Video Section */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-8">Get In Touch</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
                      <Gift className="text-gold" size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground max-w-xs">
                      Your message has been submitted successfully. The <span className="text-gold font-semibold">GiftBox</span> team will be in touch shortly.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="What is this about?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="Write your message, suggestion, or question here..." rows={5} required />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold-dark text-foreground font-semibold group relative overflow-hidden transition-all duration-300"
                    >
                      <Gift
                        size={18}
                        className="mr-2 transition-transform duration-300 group-hover:animate-[shake_0.5s_ease-in-out_infinite]"
                      />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>

              {/* Video */}
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <video
                  src={aboutVideo.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>
            </div>
          </section>

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
