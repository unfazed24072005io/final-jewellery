import Link from 'next/link';
import { 
  FiFacebook, 
  FiInstagram, 
  FiTwitter, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiHeart
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Main Footer */}
      <div className="section-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                <span className="text-gold">LUXURY</span>
                <span className="text-white">JEWELS</span>
              </h3>
              <p className="text-gold-200 text-sm">
                Crafting timeless elegance since 1995. Our collections represent the pinnacle of jewellery craftsmanship.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-medium">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 border border-gold/30 text-gold hover:bg-gold hover:text-white flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
                  <FiInstagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 border border-gold/30 text-gold hover:bg-gold hover:text-white flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 border border-gold/30 text-gold hover:bg-gold hover:text-white flex items-center justify-center transition-colors duration-300" aria-label="Twitter">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 border border-gold/30 text-gold hover:bg-gold hover:text-white flex items-center justify-center transition-colors duration-300" aria-label="Pinterest">
                  <FiHeart size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Limited Edition', 'Sale'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/products?filter=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gold-200 hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-2 h-px bg-gold opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Customer Service</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-gold-200 hover:text-gold hover:translate-x-1 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-2 h-px bg-gold opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-serif font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="text-gold mt-1 flex-shrink-0" size={18} />
                  <span className="text-gold-200 text-sm">123 Luxury Avenue<br />Diamond District, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="text-gold flex-shrink-0" size={18} />
                  <span className="text-gold-200 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="text-gold flex-shrink-0" size={18} />
                  <span className="text-gold-200 text-sm">contact@luxuryjewels.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-serif font-semibold mb-4 text-white">Business Hours</h4>
              <div className="text-gold-200 text-sm space-y-1">
                <p>Monday - Friday: 10AM - 7PM</p>
                <p>Saturday: 11AM - 6PM</p>
                <p>Sunday: 12PM - 5PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-charcoal-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-none">
              <FiTruck className="text-gold" size={24} />
            </div>
            <div>
              <h5 className="font-medium text-white">Free Shipping</h5>
              <p className="text-gold-200 text-sm">On all orders over $500</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-none">
              <FiCreditCard className="text-gold" size={24} />
            </div>
            <div>
              <h5 className="font-medium text-white">Secure Payment</h5>
              <p className="text-gold-200 text-sm">100% secure transactions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-none">
              <FiShield className="text-gold" size={24} />
            </div>
            <div>
              <h5 className="font-medium text-white">Authenticity</h5>
              <p className="text-gold-200 text-sm">Certified luxury pieces</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-charcoal-950 py-6">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gold-300 text-sm">
                &copy; {currentYear} Luxury Jewels. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/privacy-policy" className="text-gold-300 hover:text-gold text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gold-300 hover:text-gold text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gold-300 hover:text-gold text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gold-300 text-sm">Accepted Payments:</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}