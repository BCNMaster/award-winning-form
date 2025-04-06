import React, { useState, useEffect } from 'react';

const DesignStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const colorPalettes = [
    { id: 'blue_professional', name: 'Professional Blue', colors: ['#1a4b8c', '#2979c5', '#e8f1fa', '#f8fafd'] },
    { id: 'green_nature', name: 'Natural Green', colors: ['#2c7d3f', '#5cb270', '#e6f4e9', '#fbfefc'] },
    { id: 'red_bold', name: 'Bold Red', colors: ['#be1e2d', '#e74c3c', '#fadbd8', '#feefef'] },
    { id: 'purple_creative', name: 'Creative Purple', colors: ['#6a1b9a', '#9c27b0', '#e9d8f2', '#f9f4fb'] },
    { id: 'orange_vibrant', name: 'Vibrant Orange', colors: ['#d35400', '#f39c12', '#fae5cd', '#fef7ed'] },
    { id: 'teal_modern', name: 'Modern Teal', colors: ['#00796b', '#26a69a', '#daf2f0', '#f5fbfa'] },
    { id: 'gray_minimalist', name: 'Minimalist Gray', colors: ['#546e7a', '#90a4ae', '#eceff1', '#f7f9fa'] },
    { id: 'pink_playful', name: 'Playful Pink', colors: ['#c2185b', '#f06292', '#fce4ec', '#fff0f5'] },
    { id: 'custom', name: 'Custom Colors', colors: [] }
  ];
  
  const designStyles = [
    { id: 'minimal', label: 'Minimal and Clean' },
    { id: 'modern', label: 'Modern and Sleek' },
    { id: 'classic', label: 'Classic and Professional' },
    { id: 'bold', label: 'Bold and Impactful' },
    { id: 'playful', label: 'Playful and Fun' },
    { id: 'luxurious', label: 'Luxurious and Elegant' },
    { id: 'organic', label: 'Organic and Natural' },
    { id: 'tech', label: 'Tech-Focused and Innovative' },
    { id: 'retro', label: 'Retro or Vintage' },
    { id: 'corporate', label: 'Corporate and Formal' }
  ];

  const [localData, setLocalData] = useState({
    design: {
      colors: formData.design?.colors || [],
      styles: formData.design?.styles || [],
      references: formData.design?.references || []
    }
  });
  
  const [newReference, setNewReference] = useState('');
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { colors, styles } = localData.design;
    const complete = colors.length > 0 && styles.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle color palette selection
  const handleColorChange = (colorPaletteId) => {
    setLocalData(prev => ({
      ...prev,
      design: {
        ...prev.design,
        colors: [colorPaletteId]
      }
    }));
    
    if (errors.colors) {
      setErrors(prev => ({
        ...prev,
        colors: null
      }));
    }
  };
  
  // Handle design style selection
  const handleStyleChange = (styleId) => {
    setLocalData(prev => {
      const currentStyles = prev.design.styles;
      const updatedStyles = currentStyles.includes(styleId)
        ? currentStyles.filter(id => id !== styleId)
        : [...currentStyles, styleId];
        
      return {
        ...prev,
        design: {
          ...prev.design,
          styles: updatedStyles
        }
      };
    });
    
    if (errors.styles) {
      setErrors(prev => ({
        ...prev,
        styles: null
      }));
    }
  };
  
  // Handle adding a reference
  const handleAddReference = () => {
    if (newReference.trim() !== '') {
      setLocalData(prev => ({
        ...prev,
        design: {
          ...prev.design,
          references: [...prev.design.references, newReference.trim()]
        }
      }));
      setNewReference('');
    }
  };
  
  // Handle removing a reference
  const handleRemoveReference = (reference) => {
    setLocalData(prev => ({
      ...prev,
      design: {
        ...prev.design,
        references: prev.design.references.filter(ref => ref !== reference)
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (localData.design.colors.length === 0) newErrors.colors = 'Please select a color palette';
    if (localData.design.styles.length === 0) newErrors.styles = 'Please select at least one design style';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Award "Design Visionary" achievement
    addPoints(30, 'design');
    
    // Move to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Preferences</h3>
        <p className="text-gray-600">
          Share your design preferences so we can create a website that matches your brand identity and aesthetics.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color Palette <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">Select a color palette that best matches your brand</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorPalettes.map(palette => (
              <div
                key={palette.id}
                onClick={() => handleColorChange(palette.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  localData.design.colors.includes(palette.id) 
                    ? 'border-blue-500 ring-2 ring-blue-300' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="mb-2">
                  <h4 className="font-medium">{palette.name}</h4>
                </div>
                
                {palette.id !== 'custom' ? (
                  <div className="flex space-x-2">
                    {palette.colors.map((color, index) => (
                      <div 
                        key={index} 
                        className="h-8 w-8 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Custom color palette to be discussed
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {errors.colors && (
            <p className="text-sm text-red-500 mt-2">{errors.colors}</p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Design Style <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">Select design styles that appeal to you (up to 3)</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {designStyles.map(style => (
              <div
                key={style.id}
                className="flex items-start"
              >
                <input
                  type="checkbox"
                  id={`style-${style.id}`}
                  checked={localData.design.styles.includes(style.id)}
                  onChange={() => handleStyleChange(style.id)}
                  disabled={localData.design.styles.length >= 3 && !localData.design.styles.includes(style.id)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`style-${style.id}`}
                  className={`ml-2 block text-gray-700 cursor-pointer ${
                    localData.design.styles.length >= 3 && !localData.design.styles.includes(style.id)
                      ? 'opacity-50'
                      : ''
                  }`}
                >
                  {style.label}
                </label>
              </div>
            ))}
          </div>
          
          {errors.styles && (
            <p className="text-sm text-red-500 mt-2">{errors.styles}</p>
          )}
          
          {localData.design.styles.length >= 3 && (
            <p className="text-sm text-amber-600 mt-2">
              You've selected the maximum of 3 design styles
            </p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website References
            <span className="block text-xs font-normal text-gray-500 mt-1">Share URLs of websites you like (optional)</span>
          </label>
          
          <div className="flex mb-2">
            <input
              type="text"
              value={newReference}
              onChange={(e) => setNewReference(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={handleAddReference}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          
          {localData.design.references.length > 0 && (
            <ul className="space-y-2">
              {localData.design.references.map((reference, index) => (
                <li 
                  key={index}
                  className="bg-blue-50 p-3 rounded flex justify-between items-center"
                >
                  <a 
                    href={reference.startsWith('http') ? reference : `https://${reference}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {reference}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveReference(reference)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="mb-8 bg-blue-50 p-4 rounded border border-blue-100">
          <div className="flex items-start">
            <div className="text-2xl mr-3">🎨</div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Design Choices</h4>
              <p className="text-blue-700">
                Your design preferences will guide the visual direction of your website. We'll use these to create a cohesive and attractive design that represents your brand.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-6 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
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
          <div className="text-2xl mr-3">🎨</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Design Visionary" achievement and 30 points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStep;
