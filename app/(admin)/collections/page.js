'use client';

import { 
  FiGrid, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiPlus,
  FiSearch,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CollectionsManagement() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCollections = [
        { id: 'COL-001', name: 'Bridal Collection', products: 24, status: 'active', featured: true, createdAt: '2024-01-15' },
        { id: 'COL-002', name: 'Signature Collection', products: 18, status: 'active', featured: true, createdAt: '2024-01-20' },
        { id: 'COL-003', name: 'Limited Edition', products: 8, status: 'active', featured: false, createdAt: '2024-02-10' },
        { id: 'COL-004', name: 'Everyday Luxury', products: 32, status: 'active', featured: true, createdAt: '2024-02-25' },
        { id: 'COL-005', name: 'Pearls & Gems', products: 15, status: 'draft', featured: false, createdAt: '2024-03-01' },
        { id: 'COL-006', name: 'Men\'s Collection', products: 12, status: 'active', featured: false, createdAt: '2024-03-05' },
        { id: 'COL-007', name: 'Festive Season', products: 0, status: 'draft', featured: false, createdAt: '2024-03-10' },
        { id: 'COL-008', name: 'Summer Collection', products: 28, status: 'active', featured: true, createdAt: '2024-03-12' },
      ];
      
      setCollections(mockCollections);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCollection = (id) => {
    setCollectionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCollections(prev => prev.filter(c => c.id !== collectionToDelete));
    setShowDeleteModal(false);
    setCollectionToDelete(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <span className="admin-badge admin-badge-success">Active</span>;
      case 'draft': return <span className="admin-badge admin-badge-warning">Draft</span>;
      default: return <span className="admin-badge admin-badge-warning">Draft</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Collections</h1>
          <p className="text-gray-600 mt-2">Organize your products into collections</p>
        </div>
        <Link 
          href="/admin/collections/new"
          className="admin-btn-primary inline-flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Collection
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{collections.length}</div>
          <div className="admin-stat-label">Total Collections</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {collections.filter(c => c.status === 'active').length}
          </div>
          <div className="admin-stat-label">Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {collections.filter(c => c.featured).length}
          </div>
          <div className="admin-stat-label">Featured</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative max-w-lg">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search collections by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-form-input pl-10"
          />
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="admin-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-lg flex items-center justify-center">
                  <FiGrid className="text-gold" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{collection.name}</h3>
                  <p className="text-sm text-gray-500">{collection.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/collections/${collection.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <FiEdit2 size={16} />
                </Link>
                <button
                  onClick={() => handleDeleteCollection(collection.id)}
                  className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Products</span>
                <span className="font-medium">{collection.products} items</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(collection.status)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Featured</span>
                {collection.featured ? (
                  <FiCheck className="text-green-500" size={18} />
                ) : (
                  <FiX className="text-gray-400" size={18} />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm text-gray-500">{collection.createdAt}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  href={`/collections/${collection.id.toLowerCase().replace(' ', '-')}`}
                  target="_blank"
                  className="text-sm text-gray-600 hover:text-gold transition-colors flex items-center"
                >
                  <FiEye className="mr-2" size={14} />
                  View on Site
                </Link>
                <Link
                  href={`/admin/collections/${collection.id}/products`}
                  className="text-sm text-gold hover:text-gold-dark font-medium"
                >
                  Manage Products →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiGrid className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first collection to organize products'}
          </p>
          <Link href="/admin/collections/new" className="admin-btn-primary">
            <FiPlus className="mr-2" />
            Add Collection
          </Link>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Collection</h3>
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
                  Delete collection?
                </h4>
                <p className="text-gray-600 mb-6">
                  This will remove the collection from your store. Products in this collection will not be deleted.
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
                onClick={confirmDelete}
                className="admin-btn-danger"
              >
                Delete Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}