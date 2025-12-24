import BlogCard from '@/components/BlogCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getBlogs } from '@/lib/firebase/config';
import { FiSearch, FiCalendar, FiTag, FiChevronRight } from 'react-icons/fi';

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const categories = ['All', 'Jewellery Guide', 'Trends', 'Care & Maintenance', 'Brand Stories'];

  return (
    <div className="section-padding section-spacing">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="heading-1 text-charcoal-900 mb-6">Journal</h1>
        <p className="body-large text-charcoal-700 max-w-3xl mx-auto">
          Insights, stories, and expert advice from the world of luxury jewellery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-medium text-charcoal-900 mb-4 flex items-center">
              <FiTag className="mr-2 text-gold" />
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button className="flex items-center justify-between w-full text-left text-charcoal-600 hover:text-gold transition-colors py-2">
                    <span>{category}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1">12</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="mb-8">
            <h3 className="font-medium text-charcoal-900 mb-4 flex items-center">
              <FiCalendar className="mr-2 text-gold" />
              Recent Posts
            </h3>
            <ul className="space-y-4">
              {blogs.slice(0, 3).map((blog) => (
                <li key={blog.id}>
                  <a href={`/blogs/${blog.slug}`} className="group">
                    <p className="text-sm font-medium text-charcoal-900 group-hover:text-gold transition-colors mb-1">
                      {blog.title}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter in Sidebar */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white p-6">
            <h4 className="font-serif font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-gold-200 mb-4">
              Get the latest articles delivered to your inbox.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gold-200 focus:outline-none focus:border-gold text-sm"
              />
              <button className="w-full mt-3 bg-gold text-white py-2 text-sm font-medium hover:bg-gold-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="lg:col-span-3">
          {/* Featured Post */}
          {blogs.length > 0 && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="inline-block bg-gold text-white px-3 py-1 text-xs font-medium tracking-wider mb-4">
                      FEATURED
                    </span>
                    <h2 className="heading-2 text-charcoal-900 mb-4">
                      {blogs[0].title}
                    </h2>
                    <p className="body-base text-charcoal-700 mb-6">
                      {blogs[0].excerpt}
                    </p>
                    <a 
                      href={`/blogs/${blogs[0].slug}`}
                      className="inline-flex items-center text-gold font-medium group"
                    >
                      Read Full Article
                      <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">FEATURED IMAGE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.slice(1).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* No Posts Message */}
          {blogs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCalendar size={32} className="text-gray-400" />
              </div>
              <h3 className="heading-3 text-charcoal-900 mb-3">No Articles Yet</h3>
              <p className="text-charcoal-600">
                Our journal is being prepared. Please check back soon for insightful articles.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}