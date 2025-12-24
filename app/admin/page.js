'use client';

import { 
  FiPackage, 
  FiGrid, 
  FiFileText, 
  FiShoppingCart, 
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    collections: 0,
    blogs: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        products: 142,
        collections: 8,
        blogs: 24,
        orders: 156,
        customers: 89,
        revenue: 245000
      });
      
      setRecentOrders([
        { id: 'ORD-001', customer: 'Sarah Johnson', amount: 4200, status: 'completed', date: '2024-03-15' },
        { id: 'ORD-002', customer: 'Michael Chen', amount: 1899, status: 'processing', date: '2024-03-14' },
        { id: 'ORD-003', customer: 'Emma Williams', amount: 6500, status: 'completed', date: '2024-03-14' },
        { id: 'ORD-004', customer: 'Robert Brown', amount: 3200, status: 'pending', date: '2024-03-13' },
        { id: 'ORD-005', customer: 'Lisa Anderson', amount: 1250, status: 'completed', date: '2024-03-13' },
      ]);
      
      setSalesData([
        { month: 'Jan', sales: 45000 },
        { month: 'Feb', sales: 52000 },
        { month: 'Mar', sales: 78000 },
        { month: 'Apr', sales: 65000 },
        { month: 'May', sales: 89000 },
        { month: 'Jun', sales: 95000 },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: FiPackage,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
      link: '/admin/products'
    },
    {
      title: 'Collections',
      value: stats.collections,
      icon: FiGrid,
      color: 'bg-purple-500',
      change: '+3',
      trend: 'up',
      link: '/admin/collections'
    },
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: FiFileText,
      color: 'bg-green-500',
      change: '+5',
      trend: 'up',
      link: '/admin/blogs'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: FiShoppingCart,
      color: 'bg-yellow-500',
      change: '+24%',
      trend: 'up',
      link: '/admin/orders'
    },
    {
      title: 'Customers',
      value: stats.customers,
      icon: FiUsers,
      color: 'bg-indigo-500',
      change: '+18%',
      trend: 'up',
      link: '/admin/customers'
    },
    {
      title: 'Revenue',
      value: `$${(stats.revenue / 1000).toFixed(0)}K`,
      icon: FiDollarSign,
      color: 'bg-gold',
      change: '+32%',
      trend: 'up',
      link: '/admin/analytics'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={index} 
              href={stat.link}
              className="admin-stat-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.title}</div>
            </Link>
          );
        })}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Revenue Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiCalendar size={16} />
              <span>Last 6 months</span>
            </div>
          </div>
          <div className="h-64">
            <div className="flex items-end h-48 space-x-4 mt-8">
              {salesData.map((data, index) => {
                const height = (data.sales / 100000) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-gold to-gold-dark rounded-t-lg transition-all hover:opacity-90"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                    <div className="text-sm font-medium mt-1">
                      ${(data.sales / 1000).toFixed(0)}K
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Orders</h3>
            <Link 
              href="/admin/orders" 
              className="text-gold hover:text-gold-dark text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="text-gold hover:text-gold-dark font-medium"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td>{order.customer}</td>
                    <td className="font-medium">{formatCurrency(order.amount)}</td>
                    <td>
                      <span className={`admin-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Top Products</h3>
            <FiTrendingUp className="text-green-500" size={20} />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Diamond Eternity Ring', sales: 42, revenue: 125800 },
              { name: 'Pearl Necklace', sales: 28, revenue: 53172 },
              { name: 'Gold Bracelet', sales: 24, revenue: 76800 },
              { name: 'Emerald Earrings', sales: 18, revenue: 44100 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiPackage className="text-gray-500" size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sales} sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </div>
                  <div className="text-sm text-green-600">+24%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Traffic Sources</h3>
            <FiActivity className="text-blue-500" size={20} />
          </div>
          <div className="space-y-4">
            {[
              { source: 'Direct', visits: 1245, percent: 45, color: 'bg-gold' },
              { source: 'Social Media', visits: 845, percent: 30, color: 'bg-blue-500' },
              { source: 'Search Engines', visits: 612, percent: 22, color: 'bg-green-500' },
              { source: 'Referrals', visits: 298, percent: 11, color: 'bg-purple-500' },
            ].map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm text-gray-500">{source.visits.toLocaleString()} visits</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${source.color}`}
                    style={{ width: `${source.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Actions</h3>
            <FiBarChart2 className="text-indigo-500" size={20} />
          </div>
          <div className="space-y-3">
            <Link 
              href="/admin/products/new"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <FiPackage className="text-gold" size={18} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Add New Product</div>
                  <div className="text-sm text-gray-500">Create a new product listing</div>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/admin/blogs/new"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <FiFileText className="text-blue-500" size={18} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Write Blog Post</div>
                  <div className="text-sm text-gray-500">Create new blog content</div>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/admin/analytics"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <FiTrendingUp className="text-green-500" size={18} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Detailed store analytics</div>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/admin/settings"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <FiActivity className="text-purple-500" size={18} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Settings</div>
                  <div className="text-sm text-gray-500">Configure store settings</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}