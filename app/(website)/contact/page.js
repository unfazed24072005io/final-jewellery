import ContactForm from '@/components/ContactForm';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiMessageSquare,
  FiChevronRight
} from 'react-icons/fi';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Our Boutique',
      details: ['123 Luxury Avenue', 'Diamond District', 'New York, NY 10001'],
      description: 'Visit our flagship boutique for a personalized experience.'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Available Monday to Friday, 9AM-7PM EST'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['contact@luxuryjewels.com', 'support@luxuryjewels.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: ['Mon-Fri: 10AM - 7PM', 'Sat: 11AM - 6PM', 'Sun: 12PM - 5PM'],
      description: 'By appointment only on Sundays'
    }
  ];

  const services = [
    'Custom Design Consultations',
    'Jewellery Repair & Restoration',
    'Gemstone Appraisal Services',
    'Private Viewings & Events',
    'Corporate Gifting Services'
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="section-padding section-spacing">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center text-gold font-medium text-sm tracking-wider uppercase mb-6">
              <FiMessageSquare className="mr-2" />
              Get in Touch
            </span>
            <h1 className="heading-1 text-charcoal-900 mb-6">
              Connect With Us
            </h1>
            <p className="body-large text-charcoal-700 mb-8">
              Our team of experts is here to assist you with any inquiries, 
              from custom designs to after-sales service.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white p-6 border border-gray-100 hover:border-gold transition-colors duration-300">
                <div className="w-12 h-12 bg-gold/10 rounded-none flex items-center justify-center mb-4">
                  <Icon className="text-gold" size={20} />
                </div>
                <h3 className="heading-4 text-charcoal-900 mb-4">{info.title}</h3>
                <div className="space-y-2 mb-3">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-charcoal-700">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-charcoal-500">{info.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Services & Info */}
          <div className="space-y-8">
            {/* Services */}
            <div className="bg-white p-6 border border-gray-100">
              <h3 className="heading-4 text-charcoal-900 mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <FiChevronRight className="text-gold mt-1 mr-3 flex-shrink-0" />
                    <span className="text-charcoal-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 border border-gray-100">
              <h3 className="heading-4 text-charcoal-900 mb-6">Frequently Asked</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-charcoal-900 mb-2">How long does custom design take?</h4>
                  <p className="text-sm text-charcoal-600">
                    Custom designs typically take 4-6 weeks from consultation to completion, depending on complexity.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-900 mb-2">Do you offer international shipping?</h4>
                  <p className="text-sm text-charcoal-600">
                    Yes, we ship worldwide with fully insured delivery and customs documentation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-900 mb-2">Can I schedule a private viewing?</h4>
                  <p className="text-sm text-charcoal-600">
                    Absolutely. Contact us to arrange a private appointment at our boutique.
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white p-6">
              <h3 className="heading-4 text-white mb-4">Visit Our Boutique</h3>
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiMapPin className="text-gold" size={24} />
                  </div>
                  <p className="text-gold-200 text-sm">Interactive Map</p>
                </div>
              </div>
              <p className="text-sm text-gold-200">
                Find us in the heart of Diamond District. Valet parking available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="section-padding py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-charcoal-900 mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl text-charcoal-700 mb-8">
              Call our dedicated client services team for priority support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="tel:+15551234567" className="btn-primary inline-flex items-center">
                <FiPhone className="mr-3" />
                Call Now: +1 (555) 123-4567
              </a>
              <a href="mailto:contact@luxuryjewels.com" className="btn-secondary">
                Email Priority Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}