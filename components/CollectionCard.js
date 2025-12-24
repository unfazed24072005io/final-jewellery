import Link from 'next/link';

export default function CollectionCard({ collection }) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="group relative overflow-hidden bg-white border border-gray-100 card-hover h-full">
        {/* Collection Image Placeholder */}
        <div className="aspect-[4/3] relative bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/30 rotate-45" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-gold/20 rotate-12" />
          </div>
          
          {/* Collection Name */}
          <div className="relative z-10 text-center p-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 transform group-hover:scale-105 transition-transform duration-300">
              {collection.name}
            </h3>
            <p className="text-gold-200 text-sm max-w-md mx-auto">
              {collection.description}
            </p>
          </div>
          
          {/* Explore Button */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <span className="inline-flex items-center text-white text-sm font-medium tracking-wider group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              EXPLORE COLLECTION
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Collection Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-charcoal-500 uppercase tracking-wider">
              {collection.featured ? 'Featured Collection' : 'Limited Edition'}
            </span>
            <span className="text-gold font-medium">
              12 Items
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-charcoal-600">
              Starting from <span className="font-medium text-charcoal-900">$1,850</span>
            </div>
            <div className="text-xs text-charcoal-400">
              View All →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}