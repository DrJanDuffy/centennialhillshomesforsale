'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { EnhancedButton, EnhancedFormField } from './EnhancedAnimations';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest?: string;
  timeline?: string;
  budget?: string;
  preferredContact?: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
  showPropertyFields?: boolean;
  title?: string;
  description?: string;
}

export const EnhancedContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = '',
  showPropertyFields = false,
  title = 'Get in Touch',
  description = 'Ready to find your dream home? Contact us for personalized assistance.',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Property interest options
  const propertyInterestOptions = [
    { value: 'buying', label: 'Buying a Home' },
    { value: 'selling', label: 'Selling a Home' },
    { value: 'investing', label: 'Real Estate Investment' },
    { value: 'renting', label: 'Renting a Property' },
    { value: 'general', label: 'General Inquiry' },
  ];

  // Timeline options
  const timelineOptions = [
    { value: 'immediate', label: 'Immediately (0-30 days)' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: 'planning', label: 'Just planning ahead' },
  ];

  // Budget options
  const budgetOptions = [
    { value: '300-500', label: '$300K - $500K' },
    { value: '500-750', label: '$500K - $750K' },
    { value: '750-1000', label: '$750K - $1M' },
    { value: '1000-1500', label: '$1M - $1.5M' },
    { value: '1500+', label: '$1.5M+' },
    { value: 'undecided', label: 'Not sure yet' },
  ];

  // Preferred contact options
  const contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'text', label: 'Text Message' },
    { value: 'any', label: 'Any method' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call parent callback if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Show success state
      setIsSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 5000);
    } catch (error) {
      console.error('Form submission failed:', error);
      // Handle error state
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 bg-green-50 rounded-2xl"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-600 mb-4">
          Thank you for contacting us. Dr. Jan Duffy will get back to you within 24 hours.
        </p>
        <EnhancedButton onClick={() => setIsSubmitted(false)} variant="outline" size="lg">
          Send Another Message
        </EnhancedButton>
      </motion.div>
    );
  }

  return (
    <div className={`enhanced-contact-form ${className}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-blue-50 rounded-xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
            <p className="text-blue-600">(702) 555-0123</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <p className="text-blue-600">jan@centennialhillshomesforsale.com</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Office</h3>
            <p className="text-blue-600">Centennial Hills, Las Vegas</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <EnhancedFormField
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
              placeholder="Enter your first name"
              required
              error={errors.firstName}
            />

            <EnhancedFormField
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
              placeholder="Enter your last name"
              required
              error={errors.lastName}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <EnhancedFormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="Enter your email address"
              required
              error={errors.email}
            />

            <EnhancedFormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              required
              error={errors.phone}
            />
          </div>

          {/* Property Interest Fields */}
          {showPropertyFields && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg"
            >
              <EnhancedFormField
                label="Property Interest"
                name="propertyInterest"
                type="select"
                value={formData.propertyInterest || ''}
                onChange={(value) => handleInputChange('propertyInterest', value)}
                options={propertyInterestOptions}
                placeholder="What are you looking for?"
              />

              <EnhancedFormField
                label="Timeline"
                name="timeline"
                type="select"
                value={formData.timeline || ''}
                onChange={(value) => handleInputChange('timeline', value)}
                options={timelineOptions}
                placeholder="When do you plan to move?"
              />

              <EnhancedFormField
                label="Budget Range"
                name="budget"
                type="select"
                value={formData.budget || ''}
                onChange={(value) => handleInputChange('budget', value)}
                options={budgetOptions}
                placeholder="What's your budget?"
              />
            </motion.div>
          )}

          {/* Message */}
          <EnhancedFormField
            label="Message"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={(value) => handleInputChange('message', value)}
            placeholder="Tell us about your real estate needs, questions, or how we can help you..."
            required
            error={errors.message}
          />

          {/* Preferred Contact Method */}
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contactOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={option.value}
                    checked={formData.preferredContact === option.value}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <EnhancedButton
              type="submit"
              loading={isSubmitting}
              variant="primary"
              size="lg"
              className="min-w-[200px]"
              disabled={isSubmitting}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </EnhancedButton>
          </div>

          {/* Privacy Notice */}
          <div className="text-center text-sm text-gray-500">
            <p>
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              . We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EnhancedContactForm;
