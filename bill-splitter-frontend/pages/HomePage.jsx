// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const [houseName, setHouseName] = useState("");
//   const [houses, setHouses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/houses");
//         setHouses(res.data.houses || []);
//       } catch (err) {
//         console.error("Error fetching houses");
//       }
//     };
//     fetchHouses();
//   }, []);

//   const handleAddHouse = async () => {
//     if (!houseName.trim()) return;
//     try {
//       await axios.post(`http://localhost:5000/api/add-house/${houseName}`);
//       navigate(`/add-bill/${houseName}`);
//     } catch (err) {
//       alert("Failed to add house");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-600 text-white text-center py-6">
//         <h1 className="text-3xl font-bold">⚡ Current Bill Splitter</h1>
//         <p className="text-sm mt-2">Split electricity bills easily using submeters</p>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-xl mx-auto mt-8 px-4 space-y-6">
//         {/* Add House */}
//         <div className="bg-white rounded shadow p-4 space-y-3">
//           <h2 className="text-xl font-semibold">🏠 Add New House</h2>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter house name"
//               value={houseName}
//               onChange={(e) => setHouseName(e.target.value)}
//               className="flex-1 px-3 py-2 rounded border"
//             />
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={handleAddHouse}
//             >
//               ➕ Add
//             </button>
//           </div>
//         </div>

//         {/* Existing Houses */}
//         <div className="bg-white rounded shadow p-4 space-y-3">
//           <h2 className="text-xl font-semibold">🏘️ Existing Houses</h2>
//           {houses.length === 0 ? (
//             <p className="text-gray-500">No houses found.</p>
//           ) : (
//             houses.map((house) => (
//               <div
//                 key={house}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <span>{house}</span>
//                 <button
//                   onClick={() => navigate(`/add-bill/${house}`)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   ➡ Add Bill
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
// ✅ HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const res = await axios.get("http://localhost:5000/api/houses");
    setHouses(res.data.houses);
  };

  const handleAdd = async () => {
    if (!newHouse) return;
    await axios.post(`http://localhost:5000/api/add-house/${newHouse}`);
    setNewHouse("");
    fetchHouses();
  };

  const handleDelete = async (house) => {
    if (!window.confirm(`Delete ${house}?`)) return;
    await axios.delete(`http://localhost:5000/api/delete-house/${house}`);
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
