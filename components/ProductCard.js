import Link from 'next/link';
import { FiShoppingBag, FiEye, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className="group relative">
      <div className="relative overflow-hidden bg-white border border-gray-100 card-hover">
        {/* Product Image Placeholder */}
        <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image Placeholder */}
          <div className="w-4/5 h-4/5 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium tracking-wider">PRODUCT IMAGE</span>
          </div>
          
          {/* Quick Actions Overlay */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="bg-white text-charcoal-900 p-2 hover:bg-gold hover:text-white transition-colors duration-300 shadow-md">
              <FiShoppingBag size={18} />
            </button>
            <Link 
              href={`/products/${product.slug}`}
              className="bg-white text-charcoal-900 p-2 hover:bg-gold hover:text-white transition-colors duration-300 shadow-md"
            >
              <FiEye size={18} />
            </Link>
          </div>
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-gold text-white px-3 py-1 text-xs font-medium tracking-wider">
              FEATURED
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-charcoal-900 group-hover:text-gold transition-colors duration-300 line-clamp-1">
              <Link href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
            <span className="text-gold font-serif font-semibold text-lg">
              {formattedPrice}
            </span>
          </div>
          
          <p className="text-charcoal-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar 
                  key={star} 
                  className={`w-4 h-4 ${star <= 4 ? 'text-gold fill-gold' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-xs text-charcoal-400 ml-1">(24)</span>
            </div>
            
            <div className="text-xs text-charcoal-400 uppercase tracking-wider">
              {product.material}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}