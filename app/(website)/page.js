import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';
import BlogCard from '@/components/BlogCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getProducts, getCollections, getBlogs } from '@/lib/firebase/config';
import { FiArrowRight, FiStar, FiAward, FiShield, FiTruck } from 'react-icons/fi';

export default async function HomePage() {
  const [products, collections, blogs] = await Promise.all([
    getProducts(),
    getCollections(),
    getBlogs()
  ]);

  const featuredProducts = products.filter(p => p.featured);
  const featuredCollections = collections.filter(c => c.featured);
  const featuredBlogs = blogs.filter(b => b.featured);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="section-padding section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center text-gold font-medium text-sm tracking-wider uppercase mb-4">
                  <FiStar className="mr-2" />
                  Exclusive Collection
                </span>
                <h1 className="heading-1 text-charcoal-900 mb-6">
                  Timeless Elegance,<br />
                  <span className="text-gold">Crafted to Perfection</span>
                </h1>
                <p className="body-large text-charcoal-700 max-w-xl mb-8">
                  Discover our exclusive collection of luxury jewellery, where each piece tells a story of craftsmanship, beauty, and timeless elegance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary inline-flex items-center justify-center group">
                  Shop Collection
                  <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/collections" className="btn-secondary inline-flex items-center justify-center">
                  View Collections
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-charcoal-900 to-charcoal-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 border border-gold/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-24 h-24 border border-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-gold text-lg font-serif tracking-widest">LUXURY</span>
                      </div>
                    </div>
                    <p className="text-gold-200 text-sm max-w-md mx-auto">
                      Premium Jewellery Showcase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="section-padding py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-gold" size={24} />
              </div>
              <h4 className="font-medium text-charcoal-900 mb-1">Certified Quality</h4>
              <p className="text-sm text-charcoal-600">GIA Certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-gold" size={24} />
              </div>
              <h4 className="font-medium text-charcoal-900 mb-1">Secure Purchase</h4>
              <p className="text-sm text-charcoal-600">100% Safe</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-gold" size={24} />
              </div>
              <h4 className="font-medium text-charcoal-900 mb-1">Free Shipping</h4>
              <p className="text-sm text-charcoal-600">Over $500</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-gold" size={24} />
              </div>
              <h4 className="font-medium text-charcoal-900 mb-1">Premium Service</h4>
              <p className="text-sm text-charcoal-600">24/7 Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding section-spacing">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="heading-2 text-charcoal-900 mb-4">Featured Products</h2>
            <p className="body-base text-charcoal-700 max-w-2xl">
              Discover our most exquisite pieces, each crafted with precision and care for those who appreciate true luxury.
            </p>
          </div>
          <Link href="/products" className="btn-outline hidden md:inline-flex">
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products" className="btn-secondary md:hidden">
            View All Products
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-gray-50 section-padding section-spacing">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-charcoal-900 mb-4">Our Collections</h2>
          <p className="body-base text-charcoal-700 max-w-2xl mx-auto">
            Explore our curated collections, each designed with a unique story and aesthetic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCollections.slice(0, 3).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/collections" className="btn-secondary">
            Explore All Collections
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding section-spacing">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="heading-2 text-charcoal-900 mb-4">From Our Journal</h2>
            <p className="body-base text-charcoal-700 max-w-2xl">
              Insights, guides, and stories from the world of luxury jewellery.
            </p>
          </div>
          <Link href="/blogs" className="btn-outline hidden md:inline-flex">
            Read All Articles
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blogs" className="btn-secondary md:hidden">
            Read All Articles
          </Link>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
}