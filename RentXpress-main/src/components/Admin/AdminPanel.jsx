import React, { useState, useEffect } from 'react';
import { db, uploadToCloudinary } from '../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const AdminPanel = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState(['All', 'SUV', 'MUV', 'Sedan']);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', category: 'All', imageFile: null });

  // Fetch Cars from Firestore
  const fetchCars = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchCars(); }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadToCloudinary(formData.imageFile);
    await addDoc(collection(db, "cars"), {
      name: formData.name,
      pricePerKm: formData.price, // Allows text like "₹15/km"
      category: formData.category,
      image: imageUrl
    });
    alert("Car Added Successfully!");
    fetchCars();
  };

  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    fetchCars();
  };

  return (
    <div style={{ padding: '20px', background: '#f4f4f4' }}>
      <h2>Rahi Travels - Admin Dashboard</h2>
      
      {/* Category Manager */}
      <section>
        <h3>Add New Section/Category</h3>
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Luxury" />
        <button onClick={() => setCategories([...categories, newCategory])}>Add Category</button>
      </section>

      {/* Add Car Form */}
      <form onSubmit={handleAddCar} style={{ marginTop: '20px' }}>
        <input type="text" placeholder="Car Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="text" placeholder="Price (e.g. 15/km or Negotiable)" required onChange={(e) => setFormData({...formData, price: e.target.value})} />
        <select onChange={(e) => setFormData({...formData, category: e.target.value})}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="file" onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})} />
        <button type="submit">Publish Car</button>
      </form>

      {/* List of Cars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        {cars.map(car => (
          <div key={car.id} style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
            <img src={car.image} width="100" alt={car.name} />
            <h4>{car.name} ({car.category})</h4>
            <p>Rate: {car.pricePerKm}</p>
            <button onClick={() => deleteCar(car.id)} style={{ color: 'red' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};