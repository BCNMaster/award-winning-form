import React, { useState, useEffect } from 'react';

const PersonalInfoStep = ({ formData, updateFormData, addPoints, goToNextStep }) => {
  const [localData, setLocalData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { firstName, lastName, email } = localData;
    const complete = firstName.trim() !== '' && 
                    lastName.trim() !== '' && 
                    email.trim() !== '' && 
                    validateEmail(email);
    setIsComplete(complete);
  }, [localData]);
  
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (!localData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!localData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!localData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(localData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data and proceed
    updateFormData(localData);
    
    // Award achievements and points
    let achievementPoints = 0;
    
    // Award "Started" achievement for beginning
    addPoints(10, 'started');
    
    // Award "Personal Connection" achievement for completing personal info
    addPoints(15, 'personal');
    
    // Move to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Let's Get Started!</h3>
        <p className="text-gray-600">
          We need some basic information to set up your project. This helps us customize the form to your needs.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={localData.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={localData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={localData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-8">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={localData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="(123) 456-7890"
          />
          <p className="mt-1 text-xs text-gray-500">
            We'll only use your phone number to contact you about your project if email fails.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-medium ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
            disabled={!isComplete}
          >
            Continue
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-blue-50 rounded p-4 border border-blue-100">
        <div className="flex items-start">
          <div className="text-2xl mr-3">💡</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Tip</h4>
            <p className="text-sm text-blue-700">
              Complete each section to earn points and unlock achievements that bring you special bonuses for your website project!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
