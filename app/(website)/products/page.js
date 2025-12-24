import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { getProducts } from '@/lib/firebase/config';
import { FiGrid, FiList, FiChevronDown, FiFilter } from 'react-icons/fi';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="section-padding section-spacing">
      <div className="mb-12">
        <h1 className="heading-1 text-charcoal-900 mb-4">Our Collection</h1>
        <p className="body-large text-charcoal-700 max-w-3xl">
          Discover our exquisite range of luxury jewellery, crafted with precision and passion.
          Each piece tells a story of elegance and timeless beauty.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <FilterSidebar />
          
          {/* Mobile Filter Toggle (hidden on desktop) */}
          <div className="lg:hidden mt-6">
            <button className="btn-outline w-full flex items-center justify-center">
              <FiFilter className="mr-2" />
              Show Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-white border border-gray-100">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-charcoal-600">
                Showing <span className="font-medium text-charcoal-900">{products.length}</span> products
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <FiGrid size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors opacity-50">
                  <FiList size={20} />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiGrid size={32} className="text-gray-400" />
              </div>
              <h3 className="heading-3 text-charcoal-900 mb-3">No Products Found</h3>
              <p className="text-charcoal-600 mb-6">
                We couldn't find any products matching your criteria.
              </p>
              <button className="btn-secondary">
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
              <div>
                <p className="text-sm text-charcoal-600">
                  Showing 1-{Math.min(12, products.length)} of {products.length} products
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gold text-white text-sm hover:bg-gold-dark">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">
                  8
                </button>
                <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}