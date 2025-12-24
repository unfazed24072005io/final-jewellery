'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    material: true,
    price: true,
    collection: false,
  });

  const categories = [
    { name: 'Rings', count: 24 },
    { name: 'Necklaces', count: 18 },
    { name: 'Earrings', count: 32 },
    { name: 'Bracelets', count: 15 },
    { name: 'Watches', count: 12 },
  ];

  const materials = [
    { name: 'Yellow Gold', count: 28 },
    { name: 'White Gold', count: 22 },
    { name: 'Rose Gold', count: 16 },
    { name: 'Platinum', count: 14 },
    { name: 'Sterling Silver', count: 8 },
  ];

  const collections = [
    { name: 'Bridal Collection', count: 15 },
    { name: 'Signature Collection', count: 24 },
    { name: 'Limited Edition', count: 8 },
    { name: 'Everyday Luxury', count: 19 },
  ];

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-charcoal-900">Filters</h3>
        <FiFilter className="text-gold" size={20} />
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleFilter('category')}
          className="flex items-center justify-between w-full text-left text-charcoal-900 font-medium mb-4"
        >
          <span>Categories</span>
          {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedFilters.category && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="ml-3 text-charcoal-700 group-hover:text-charcoal-900">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm text-charcoal-500 bg-gray-100 px-2 py-1 rounded">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Materials Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleFilter('material')}
          className="flex items-center justify-between w-full text-left text-charcoal-900 font-medium mb-4"
        >
          <span>Materials</span>
          {expandedFilters.material ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedFilters.material && (
          <div className="space-y-3">
            {materials.map((material) => (
              <label key={material.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="ml-3 text-charcoal-700 group-hover:text-charcoal-900">
                    {material.name}
                  </span>
                </div>
                <span className="text-sm text-charcoal-500 bg-gray-100 px-2 py-1 rounded">
                  {material.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleFilter('price')}
          className="flex items-center justify-between w-full text-left text-charcoal-900 font-medium mb-4"
        >
          <span>Price Range</span>
          {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedFilters.price && (
          <div className="space-y-4">
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm text-charcoal-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span className="font-medium text-gold">{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      {/* Collections Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleFilter('collection')}
          className="flex items-center justify-between w-full text-left text-charcoal-900 font-medium mb-4"
        >
          <span>Collections</span>
          {expandedFilters.collection ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {expandedFilters.collection && (
          <div className="space-y-3">
            {collections.map((collection) => (
              <label key={collection.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="ml-3 text-charcoal-700 group-hover:text-charcoal-900">
                    {collection.name}
                  </span>
                </div>
                <span className="text-sm text-charcoal-500 bg-gray-100 px-2 py-1 rounded">
                  {collection.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button className="btn-primary w-full">
          Apply Filters
        </button>
        <button className="btn-outline w-full">
          Clear All
        </button>
      </div>
    </div>
  );
}