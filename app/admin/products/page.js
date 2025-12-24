'use client';

import { 
  FiPackage, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiSearch,
  FiFilter,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX
} from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = Array.from({ length: 45 }, (_, i) => ({
        id: `PROD-${1000 + i}`,
        name: `Luxury ${['Ring', 'Necklace', 'Bracelet', 'Earrings'][i % 4]} ${i + 1}`,
        category: ['Rings', 'Necklaces', 'Bracelets', 'Earrings'][i % 4],
        price: 500 + (i * 150),
        stock: Math.floor(Math.random() * 100),
        status: i % 5 === 0 ? 'draft' : i % 7 === 0 ? 'out_of_stock' : 'published',
        featured: i % 3 === 0,
        createdAt: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      }));
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map(p => p.id));
    }
  };

  const handleDeleteSelected = () => {
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setShowDeleteModal(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <span className="admin-badge admin-badge-success">Published</span>;
      case 'draft': return <span className="admin-badge admin-badge-warning">Draft</span>;
      case 'out_of_stock': return <span className="admin-badge admin-badge-error">Out of Stock</span>;
      default: return <span className="admin-badge admin-badge-warning">Draft</span>;
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your jewellery products</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="admin-btn-primary inline-flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Product
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{products.length}</div>
          <div className="admin-stat-label">Total Products</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {products.filter(p => p.status === 'published').length}
          </div>
          <div className="admin-stat-label">Published</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {products.filter(p => p.featured).length}
          </div>
          <div className="admin-stat-label">Featured</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {products.filter(p => p.status === 'out_of_stock').length}
          </div>
          <div className="admin-stat-label">Out of Stock</div>
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
              placeholder="Search products by name, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input pl-10"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {selectedProducts.length > 0 && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="admin-btn-danger inline-flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete ({selectedProducts.length})
              </button>
            )}
            
            <div className="relative">
              <select className="admin-form-input pr-10">
                <option>All Categories</option>
                <option>Rings</option>
                <option>Necklaces</option>
                <option>Earrings</option>
                <option>Bracelets</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select className="admin-form-input pr-10">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                </th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <FiPackage className="text-gray-500" size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-gray-700">{product.category}</span>
                  </td>
                  <td className="font-medium">{formatCurrency(product.price)}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 20 
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td>
                    {product.featured ? (
                      <FiCheck className="text-green-500" size={20} />
                    ) : (
                      <FiX className="text-gray-400" size={20} />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <Link
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded transition-colors"
                        title="View"
                      >
                        <FiEye size={18} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedProducts([product.id]);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPackage className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
            </p>
            <Link href="/admin/products/new" className="admin-btn-primary">
              <FiPlus className="mr-2" />
              Add Product
            </Link>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Products</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiTrash2 className="text-red-600" size={24} />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Delete {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''}?
                </h4>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone. All product data will be permanently removed.
                </p>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                className="admin-btn-danger"
              >
                Delete Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}