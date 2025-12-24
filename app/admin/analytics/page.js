'use client';

import { 
  FiTrendingUp, 
  FiUsers, 
  FiShoppingBag, 
  FiDollarSign,
  FiBarChart2,
  FiCalendar,
  FiPieChart,
  FiActivity,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [salesData, setSalesData] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSalesData([
        { date: 'Jan', revenue: 45000, orders: 42 },
        { date: 'Feb', revenue: 52000, orders: 48 },
        { date: 'Mar', revenue: 78000, orders: 65 },
        { date: 'Apr', revenue: 65000, orders: 58 },
        { date: 'May', revenue: 89000, orders: 72 },
        { date: 'Jun', revenue: 95000, orders: 78 },
      ]);

      setTrafficData([
        { source: 'Direct', visitors: 1245, conversion: 4.2 },
        { source: 'Social', visitors: 845, conversion: 3.8 },
        { source: 'Search', visitors: 612, conversion: 5.1 },
        { source: 'Referral', visitors: 298, conversion: 2.9 },
        { source: 'Email', visitors: 456, conversion: 6.3 },
      ]);

      setTopProducts([
        { name: 'Diamond Ring', sales: 42, revenue: 125800, growth: 24 },
        { name: 'Pearl Necklace', sales: 28, revenue: 53172, growth: 18 },
        { name: 'Gold Bracelet', sales: 24, revenue: 76800, growth: 32 },
        { name: 'Emerald Earrings', sales: 18, revenue: 44100, growth: 12 },
        { name: 'Sapphire Pendant', sales: 15, revenue: 67500, growth: 28 },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(245000),
      change: '+32%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+24%',
      trend: 'up',
      icon: FiShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Customers',
      value: '89',
      change: '+18%',
      trend: 'up',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Order Value',
      value: formatCurrency(1570),
      change: '+8%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'bg-gold'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Track your store performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="admin-form-input pr-10"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="admin-stat-card">
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
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Revenue & Orders</h3>
            <FiBarChart2 className="text-gold" size={20} />
          </div>
          <div className="h-72">
            <div className="flex items-end h-48 space-x-6 mt-8 px-4">
              {salesData.map((data, index) => {
                const revenueHeight = (data.revenue / 100000) * 100;
                const ordersHeight = (data.orders / 100) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="flex items-end space-x-1 w-full justify-center">
                      <div 
                        className="w-1/2 bg-gradient-to-t from-gold to-gold-dark rounded-t-lg opacity-90"
                        style={{ height: `${revenueHeight}%` }}
                        title={`Revenue: ${formatCurrency(data.revenue)}`}
                      ></div>
                      <div 
                        className="w-1/2 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg opacity-90"
                        style={{ height: `${ordersHeight}%` }}
                        title={`Orders: ${data.orders}`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{data.date}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gold rounded"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Traffic Sources</h3>
            <FiPieChart className="text-purple-500" size={20} />
          </div>
          <div className="h-72">
            <div className="grid grid-cols-2 gap-4 mt-4">
              {trafficData.map((source, index) => {
                const colors = ['bg-gold', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-indigo-500'];
                const totalVisitors = trafficData.reduce((sum, s) => sum + s.visitors, 0);
                const percentage = ((source.visitors / totalVisitors) * 100).toFixed(1);
                
                return (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{source.source}</span>
                      <span className="text-sm text-gray-500">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${colors[index]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{source.visitors.toLocaleString()} visitors</span>
                      <span className="text-green-600">{source.conversion}% conversion</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Top Performing Products</h3>
          <FiActivity className="text-green-500" size={20} />
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Growth</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-700 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: LUX-{1000 + index}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiShoppingBag className="text-gray-400" size={16} />
                      <span className="font-medium">{product.sales} units</span>
                    </div>
                  </td>
                  <td className="font-medium">{formatCurrency(product.revenue)}</td>
                  <td>
                    <div className={`flex items-center ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? <FiChevronUp /> : <FiChevronDown />}
                      <span className="font-medium">{product.growth}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                        style={{ width: `${Math.min(product.growth * 2, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="admin-card">
          <h4 className="font-medium text-gray-900 mb-4">Conversion Rate</h4>
          <div className="text-3xl font-bold text-gray-900">4.8%</div>
          <div className="flex items-center text-green-600 mt-2">
            <FiChevronUp />
            <span className="text-sm">+0.3% from last month</span>
          </div>
        </div>
        
        <div className="admin-card">
          <h4 className="font-medium text-gray-900 mb-4">Customer Lifetime Value</h4>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(2750)}</div>
          <div className="flex items-center text-green-600 mt-2">
            <FiChevronUp />
            <span className="text-sm">+12% from last quarter</span>
          </div>
        </div>
        
        <div className="admin-card">
          <h4 className="font-medium text-gray-900 mb-4">Return Rate</h4>
          <div className="text-3xl font-bold text-gray-900">2.1%</div>
          <div className="flex items-center text-red-600 mt-2">
            <FiChevronDown />
            <span className="text-sm">-0.4% from last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}