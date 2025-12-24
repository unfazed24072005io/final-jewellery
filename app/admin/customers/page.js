'use client';

import { 
  FiUsers, 
  FiMail, 
  FiShoppingBag, 
  FiDollarSign,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCustomers = Array.from({ length: 65 }, (_, i) => ({
        id: `CUST-${1000 + i}`,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).padStart(4, '0')}`,
        orders: Math.floor(Math.random() * 20) + 1,
        totalSpent: Math.floor(Math.random() * 50000) + 1000,
        lastOrder: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        joined: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        status: i % 10 === 0 ? 'inactive' : 'active'
      }));
      
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [searchTerm, customers]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="admin-badge admin-badge-success">Active</span>
    ) : (
      <span className="admin-badge admin-badge-error">Inactive</span>
    );
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customer database</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{customers.length}</div>
          <div className="admin-stat-label">Total Customers</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {customers.filter(c => c.status === 'active').length}
          </div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {customers.reduce((sum, customer) => sum + customer.orders, 0)}
          </div>
          <div className="admin-stat-label">Total Orders</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {formatCurrency(customers.reduce((sum, customer) => sum + customer.totalSpent, 0))}
          </div>
          <div className="admin-stat-label">Total Spent</div>
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
              placeholder="Search customers by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="admin-form-input pr-10">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <FiMail size={14} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{customer.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiShoppingBag className="text-gray-400" size={16} />
                      <span className="font-medium">{customer.orders}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiDollarSign className="text-gray-400" size={16} />
                      <span className="font-medium">{formatCurrency(customer.totalSpent)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600">{customer.lastOrder}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600">{customer.joined}</span>
                  </td>
                  <td>{getStatusBadge(customer.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUsers className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Customer data will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}