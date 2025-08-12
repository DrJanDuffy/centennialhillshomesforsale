import type React from 'react';
import { useState } from 'react';
import FormField from './FormField';
import PropertyTypeSelector from './PropertyTypeSelector';

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  timeline: string;
  message: string;
}

const ExampleFormUsage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const budgetOptions = [
    { value: '', label: 'Select budget range' },
    { value: 'under-400k', label: 'Under $400k' },
    { value: '400k-600k', label: '$400k - $600k' },
    { value: '600k-800k', label: '$600k - $800k' },
    { value: '800k-1m', label: '$800k - $1M' },
    { value: 'over-1m', label: 'Over $1M' },
  ];

  const timelineOptions = [
    { value: '', label: 'Select timeline' },
    { value: 'asap', label: 'ASAP' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'just-looking', label: 'Just Looking' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Property Inquiry Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            type="text"
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleChange('name', value as string)}
            required
            placeholder="Enter your full name"
          />

          <FormField
            type="email"
            id="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={(value) => handleChange('email', value as string)}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <FormField
          type="tel"
          id="phone"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={(value) => handleChange('phone', value as string)}
          placeholder="(555) 123-4567"
        />

        {/* Property Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PropertyTypeSelector
            value={formData.propertyType}
            onChange={(value) => handleChange('propertyType', value)}
            required
          />

          <FormField
            type="select"
            id="budget"
            name="budget"
            label="Budget Range"
            value={formData.budget}
            onChange={(value) => handleChange('budget', value as string)}
            options={budgetOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            type="select"
            id="timeline"
            name="timeline"
            label="Timeline"
            value={formData.timeline}
            onChange={(value) => handleChange('timeline', value as string)}
            options={timelineOptions}
          />
        </div>

        <FormField
          type="textarea"
          id="message"
          name="message"
          label="Additional Message"
          value={formData.message}
          onChange={(value) => handleChange('message', value as string)}
          placeholder="Tell us about your specific needs, preferences, or questions..."
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default ExampleFormUsage;
