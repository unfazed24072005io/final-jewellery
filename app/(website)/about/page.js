import { FiAward, FiUsers, FiHeart, FiGlobe, FiStar, FiChevronRight } from 'react-icons/fi';

export default function AboutPage() {
  const values = [
    {
      icon: FiStar,
      title: 'Excellence',
      description: 'We pursue perfection in every detail, ensuring each piece meets the highest standards of quality.'
    },
    {
      icon: FiHeart,
      title: 'Passion',
      description: 'Our love for jewellery drives us to create pieces that tell stories and capture emotions.'
    },
    {
      icon: FiUsers,
      title: 'Heritage',
      description: 'With decades of experience, we blend traditional craftsmanship with modern innovation.'
    },
    {
      icon: FiGlobe,
      title: 'Sustainability',
      description: 'We source materials responsibly and support ethical practices throughout our supply chain.'
    }
  ];

  const milestones = [
    { year: '1995', title: 'Founded', description: 'Established our first boutique in New York' },
    { year: '2005', title: 'International', description: 'Expanded to European markets' },
    { year: '2015', title: 'Innovation', description: 'Introduced sustainable sourcing practices' },
    { year: '2023', title: 'Digital', description: 'Launched our online luxury experience' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="section-padding section-spacing">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center text-gold font-medium text-sm tracking-wider uppercase mb-6">
              <FiAward className="mr-2" />
              Our Story
            </span>
            <h1 className="heading-1 text-charcoal-900 mb-6">
              Crafting Timeless Elegance <br />
              <span className="text-gold">Since 1995</span>
            </h1>
            <p className="body-large text-charcoal-700 mb-8">
              For nearly three decades, Luxury Jewels has been at the forefront of exquisite jewellery design, 
              combining traditional craftsmanship with contemporary elegance to create pieces that transcend time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white">
        <div className="section-padding section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-white mb-6">Our Mission</h2>
              <div className="space-y-4">
                <p className="body-large text-gold-200">
                  To create exceptional jewellery that celebrates life's most precious moments, 
                  crafted with integrity, passion, and an unwavering commitment to quality.
                </p>
                <p className="text-gold-200">
                  Every piece in our collection is more than just jewellery—it's a work of art, 
                  a symbol of love, and a legacy to be cherished for generations.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="w-40 h-40 border border-gold/30 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <div className="w-32 h-32 border border-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold text-xl font-serif tracking-widest">EST. 1995</span>
                  </div>
                </div>
                <p className="text-gold-200 text-sm">Decades of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding section-spacing">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-charcoal-900 mb-6">Our Core Values</h2>
          <p className="body-large text-charcoal-700 max-w-3xl mx-auto">
            These principles guide everything we do, from design to craftsmanship to customer experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center p-6 border border-gray-100 hover:border-gold transition-colors duration-300 group">
                <div className="w-16 h-16 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors duration-300">
                  <Icon className="text-gold group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="heading-4 text-charcoal-900 mb-3">{value.title}</h3>
                <p className="text-charcoal-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 section-padding section-spacing">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-charcoal-900 mb-6">Our Journey</h2>
          <p className="body-large text-charcoal-700 max-w-3xl mx-auto">
            Key milestones in our journey of creating timeless jewellery.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300 hidden md:block"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0 md:text-right' : 'md:pl-1/2 md:pr-0 md:text-left'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white z-10 hidden md:block"></div>
                
                <div className="bg-white p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="text-gold text-2xl font-serif font-bold">{milestone.year}</span>
                    <div className={`h-px flex-1 ${index % 2 === 0 ? 'ml-4 bg-gray-200' : 'mr-4 bg-gray-200'} md:hidden`}></div>
                  </div>
                  <h3 className="heading-4 text-charcoal-900 mb-3">{milestone.title}</h3>
                  <p className="text-charcoal-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding section-spacing">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-charcoal-900 mb-6">Meet Our Master Craftsmen</h2>
          <p className="body-large text-charcoal-700 max-w-3xl mx-auto">
            Our team of expert artisans brings decades of experience and passion to every piece.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Marco Bellini', role: 'Master Goldsmith', experience: '30+ years' },
            { name: 'Sophie Laurent', role: 'Gemstone Expert', experience: '25+ years' },
            { name: 'James Chen', role: 'Design Director', experience: '20+ years' },
            { name: 'Isabella Rossi', role: 'Quality Controller', experience: '15+ years' }
          ].map((member, index) => (
            <div key={index} className="text-center group">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gold text-2xl font-serif font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="heading-4 text-charcoal-900 mb-2">{member.name}</h3>
              <p className="text-gold font-medium mb-2">{member.role}</p>
              <p className="text-sm text-charcoal-500">{member.experience} experience</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white">
        <div className="section-padding py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">Experience Luxury</h2>
            <p className="text-xl text-gold-200 mb-8">
              Discover our collections and find the perfect piece that tells your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/collections" className="btn-primary bg-white text-charcoal-900 hover:bg-gray-100 inline-flex items-center justify-center">
                Explore Collections
                <FiChevronRight className="ml-2" />
              </a>
              <a href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-charcoal-900">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}