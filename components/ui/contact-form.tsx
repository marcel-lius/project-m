'use client'

import { useState } from 'react';
import Button from './button-corner';
import { validateEmail } from '@/lib/utils';

interface FormState {
  name: string;
  email: string;
  description: string;
}

interface ApiError {
  error: string;
  message: string;
}

interface ApiResponse {
  success?: boolean;
  message: string;
  error?: string;
  data?: {
    email: string;
    descriptionLength: number;
  };
}

export const ContactForm = ({ onSuccess, onClose }: { onSuccess?: () => void; onClose?: () => void }) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    // Validate name
    if (!formState.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    // Validate email
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formState.description.trim().length > 0 && formState.description.length > 5000) {
      newErrors.description =
        'Description must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          description: formState.description.trim(),
        }),
      });

      const data: ApiResponse | ApiError = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        setApiError(errorData.message || 'Failed to send message');
        return;
      }

      const successData = data as ApiResponse;
      setSuccessMessage(
        successData.message || 'Your message has been sent successfully!'
      );

      // Clear form on success
      setFormState({
        name: '',
        email: '',
        description: '',
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setApiError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gold-70 mb-2"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Your name"
          className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gold-70 mb-2"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="your@email.com"
          className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gold-70 mb-2"
        >
          Message <span className="text-foreground text-xs">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Tell me about your project or inquiry..."
          rows={4}
          className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none transition-colors ${
            errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-foreground">
          {formState.description.length} / 5000 characters
        </p>
      </div>

      {/* Error Message */}
      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>Error:</strong> {apiError}
          </p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Success!</strong> {successMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </form>
  );
};
