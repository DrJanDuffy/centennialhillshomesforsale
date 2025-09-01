'use client';

import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact: string;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const propertyTypes = [
  'Single Family Home',
  'Townhouse',
  'Condominium',
  'Luxury Estate',
  'Investment Property',
  'Land',
  'Other',
];

const budgetRanges = [
  'Under $500K',
  '$500K - $750K',
  '$750K - $1M',
  '$1M - $1.5M',
  '$1.5M - $2M',
  '$2M+',
];

const timelineOptions = [
  'Immediately',
  'Within 30 days',
  'Within 3 months',
  'Within 6 months',
  'Just exploring',
  'No specific timeline',
];

const preferredContactMethods = ['Phone', 'Email', 'Text', 'Any method'];

export default function EnhancedContactForm() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string>('');

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      }
      case 'phone': {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/[\s\-()]/g, ''))
          ? ''
          : 'Please enter a valid phone number';
      }
      case 'propertyType':
        return value ? '' : 'Please select a property type';
      case 'budget':
        return value ? '' : 'Please select a budget range';
      case 'timeline':
        return value ? '' : 'Please select a timeline';
      case 'preferredContact':
        return value ? '' : 'Please select a preferred contact method';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const error = validateField(name, typeof value === 'string' ? value : '');
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'message' && key !== 'newsletter') {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        timeline: '',
        message: '',
        preferredContact: '',
        newsletter: false,
      });
    }, 5000);
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none
    ${
      activeField === fieldName
        ? 'border-blue-500 ring-4 ring-blue-500/20'
        : errors[fieldName]
          ? 'border-red-500 ring-4 ring-red-500/20'
          : 'border-gray-300 dark:border-gray-600'
    }
    ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
    ${isDark ? 'focus:bg-gray-700' : 'focus:bg-blue-50'}
  `;

  const labelClasses = (fieldName: string) => `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${
      activeField === fieldName
        ? 'text-blue-600 dark:text-blue-400'
        : errors[fieldName]
          ? 'text-red-600 dark:text-red-400'
          : 'text-gray-700 dark:text-gray-300'
    }
  `;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircleIcon className="w-12 h-12 text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Your message has been sent successfully. Dr. Jan Duffy will contact you within 24 hours to
          discuss your real estate needs.
        </p>
      </motion.div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to find your dream home in Centennial Hills? Let's start the conversation. Fill
            out the form below and Dr. Jan Duffy will personally reach out to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className={labelClasses('firstName')}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onFocus={() => setActiveField('firstName')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('firstName')}
                    placeholder="Enter your first name"
                  />
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClasses('lastName')}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onFocus={() => setActiveField('lastName')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('lastName')}
                    placeholder="Enter your last name"
                  />
                  <AnimatePresence>
                    {errors.lastName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.lastName}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className={labelClasses('email')}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('email')}
                    placeholder="your.email@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses('phone')}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => setActiveField('phone')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('phone')}
                    placeholder="(702) 555-0123"
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Property Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="propertyType" className={labelClasses('propertyType')}>
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    onFocus={() => setActiveField('propertyType')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('propertyType')}
                  >
                    <option value="">Select type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.propertyType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.propertyType}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="budget" className={labelClasses('budget')}>
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    onFocus={() => setActiveField('budget')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('budget')}
                  >
                    <option value="">Select budget</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.budget && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.budget}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="timeline" className={labelClasses('timeline')}>
                    Timeline *
                  </label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    onFocus={() => setActiveField('timeline')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('timeline')}
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.timeline && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.timeline}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="message" className={labelClasses('message')}>
                  Additional Details
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField('')}
                  rows={4}
                  className={inputClasses('message')}
                  placeholder="Tell us more about your requirements, preferred neighborhoods, or any specific features you're looking for..."
                />
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredContact" className={labelClasses('preferredContact')}>
                    Preferred Contact Method *
                  </label>
                  <select
                    id="preferredContact"
                    value={formData.preferredContact}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    onFocus={() => setActiveField('preferredContact')}
                    onBlur={() => setActiveField('')}
                    className={inputClasses('preferredContact')}
                  >
                    <option value="">Select method</option>
                    {preferredContactMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.preferredContact && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm"
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.preferredContact}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      Subscribe to our newsletter for market updates and exclusive listings
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                    text-white font-semibold text-lg rounded-lg transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg hover:shadow-xl transform hover:-translate-y-1
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
