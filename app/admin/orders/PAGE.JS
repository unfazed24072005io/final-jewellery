'use client';

import { 
  FiShoppingCart, 
  FiEye, 
  FiCheck,
  FiX,
  FiTruck,
  FiPackage,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const ordersPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders = Array.from({ length: 48 }, (_, i) => {
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const status = statuses[i % 5];
        return {
          id: `ORD-${1000 + i}`,
          customer: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          amount: 500 + (i * 150),
          items: Math.floor(Math.random() * 5) + 1,
          status: status,
          payment: i % 3 === 0 ? 'paid' : 'pending',
          shipping: i % 2 === 0 ? 'standard' : 'express',
          date: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          address: `${i + 123} Main St, City, Country`
        };
      });
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = orders;
    
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, orders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiPackage },
      processing: { color: 'bg-blue-100 text-blue-800', icon: FiPackage },
      shipped: { color: 'bg-indigo-100 text-indigo-800', icon: FiTruck },
      delivered: { color: 'bg-green-100 text-green-800', icon: FiCheck },
      cancelled: { color: 'bg-red-100 text-red-800', icon: FiX }
    };
    
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    
    return (
      <span className={`admin-badge ${badge.color} inline-flex items-center`}>
        <Icon className="mr-1" size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    return status === 'paid' ? (
      <span className="admin-badge admin-badge-success">Paid</span>
    ) : (
      <span className="admin-badge admin-badge-warning">Pending</span>
    );
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">Manage customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{orders.length}</div>
          <div className="admin-stat-label">Total Orders</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {orders.filter(o => o.status === 'pending').length}
          </div>
          <div className="admin-stat-label">Pending</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {orders.filter(o => o.status === 'processing').length}
          </div>
          <div className="admin-stat-label">Processing</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {orders.filter(o => o.status === 'delivered').length}
          </div>
          <div className="admin-stat-label">Delivered</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {formatCurrency(orders.reduce((sum, order) => sum + order.amount, 0))}
          </div>
          <div className="admin-stat-label">Total Revenue</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-form-input pr-10"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link 
                      href={`/admin/orders/${order.id}`}
                      className="text-gold hover:text-gold-dark font-medium"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="font-medium">{formatCurrency(order.amount)}</td>
                  <td>
                    <span className="text-gray-700">{order.items} items</span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gold"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td>{getPaymentBadge(order.payment)}</td>
                  <td>
                    <span className="text-sm text-gray-600">{order.date}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </Link>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'processing')}
                          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
                          title="Mark as Processing"
                        >
                          <FiCheck size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={20} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      currentPage === pageNum
                        ? 'bg-gold text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingCart className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}