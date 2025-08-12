import type React from 'react';

interface PropertyTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  value,
  onChange,
  className = '',
  label = 'Property Type',
  required = false,
  disabled = false,
}) => {
  const propertyTypes = [
    { value: '', label: 'Select property type' },
    { value: 'single-family', label: 'Single Family' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'new-construction', label: 'New Construction' },
    { value: 'investment', label: 'Investment Property' },
  ];

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor="propertyType" className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id="propertyType"
        name="propertyType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Select property type"
      >
        {propertyTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PropertyTypeSelector;
