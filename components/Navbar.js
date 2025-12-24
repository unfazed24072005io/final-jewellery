'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  FiShoppingBag, 
  FiUser, 
  FiSearch, 
  FiMenu, 
  FiX,
  FiShoppingCart,
  FiChevronDown
} from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/products',
      submenu: [
        { name: 'All Products', href: '/products' },
        { name: 'Rings', href: '/products?category=rings' },
        { name: 'Necklaces', href: '/products?category=necklaces' },
        { name: 'Earrings', href: '/products?category=earrings' },
        { name: 'Bracelets', href: '/products?category=bracelets' },
      ]
    },
    { 
      name: 'Collections', 
      href: '/collections',
      submenu: [
        { name: 'All Collections', href: '/collections' },
        { name: 'Bridal Collection', href: '/collections/bridal' },
        { name: 'Signature Collection', href: '/collections/signature' },
        { name: 'Limited Edition', href: '/collections/limited' },
      ]
    },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin', admin: true },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold">
            <span className="text-gold">LUXURY</span>
            <span className="text-charcoal-900">JEWELS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="flex items-center text-gray-700 hover:text-gold transition-colors duration-300 font-medium"
                    >
                      {link.name}
                      <FiChevronDown className="ml-1" size={16} />
                    </button>
                    <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gold/10 hover:text-gold border-b border-gray-50 last:border-b-0 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              
              if (link.admin) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-gold transition-colors duration-300 font-medium border border-gold px-4 py-2 hover:bg-gold hover:text-white"
                  >
                    {link.name}
                  </Link>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? 'text-gold after:w-full' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-gold transition-colors">
              <FiSearch size={20} />
            </button>
            <button className="text-gray-700 hover:text-gold transition-colors">
              <FiUser size={20} />
            </button>
            <button className="text-gray-700 hover:text-gold transition-colors relative">
              <FiShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-2 ${isActive(link.href) ? 'text-gold bg-gold/10' : 'text-gray-700 hover:text-gold'} transition-colors border-b border-gray-50`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-2 px-2 text-sm text-gray-600 hover:text-gold transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <button className="text-gray-700 hover:text-gold">
                  <FiSearch size={20} />
                </button>
                <button className="text-gray-700 hover:text-gold">
                  <FiUser size={20} />
                </button>
                <button className="text-gray-700 hover:text-gold relative">
                  <FiShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}