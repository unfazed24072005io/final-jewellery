import CollectionCard from '@/components/CollectionCard';
import { getCollections } from '@/lib/firebase/config';
import { FiFilter, FiGrid } from 'react-icons/fi';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="section-padding section-spacing">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="heading-1 text-charcoal-900 mb-6">Our Collections</h1>
        <p className="body-large text-charcoal-700 max-w-3xl mx-auto">
          Each collection tells a unique story, crafted with precision and passion for those who appreciate the finest details.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      {/* No Collections Message */}
      {collections.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiGrid size={32} className="text-gray-400" />
          </div>
          <h3 className="heading-3 text-charcoal-900 mb-3">No Collections Available</h3>
          <p className="text-charcoal-600">
            Our collections are being curated. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
}