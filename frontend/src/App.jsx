import React, { useState } from 'react';
import Catalog from './components/Catalog';
import OrderForm from './components/OrderForm';
import Login from './components/Login';
import Register from './components/Register';

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
  // 1. Add this "View" state to track which page the user is on
  const [view, setView] = useState('shop'); 

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    console.log("Cart updated:", cart.length + 1); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 2. Add a simple Navigation Bar at the top */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => setView('shop')}>
          99HomeFoods
        </h1>
        <div className="space-x-4">
          <button onClick={() => setView('shop')} className="text-gray-600 font-medium">Catalog</button>
          <button onClick={() => setView('login')} className="text-gray-600 font-medium">Login</button>
          <button onClick={() => setView('register')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">Sign Up</button>
        </div>
      </nav>

      {/* 3. The Logic: Show the Shop OR the Login OR the Register */}
      <main className="p-4">
        
        {view === 'shop' && (
          <>
            <Catalog 
              items={itemData} 
              onAddToCart={handleAddToCart} 
              cartCount={cart.length} 
            />
            {cart.length > 0 && (
              <OrderForm cart={cart} total={total} />
            )}
          </>
        )}

        {view === 'login' && <Login onLoginSuccess={() => setView('shop')} />}
        
        {view === 'register' && <Register onRegisterSuccess={() => setView('login')} />}

      </main>
    </div>
  );
}

export default App;