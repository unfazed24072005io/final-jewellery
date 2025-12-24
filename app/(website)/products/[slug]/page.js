import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/firebase/config';
import { notFound } from 'next/navigation';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiShare2, 
  FiTruck, 
  FiShield, 
  FiRotateCcw,
  FiStar,
  FiChevronRight
} from 'react-icons/fi';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const products = await getProducts();
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className="section-padding section-spacing">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-charcoal-500 mb-8">
        <a href="/" className="hover:text-gold transition-colors">Home</a>
        <FiChevronRight className="mx-2" size={14} />
        <a href="/products" className="hover:text-gold transition-colors">Products</a>
        <FiChevronRight className="mx-2" size={14} />
        <span className="text-charcoal-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="text-center p-8">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 mx-auto mb-6 flex items-center justify-center">
                <span className="text-gray-500 font-medium tracking-wider">PRODUCT IMAGE</span>
              </div>
              <p className="text-sm text-gray-500">High-resolution product image</p>
            </div>
            
            {/* Image Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.featured && (
                <span className="bg-gold text-white px-3 py-1 text-xs font-medium tracking-wider">
                  FEATURED
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="aspect-square bg-gray-100 border-2 border-transparent hover:border-gold cursor-pointer transition-colors flex items-center justify-center">
                <span className="text-xs text-gray-400">Thumb {num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="heading-2 text-charcoal-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar 
                    key={star} 
                    className={`w-4 h-4 ${star <= 4 ? 'text-gold fill-gold' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-charcoal-500 ml-2">(24 reviews)</span>
              </div>
              <span className="text-sm text-charcoal-500">|</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-serif font-bold text-gold mb-6">
              {formattedPrice}
            </div>
            <p className="body-large text-charcoal-700 mb-6">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="w-32 text-charcoal-700">Category:</span>
              <span className="text-charcoal-900 font-medium">{product.category}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-charcoal-700">Material:</span>
              <span className="text-charcoal-900 font-medium">{product.material}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-charcoal-700">SKU:</span>
              <span className="text-charcoal-900 font-medium">LUX-{product.id.padStart(4, '0')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex-1 flex items-center justify-center group">
                <FiShoppingBag className="mr-3" />
                Add to Cart
              </button>
              <button className="btn-secondary flex items-center justify-center px-8">
                <FiHeart className="mr-3" />
                Wishlist
              </button>
            </div>
            
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <button className="flex items-center text-sm text-charcoal-600 hover:text-gold transition-colors">
                <FiShare2 className="mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold/10 rounded-none flex items-center justify-center">
                <FiTruck className="text-gold" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-charcoal-500">Over $500</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold/10 rounded-none flex items-center justify-center">
                <FiShield className="text-gold" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Authenticity</p>
                <p className="text-xs text-charcoal-500">Certified</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold/10 rounded-none flex items-center justify-center">
                <FiRotateCcw className="text-gold" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-charcoal-500">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-gray-200">
          <h3 className="heading-3 text-charcoal-900 mb-8">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}