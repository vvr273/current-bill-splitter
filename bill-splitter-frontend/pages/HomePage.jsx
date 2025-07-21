
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHouses, addHouse, deleteHouse } from "../api";

export default function HomePage() {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const res = await getHouses();
    if (res.success) setHouses(res.houses);
    else alert("Failed to fetch houses");
  };

  const handleAdd = async () => {
    if (!newHouse.trim()) return;
    await addHouse(newHouse);
    setNewHouse("");
    fetchHouses();
  };

  const handleDelete = async (house) => {
    if (!window.confirm(`Delete ${house}?`)) return;
    await deleteHouse(house);
    fetchHouses();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🏠 Current Bill Splitter</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Enter House Name"
          value={newHouse}
          onChange={(e) => setNewHouse(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add House
        </button>
      </div>

      <div className="space-y-2">
        {houses.map((house) => (
          <div
            key={house}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <span>{house}</span>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/add-bill/${house}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                ➕ Add Bill
              </button>
              <button
                onClick={() => navigate(`/history/${house}`)}
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                📜 History
              </button>
              <button
                onClick={() => handleDelete(house)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
