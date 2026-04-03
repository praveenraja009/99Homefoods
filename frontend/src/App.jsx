import React, { useState } from 'react';
import Catalog from './components/Catalog';
import OrderForm from './components/OrderForm';

const itemData = [
  { id: 1, name: "Idli Batter", price: 150, description: "Elegant timeless piece.", image_url: "/images/idli.png" },
  { id: 2, name: "Minapa Dosa Batter", price: 85, description: "Handcrafted Italian leather.", image_url: "/images/dosa.png" },
  { id: 3, name: "Ragi Idli batter", price: 150, description: "Elegant timeless piece.", image_url: "/images/ragi_idli.png" },
  { id: 4, name: "Ragi Dosa Batter", price: 85, description: "Handcrafted Italian leather.", image_url: "/images/ragi_dosa.png" },
  { id: 5, name: "Millets Idli Batter", price: 150, description: "Elegant timeless piece.", image_url: "/images/millets_idli.png" },
  { id: 6, name: "Millets Dosa Batter", price: 85, description: "Handcrafted Italian leather.", image_url: "/images/millets_dosa.png" },
  { id: 7, name: "Pesarattu Batter", price: 150, description: "Elegant timeless piece.", image_url: "/images/pesarattu.png" },
  { id: 8, name: "Vada Batter", price: 85, description: "Handcrafted Italian leather.", image_url: "/images/vada.png" },
  { id: 9, name: "Instant Chutney mix", price: 150, description: "Elegant timeless piece.", image_url: "/images/chutney.png" },
  // Add as many as you want!
];

function App() {
  const [cart, setCart] = useState([]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const handleAddToCart = (item) => {
    // We use the spread operator to create a NEW array, 
    // which triggers React to re-render the page.
    setCart([...cart, item]);
    console.log("Cart updated:", cart.length + 1); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pass the cart length as a prop called cartCount */}
      <Catalog 
        items={itemData} 
        onAddToCart={handleAddToCart} 
        cartCount={cart.length} 
      />
      
      {cart.length > 0 && <OrderForm cart={cart} total={cart.reduce((s, i) => s + i.price, 0)} />}
    </div>
  );
}

export default App;