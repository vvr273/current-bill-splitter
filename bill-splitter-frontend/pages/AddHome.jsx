// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddHome() {
//   const [houseName, setHouseName] = useState("");
//   const [submeterPerson, setSubmeterPerson] = useState("");
//   const [nonSubmeterPerson, setNonSubmeterPerson] = useState("");
//   const navigate = useNavigate();

//   const handleAddHome = async () => {
//     if (!houseName || !submeterPerson || !nonSubmeterPerson) {
//       alert("Please fill all the fields");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/add-home/${houseName}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ submeterPerson, nonSubmeterPerson }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("🏠 Home added successfully!");
//         navigate("/");
//       } else {
//         alert("❌ Failed to add home");
//       }
//     } catch (err) {
//       alert("⚠️ Backend error");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">➕ Add New Home</h2>

//       <div className="grid gap-4">
//         <input
//           className="border p-2 rounded"
//           placeholder="🏠 House Name"
//           value={houseName}
//           onChange={(e) => setHouseName(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded"
//           placeholder="👩 Submeter Person"
//           value={submeterPerson}
//           onChange={(e) => setSubmeterPerson(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded"
//           placeholder="👨 Other Person"
//           value={nonSubmeterPerson}
//           onChange={(e) => setNonSubmeterPerson(e.target.value)}
//         />

//         <button
//           onClick={handleAddHome}
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           ➕ Save Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddHome;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addHouse } from "../api"; // 👈 import from api.js

function AddHome() {
  const [houseName, setHouseName] = useState("");
  const [submeterPerson, setSubmeterPerson] = useState("");
  const [nonSubmeterPerson, setNonSubmeterPerson] = useState("");
  const navigate = useNavigate();

  const handleAddHome = async () => {
    if (!houseName || !submeterPerson || !nonSubmeterPerson) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await addHouse(houseName, {
        submeterPerson,
        nonSubmeterPerson
      });

      if (response.success) {
        alert("🏠 Home added successfully!");
        navigate("/");
      } else {
        alert("❌ Failed to add home");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Backend error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Home</h2>

      <div className="grid gap-4">
        <input
          className="border p-2 rounded"
          placeholder="🏠 House Name"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="👩 Submeter Person"
          value={submeterPerson}
          onChange={(e) => setSubmeterPerson(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="👨 Other Person"
          value={nonSubmeterPerson}
          onChange={(e) => setNonSubmeterPerson(e.target.value)}
        />

        <button
          onClick={handleAddHome}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ➕ Save Home
        </button>
      </div>
    </div>
  );
}

export default AddHome;
