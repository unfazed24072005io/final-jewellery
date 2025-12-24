import BlogCard from '@/components/BlogCard';
import { getBlogs } from '@/lib/firebase/config';
import { notFound } from 'next/navigation';
import { 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiShare2, 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin,
  FiChevronRight,
  FiTag
} from 'react-icons/fi';

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === params.slug);
  
  if (!blog) {
    notFound();
  }

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="section-padding section-spacing">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-charcoal-500 mb-8">
        <a href="/" className="hover:text-gold transition-colors">Home</a>
        <FiChevronRight className="mx-2" size={14} />
        <a href="/blogs" className="hover:text-gold transition-colors">Journal</a>
        <FiChevronRight className="mx-2" size={14} />
        <span className="text-charcoal-900">Article</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-charcoal-500 mb-4">
              <span className="flex items-center">
                <FiCalendar className="mr-2" size={14} />
                {formatDate(blog.date)}
              </span>
              <span className="flex items-center">
                <FiUser className="mr-2" size={14} />
                By Admin
              </span>
              <span className="flex items-center">
                <FiClock className="mr-2" size={14} />
                5 min read
              </span>
            </div>
            
            <h1 className="heading-1 text-charcoal-900 mb-6">{blog.title}</h1>
            
            <div className="flex items-center justify-between py-4 border-y border-gray-200">
              <div className="flex items-center space-x-2">
                <FiTag className="text-gold" />
                <span className="text-sm text-charcoal-700">Jewellery Guide, Trends</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-charcoal-600">Share:</span>
                <div className="flex items-center space-x-3">
                  <button className="text-charcoal-500 hover:text-gold transition-colors">
                    <FiFacebook size={18} />
                  </button>
                  <button className="text-charcoal-500 hover:text-gold transition-colors">
                    <FiTwitter size={18} />
                  </button>
                  <button className="text-charcoal-500 hover:text-gold transition-colors">
                    <FiLinkedin size={18} />
                  </button>
                  <button className="text-charcoal-500 hover:text-gold transition-colors">
                    <FiShare2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 mb-8 flex items-center justify-center">
            <div className="text-center">
              <span className="text-gray-500 font-medium tracking-wider">FEATURED IMAGE</span>
              <p className="text-sm text-gray-500 mt-2">High-quality blog header image</p>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <div className="space-y-6">
              <p className="text-xl text-charcoal-700 leading-relaxed">
                Welcome to our in-depth guide on luxury jewellery. In this article, we'll explore the intricate world of fine jewellery craftsmanship and what makes each piece truly special.
              </p>
              
              <h2 className="heading-3 text-charcoal-900 pt-8">The Art of Jewellery Making</h2>
              
              <p className="body-base text-charcoal-700">
                Creating luxury jewellery is a meticulous process that combines traditional craftsmanship with modern technology. Each piece goes through multiple stages of design, modeling, casting, stone setting, and polishing before it reaches perfection.
              </p>
              
              <div className="bg-gray-50 p-6 border-l-4 border-gold my-8">
                <p className="text-lg font-serif text-charcoal-900 italic">
                  "True luxury is in the details—the precision of a cut, the weight of gold, the sparkle of a perfectly set diamond."
                </p>
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-charcoal-900 mt-8">Understanding Quality</h3>
              
              <p className="body-base text-charcoal-700">
                When investing in luxury jewellery, several factors determine quality and value. These include the purity of metals, the quality and cut of gemstones, the precision of settings, and the overall craftsmanship.
              </p>
              
              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3"></div>
                  <span className="text-charcoal-700">Metal purity and weight</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3"></div>
                  <span className="text-charcoal-700">Gemstone quality and certification</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3"></div>
                  <span className="text-charcoal-700">Craftsmanship and finishing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3"></div>
                  <span className="text-charcoal-700">Design uniqueness and artistry</span>
                </li>
              </ul>
              
              <h2 className="heading-3 text-charcoal-900 pt-8">Caring for Your Investment</h2>
              
              <p className="body-base text-charcoal-700">
                Proper care ensures your jewellery maintains its beauty for generations. Regular cleaning, professional inspections, and proper storage are essential for preserving both the appearance and value of your luxury pieces.
              </p>
              
              <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white p-8 my-8">
                <h3 className="heading-4 text-white mb-4">Expert Tip</h3>
                <p>
                  Always store jewellery separately in soft pouches or lined boxes to prevent scratching. Have pieces professionally cleaned and inspected every six months to maintain their brilliance.
                </p>
              </div>
              
              <p className="body-base text-charcoal-700">
                Investing in luxury jewellery is not just about acquiring beautiful objects—it's about owning pieces of art that carry meaning, history, and exceptional craftsmanship. By understanding what goes into creating these masterpieces, you can make informed decisions and truly appreciate the value of your collection.
              </p>
            </div>
          </article>

          {/* Tags and Share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-charcoal-900 mb-2 block">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {['Jewellery', 'Luxury', 'Guide', 'Diamonds', 'Craftsmanship'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-charcoal-700 text-sm hover:bg-gold hover:text-white transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-charcoal-900 mb-2 block">Share this article:</span>
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FiFacebook size={18} />
                  </button>
                  <button className="w-10 h-10 bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <FiTwitter size={18} />
                  </button>
                  <button className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <FiLinkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Author Bio */}
          <div className="bg-gray-50 p-6 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AJ</span>
              </div>
              <div>
                <h4 className="font-medium text-charcoal-900">Alexandra James</h4>
                <p className="text-sm text-charcoal-600">Jewellery Expert</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-700">
              With over 15 years in the luxury jewellery industry, Alexandra shares her expertise on craftsmanship, trends, and investment pieces.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mb-8">
            <h3 className="font-medium text-charcoal-900 mb-4">Related Articles</h3>
            <div className="space-y-6">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <a href={`/blogs/${relatedBlog.slug}`} className="group">
                    <h4 className="font-medium text-charcoal-900 group-hover:text-gold transition-colors mb-2">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-sm text-charcoal-500 mb-2">
                      {formatDate(relatedBlog.date)}
                    </p>
                    <span className="text-sm text-gold font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Read More
                      <FiChevronRight className="ml-1" size={14} />
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup in Sidebar */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white p-6">
            <h4 className="font-serif font-semibold mb-3">Never Miss an Update</h4>
            <p className="text-sm text-gold-200 mb-4">
              Subscribe to receive our latest articles and exclusive content.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gold-200 focus:outline-none focus:border-gold text-sm"
              />
              <button className="w-full bg-gold text-white py-2 text-sm font-medium hover:bg-gold-dark transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles Section */}
      {relatedBlogs.length > 0 && (
        <div className="mt-24 pt-12 border-t border-gray-200">
          <h3 className="heading-3 text-charcoal-900 mb-8">More Articles You Might Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard key={relatedBlog.id} blog={relatedBlog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}