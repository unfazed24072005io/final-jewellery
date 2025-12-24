import Link from 'next/link';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

export default function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article className="group">
      <Link href={`/blogs/${blog.slug}`}>
        <div className="bg-white border border-gray-100 card-hover h-full">
          {/* Blog Image Placeholder */}
          <div className="aspect-[16/9] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Image Content */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="mb-3">
                  <span className="inline-block bg-gold text-white px-3 py-1 text-xs font-medium tracking-wider mb-2">
                    JEWELLERY GUIDE
                  </span>
                </div>
                <div className="w-16 h-px bg-gold mx-auto mb-4" />
                <h4 className="text-lg font-serif text-charcoal-900">
                  Blog Post Image
                </h4>
              </div>
            </div>
            
            {/* Read Time Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs text-charcoal-700">
              5 min read
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <div className="flex items-center space-x-4 text-sm text-charcoal-500 mb-4">
              <span className="flex items-center">
                <FiCalendar className="mr-2" size={14} />
                {formatDate(blog.date)}
              </span>
              <span className="flex items-center">
                <FiUser className="mr-2" size={14} />
                Admin
              </span>
            </div>
            
            <h3 className="heading-4 mb-3 text-charcoal-900 group-hover:text-gold transition-colors duration-300">
              {blog.title}
            </h3>
            
            <p className="body-base text-charcoal-600 mb-4 line-clamp-2">
              {blog.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-gold font-medium text-sm tracking-wider group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                Read Article
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              
              <div className="flex space-x-2">
                {['Diamonds', 'Guide', 'Quality'].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-charcoal-600 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}