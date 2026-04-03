import React from 'react';

const ItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="group relative border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {/* Image Placeholder */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
        <img
          src={item.image_url || 'https://via.placeholder.com/300'}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{item.name}</h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.description}</p>
        </div>
        <p className="text-sm font-bold text-gray-900">${item.price}</p>
      </div>

      <button
        onClick={() => onAddToCart(item)}
        className="mt-4 w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors active:scale-95"
      >
        Add to Order
      </button>
    </div>
  );
};

export default ItemCard;