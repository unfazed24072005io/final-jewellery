'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiGrid, 
  FiFileText, 
  FiShoppingCart, 
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Products', href: '/admin/products', icon: FiPackage },
    { name: 'Collections', href: '/admin/collections', icon: FiGrid },
    { name: 'Blog Posts', href: '/admin/blogs', icon: FiFileText },
    { name: 'Orders', href: '/admin/orders', icon: FiShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: FiUsers },
    { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={`bg-charcoal-900 text-white h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-charcoal-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-xl font-serif font-bold text-gold">
                Admin Panel
              </h2>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-charcoal-800 rounded transition-colors duration-300"
            >
              {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>
          {!collapsed && (
            <p className="text-charcoal-400 text-sm mt-2">
              Luxury Jewellery Management
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center ${collapsed ? 'justify-center p-3' : 'p-3'} rounded-lg transition-all duration-300 ${
                      active
                        ? 'bg-gold text-white'
                        : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-white'
                    }`}
                    title={collapsed ? item.name : ''}
                  >
                    <Icon size={20} className={collapsed ? '' : 'mr-3'} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-charcoal-800">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-charcoal-400">admin@luxuryjewels.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="font-bold">A</span>
              </div>
            </div>
          )}
          
          <button className={`mt-4 flex items-center ${collapsed ? 'justify-center p-3' : 'p-3 w-full'} text-charcoal-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors duration-300`}>
            <FiLogOut size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </aside>
  );
}