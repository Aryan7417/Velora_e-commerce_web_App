import React from 'react';

export const FilterSidebar = ({ 
  selectedCategories, 
  onCategoryToggle, 
  maxPrice, 
  onPriceChange,
  availableCategories = ["Electronics", "Accessories", "Audio"] 
}) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-xl">
        {/* Categories Section */}
        <div>
          <h3 className="text-label-md font-label-md text-on-surface mb-md tracking-wider">CATEGORIES</h3>
          <ul className="space-y-sm">
            {availableCategories.map((category) => {
              const isChecked = selectedCategories.includes(category);
              return (
                <li key={category}>
                  <label className="flex items-center gap-sm cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onCategoryToggle(category)}
                      className="rounded border-outline text-primary focus:ring-primary h-4 w-4 bg-surface"
                    />
                    <span className="text-body-sm font-body-sm text-on-surface-variant group-hover:text-primary transition-colors">
                      {category}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price Range Section */}
        <div className="border-t border-outline-variant pt-lg">
          <h3 className="text-label-md font-label-md text-on-surface mb-md tracking-wider">PRICE RANGE</h3>
          <div className="space-y-md">
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={maxPrice}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="w-full accent-primary bg-surface-container h-1 rounded-full appearance-none outline-none cursor-pointer"
            />
            <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span>₹0</span>
              <span className="font-semibold text-primary">₹{maxPrice}</span>
              <span>₹1,000+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default FilterSidebar;
