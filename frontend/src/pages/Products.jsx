import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('Featured');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync initial URL category parameter
  useEffect(() => {
    if (filterParam) {
      if (filterParam === 'Sale') {
        // Special case: Deals
        setSelectedCategories([]);
      } else {
        setSelectedCategories([filterParam]);
      }
      setCurrentPage(1);
    } else {
      setSelectedCategories(["Electronics", "Accessories", "Audio"]);
    }
  }, [filterParam]);

  const handleCategoryToggle = (category) => {
    setCurrentPage(1);
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (val) => {
    setCurrentPage(1);
    setMaxPrice(val);
  };

  const handleSortChange = (e) => {
    setCurrentPage(1);
    setSortBy(e.target.value);
  };

  // Filter logic
  let filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    // Price match
    const priceMatch = product.price <= maxPrice;

    // Special Deal parameter
    const dealMatch = filterParam !== 'Sale' || product.isSale || product.oldPrice;

    return categoryMatch && priceMatch && dealMatch;
  });

  // Sort logic
  let sortedProducts = [...filteredProducts];
  if (sortBy === 'Price: Low to High') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'Newest Arrivals') {
    sortedProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } // Featured leaves original array order

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-2xl flex flex-col md:flex-row gap-xl md:gap-3xl">
      {/* Sidebar Filters */}
      <FilterSidebar 
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
      />

      {/* Catalog Grid */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-xl">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              {filterParam === 'Sale' ? 'Exclusive Deals' : 'Premium Electronics'}
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} results
            </p>
          </div>
          
          <div className="flex items-center gap-sm">
            <span className="text-body-sm font-body-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
            <select 
              value={sortBy}
              onChange={handleSortChange}
              className="bg-surface border border-outline-variant rounded-md text-body-sm font-body-sm py-xs pl-sm pr-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-2xl border border-outline-variant/30 rounded-xl bg-surface-container-low">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-50 mb-md">
              sentiment_dissatisfied
            </span>
            <h3 className="text-headline-md text-on-surface font-semibold">No products found</h3>
            <p className="text-body-md text-on-surface-variant mt-2">Try adjusting your filters or price limit.</p>
            <button 
              onClick={() => {
                setSelectedCategories(["Electronics", "Accessories", "Audio"]);
                setMaxPrice(1000);
                setSearchParams({});
              }}
              className="mt-md bg-primary hover:bg-primary-container text-on-primary text-label-md px-lg py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-2xl flex justify-center items-center gap-sm">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-sm text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Previous Page"
            >
              <span className="material-symbols-outlined block">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, idx) => (
              <button 
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 rounded-lg text-body-sm font-body-sm font-bold flex items-center justify-center transition-colors ${
                  currentPage === idx + 1 
                    ? 'bg-primary text-on-primary' 
                    : 'hover:bg-surface-container-low text-on-surface'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-sm text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Next Page"
            >
              <span className="material-symbols-outlined block">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
export default Products;
