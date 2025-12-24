'use client';

import { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter subscription:', email);
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white p-8">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h3 className="heading-3 text-white mb-4">Join Our Exclusive Circle</h3>
          <p className="text-gold-200 max-w-2xl mx-auto">
            Subscribe to our newsletter for first access to new collections, private events, and special offers.
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-green-900/30 border border-green-700/30 p-6 rounded-none text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/50 rounded-full mb-4">
              <FiCheck size={32} className="text-green-300" />
            </div>
            <h4 className="text-xl font-serif font-semibold mb-2">Welcome to Our Circle!</h4>
            <p className="text-green-200">
              Thank you for subscribing. You'll receive our next newsletter soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 text-white placeholder:text-gold-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary whitespace-nowrap"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            <p className="text-sm text-gold-200 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}