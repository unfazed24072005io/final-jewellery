import ProductCard from '@/components/ProductCard';
import { getCollections, getProducts } from '@/lib/firebase/config';
import { notFound } from 'next/navigation';
import { FiChevronRight, FiGrid, FiStar } from 'react-icons/fi';

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionDetailPage({ params }) {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts()
  ]);
  
  const collection = collections.find(c => c.slug === params.slug);
  
  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter(p => 
    p.category && p.category.toLowerCase().includes(collection.slug.split('-')[0])
  );

  return (
    <div className="section-padding section-spacing">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-charcoal-500 mb-8">
        <a href="/" className="hover:text-gold transition-colors">Home</a>
        <FiChevronRight className="mx-2" size={14} />
        <a href="/collections" className="hover:text-gold transition-colors">Collections</a>
        <FiChevronRight className="mx-2" size={14} />
        <span className="text-charcoal-900">{collection.name}</span>
      </div>

      {/* Collection Header */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          {collection.featured && (
            <span className="inline-flex items-center text-gold font-medium text-sm tracking-wider uppercase mr-4">
              <FiStar className="mr-2" />
              Featured Collection
            </span>
          )}
        </div>
        <h1 className="heading-1 text-charcoal-900 mb-6">{collection.name}</h1>
        <p className="body-large text-charcoal-700 max-w-3xl">
          {collection.description}
        </p>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-50 p-6 border border-gray-100">
          <div className="text-3xl font-serif font-bold text-gold mb-2">
            {collectionProducts.length}
          </div>
          <p className="text-charcoal-700">Exclusive Pieces</p>
        </div>
        <div className="bg-gray-50 p-6 border border-gray-100">
          <div className="text-3xl font-serif font-bold text-gold mb-2">
            100%
          </div>
          <p className="text-charcoal-700">Handcrafted</p>
        </div>
        <div className="bg-gray-50 p-6 border border-gray-100">
          <div className="text-3xl font-serif font-bold text-gold mb-2">
            24
          </div>
          <p className="text-charcoal-700">Months Warranty</p>
        </div>
      </div>

      {/* Collection Products */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-3 text-charcoal-900">Collection Pieces</h2>
          <div className="text-sm text-charcoal-600">
            {collectionProducts.length} items
          </div>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 border border-gray-100">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <FiGrid size={32} className="text-gray-400" />
            </div>
            <h3 className="heading-3 text-charcoal-900 mb-3">Coming Soon</h3>
            <p className="text-charcoal-600 max-w-md mx-auto">
              Products for this collection are being added. Check back soon to explore the complete range.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}