import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HouseCard from "../components/HouseCard";

function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/houses");
        const data = await res.json();
        if (data.success) {
          setHouses(data.houses);
        }
      } catch (err) {
        console.error("Failed to fetch houses", err);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏠 Vishnu Current Bill Split</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house, idx) => (
          <HouseCard key={idx} house={house} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/add-home">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            ➕ Add New House
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
// Home.jsx
// This component fetches and displays a list of houses with their details.