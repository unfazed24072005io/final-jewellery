'use client';

import { 
  FiFileText, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiPlus,
  FiSearch,
  FiCalendar,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX
} from 'react-icons/fi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const blogsPerPage = 8;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBlogs = Array.from({ length: 24 }, (_, i) => ({
        id: `BLOG-${1000 + i}`,
        title: `The Art of Jewellery: ${['Diamonds', 'Pearls', 'Gold', 'Design', 'Trends'][i % 5]}`,
        author: 'Admin User',
        status: i % 4 === 0 ? 'draft' : 'published',
        featured: i % 3 === 0,
        views: Math.floor(Math.random() * 1000) + 100,
        category: ['Jewellery Guide', 'Trends', 'Care Tips', 'Brand Stories'][i % 4],
        createdAt: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        updatedAt: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      }));
      
      setBlogs(mockBlogs);
      setLoading(false);
    }, 800);
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteBlog = (id) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBlogs(prev => prev.filter(b => b.id !== blogToDelete));
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <span className="admin-badge admin-badge-success">Published</span>;
      case 'draft': return <span className="admin-badge admin-badge-warning">Draft</span>;
      default: return <span className="admin-badge admin-badge-warning">Draft</span>;
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog content</p>
        </div>
        <Link 
          href="/admin/blogs/new"
          className="admin-btn-primary inline-flex items-center"
        >
          <FiPlus className="mr-2" />
          Write Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{blogs.length}</div>
          <div className="admin-stat-label">Total Posts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {blogs.filter(b => b.status === 'published').length}
          </div>
          <div className="admin-stat-label">Published</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {blogs.filter(b => b.featured).length}
          </div>
          <div className="admin-stat-label">Featured</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()}
          </div>
          <div className="admin-stat-label">Total Views</div>
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
              placeholder="Search blog posts by title, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="admin-form-input pr-10">
                <option>All Categories</option>
                <option>Jewellery Guide</option>
                <option>Trends</option>
                <option>Care Tips</option>
                <option>Brand Stories</option>
              </select>
            </div>
            
            <div className="relative">
              <select className="admin-form-input pr-10">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Views</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className="max-w-xs">
                      <div className="font-medium text-gray-900 truncate">{blog.title}</div>
                      <div className="text-sm text-gray-500">{blog.id}</div>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-gray-700">{blog.category}</span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-gray-400" size={14} />
                      <span className="text-sm">{blog.author}</span>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium">{blog.views.toLocaleString()}</span>
                  </td>
                  <td>{getStatusBadge(blog.status)}</td>
                  <td>
                    {blog.featured ? (
                      <FiCheck className="text-green-500" size={20} />
                    ) : (
                      <FiX className="text-gray-400" size={20} />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600">{blog.createdAt}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <Link
                        href={`/blogs/${blog.id.toLowerCase().replace(/ /g, '-')}`}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded transition-colors"
                        title="View"
                      >
                        <FiEye size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
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
        {filteredBlogs.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} posts
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

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiFileText className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start sharing your expertise with blog posts'}
            </p>
            <Link href="/admin/blogs/new" className="admin-btn-primary">
              <FiPlus className="mr-2" />
              Write First Post
            </Link>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Blog Post</h3>
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
                  Delete blog post?
                </h4>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone. The post will be permanently removed.
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
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}