'use client';

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Home,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export interface FUBFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  propertyInterest?: string;
  timeline?: string;
  budget?: string;
  preferredContact?: string;
  neighborhood?: string;
  propertyType?: string;
  source?: string;
  trigger?: string;
}

export interface FUBFormProps {
  onSubmit?: (data: FUBFormData) => void;
  className?: string;
  title?: string;
  description?: string;
  showPropertyFields?: boolean;
  showBudgetFields?: boolean;
  showTimelineFields?: boolean;
  formType?: 'lead' | 'contact' | 'inquiry';
  source?: string;
  trigger?: string;
  successMessage?: string;
  errorMessage?: string;
  submitButtonText?: string;
  theme?: 'blue' | 'green' | 'purple' | 'orange';
}

export const FollowUpBossForm: React.FC<FUBFormProps> = ({
  onSubmit,
  className = '',
  title = 'Get in Touch',
  description = 'Ready to find your dream home? Contact us for personalized assistance.',
  showPropertyFields = true,
  showBudgetFields = true,
  showTimelineFields = true,
  formType = 'lead',
  source = 'Website',
  trigger = 'Contact Form',
  successMessage = "Thank you! We'll contact you within 1 hour.",
  errorMessage = 'Something went wrong. Please try again.',
  submitButtonText = 'Submit',
  theme = 'blue',
}) => {
  const [formData, setFormData] = useState<FUBFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: 'buying',
    timeline: '1-3-months',
    budget: '500-750',
    preferredContact: 'any',
    neighborhood: 'Centennial Hills',
    propertyType: 'single-family',
    source,
    trigger,
  });

  const [errors, setErrors] = useState<Partial<FUBFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

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

  // Neighborhood options
  const neighborhoodOptions = [
    { value: 'Centennial Hills', label: 'Centennial Hills' },
    { value: 'Providence', label: 'Providence' },
    { value: 'Skye Canyon', label: 'Skye Canyon' },
    { value: 'Summerlin', label: 'Summerlin' },
    { value: 'Lone Mountain', label: 'Lone Mountain' },
    { value: 'Aliante', label: 'Aliante' },
    { value: 'Tule Springs', label: 'Tule Springs' },
    { value: 'El Dorado', label: 'El Dorado' },
    { value: 'Other', label: 'Other Area' },
  ];

  // Property type options
  const propertyTypeOptions = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'condo', label: 'Condominium' },
    { value: 'luxury', label: 'Luxury Estate' },
    { value: 'new-construction', label: 'New Construction' },
    { value: 'investment', label: 'Investment Property' },
    { value: 'land', label: 'Land/Building Lot' },
    { value: 'any', label: 'Any Type' },
  ];

  // Theme colors
  const themeColors = {
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'bg-blue-50 text-blue-800',
      accent: 'border-blue-200 focus:border-blue-500',
    },
    green: {
      primary: 'bg-green-600 hover:bg-green-700',
      secondary: 'bg-green-50 text-green-800',
      accent: 'border-green-200 focus:border-green-500',
    },
    purple: {
      primary: 'bg-purple-600 hover:bg-purple-700',
      secondary: 'bg-purple-50 text-purple-800',
      accent: 'border-purple-200 focus:border-purple-500',
    },
    orange: {
      primary: 'bg-orange-600 hover:bg-orange-700',
      secondary: 'bg-orange-50 text-orange-800',
      accent: 'border-orange-200 focus:border-orange-500',
    },
  };

  const currentTheme = themeColors[theme];

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FUBFormData> = {};

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
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (name: keyof FUBFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      setSubmitError('');

      try {
        // Determine API endpoint based on form type
        const endpoint = formType === 'lead' ? '/api/fub/create-lead' : '/api/fub/create-contact';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        });

        const result = await response.json();

        if (result.success) {
          setIsSubmitted(true);
          if (onSubmit) {
            onSubmit(formData);
          }

          // Track successful submission
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'form_submit', {
              event_category: 'Lead Generation',
              event_label: `${formType}_form`,
              value: 10,
            });
          }
        } else {
          setSubmitError(result.error || errorMessage);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitError('Network error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, formType, onSubmit, errorMessage]
  );

  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      propertyInterest: 'buying',
      timeline: '1-3-months',
      budget: '500-750',
      preferredContact: 'any',
      neighborhood: 'Centennial Hills',
      propertyType: 'single-family',
      source,
      trigger,
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
  }, [source, trigger]);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-xl p-8 text-center shadow-lg ${className}`}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-6">{successMessage}</p>

        <div className={`${currentTheme.secondary} rounded-lg p-4 mb-6`}>
          <p className="text-sm">
            <strong>Next Steps:</strong>
            <br />• Personal consultation call within 1 hour
            <br />• Custom property search based on your criteria
            <br />• Market analysis for your specific needs
            <br />• Expert guidance from Dr. Jan Duffy
          </p>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className={`${currentTheme.primary} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-8 shadow-lg ${className}`}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-${theme}-500 focus:border-${theme}-500 transition-colors ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-${theme}-500 focus:border-${theme}-500 transition-colors ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-${theme}-500 focus:border-${theme}-500 transition-colors ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-${theme}-500 focus:border-${theme}-500 transition-colors ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Property Interest Fields */}
        {showPropertyFields && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="propertyInterest"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Property Interest
                </label>
                <select
                  id="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {propertyInterestOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="neighborhood"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Preferred Neighborhood
                </label>
                <select
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {neighborhoodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Property Type
                </label>
                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="preferredContact"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {contactOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Budget and Timeline Fields */}
        {(showBudgetFields || showTimelineFields) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showBudgetFields && (
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Budget Range
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showTimelineFields && (
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Timeline
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Additional Information
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Tell us about your specific needs, preferences, or any questions you have..."
          />
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {submitError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${currentTheme.primary} text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {submitButtonText}
            </span>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to receive communications from Dr. Jan Duffy regarding
          your real estate inquiry. Your information will be kept confidential and used only for the
          purpose of assisting you with your real estate needs.
        </p>
      </form>
    </motion.div>
  );
};

export default FollowUpBossForm;
