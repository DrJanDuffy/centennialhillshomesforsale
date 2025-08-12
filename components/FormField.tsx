import type React from 'react';

interface FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea';
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  id,
  name,
  label,
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  placeholder,
  options = [],
  rows = 3,
  min,
  max,
  step,
}) => {
  const baseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed';

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={baseClasses}
            aria-label={label}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={`${baseClasses} resize-vertical`}
            aria-label={label}
          />
        );

      default:
        return (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={baseClasses}
            aria-label={label}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;
