import React, { useState } from 'react';

const OrderForm = ({ cart, total }) => {
  const [customer, setCustomer] = useState({ name: '', address: '', location: null });

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCustomer({ ...customer, location: `${position.coords.latitude},${position.coords.longitude}` });
        alert("Location captured! 📍");
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const discordPayload = {
      content: "🚀 **NEW ORDER RECEIVED!**",
      embeds: [{
        title: `Customer: ${customer.name}`,
        color: 5814783,
        fields: [
          { name: "🏠 Address", value: customer.address },
          { name: "📦 Items", value: cart.map(i => i.name).join(", ") },
          { name: "💰 Total", value: `$${total}`, inline: true },
          { name: "📍 Maps", value: customer.location ? `[Open in Google Maps](https://www.google.com/maps?q=${customer.location})` : "No GPS" }
        ]
      }]
    };

    // Replace the URL below with the one you copied from Discord
    await fetch("https://discord.com/api/webhooks/1489297803204235294/HKoQFY1N4_pLemwnrFh-2d5FcHBahd4ZewAKDzTEuSdOaaeOoj-_z76nvYTSHOiO1TZ0", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload)
    });

    alert("Order sent to Discord! Check your server. ✅");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Order Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Your Name" 
          className="w-full p-2 border rounded" 
          onChange={e => setCustomer({...customer, name: e.target.value})} 
          required 
        />
        <textarea 
          placeholder="Delivery Address" 
          className="w-full p-2 border rounded" 
          onChange={e => setCustomer({...customer, address: e.target.value})} 
          required 
        />
        <button type="button" onClick={getGeolocation} className="w-full bg-gray-200 py-2 rounded text-sm font-bold">
          {customer.location ? "📍 Location Saved" : "🎯 Share GPS Location"}
        </button>
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
          Place Order via Discord
        </button>
      </form>
    </div>
  );
};

// THIS LINE FIXES THE ERROR:
export default OrderForm;