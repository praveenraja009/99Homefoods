import React from 'react';
import ItemCard from './ItemCard';

// Receive onAddToCart as a prop from App.jsx
const Catalog = ({ items, onAddToCart, cartCount }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Our Collection</h2>
        <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
          🛒 {cartCount} Items
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart} // Passing the function down
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;