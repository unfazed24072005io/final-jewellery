'use client';

import { useState } from 'react';
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 border border-gray-100">
      <div className="mb-8">
        <h3 className="heading-3 text-charcoal-900 mb-4">Send us a Message</h3>
        <p className="text-charcoal-600">
          Our team will respond to your inquiry within 24 hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800">
          <p className="font-medium">Thank you for your message!</p>
          <p className="text-sm mt-1">We'll get back to you shortly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="form-label">
              <div className="flex items-center">
                <FiUser className="mr-2 text-gold" size={16} />
                Full Name
              </div>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="form-label">
              <div className="flex items-center">
                <FiMail className="mr-2 text-gold" size={16} />
                Email Address
              </div>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="form-label">
              <div className="flex items-center">
                <FiPhone className="mr-2 text-gold" size={16} />
                Phone Number
              </div>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select a subject</option>
              <option value="inquiry">Product Inquiry</option>
              <option value="custom">Custom Design</option>
              <option value="repair">Repair Service</option>
              <option value="appraisal">Appraisal Service</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="form-label">
            <div className="flex items-center">
              <FiMessageSquare className="mr-2 text-gold" size={16} />
              Your Message
            </div>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="form-input resize-none"
            placeholder="Please provide details about your inquiry..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <FiSend className="ml-3" size={18} />
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-charcoal-500 pt-4 border-t border-gray-200">
          By submitting this form, you agree to our privacy policy. We respect your privacy and will never share your information with third parties.
        </p>
      </form>
    </div>
  );
}