// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getHistory } from "../api";
// import Graph from "./Graph";

// export default function HistoryPage() {
//   const { houseName } = useParams();
//   const navigate = useNavigate();
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await getHistory(houseName);
//         setHistory(res.history || []);
//       } catch (err) {
//         alert("Failed to fetch history");
//         console.error(err);
//       }
//     };
//     fetchHistory();
//   }, [houseName]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">📜 History - {houseName}</h1>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-gray-600 text-white px-4 py-2 rounded"
//         >
//           ⬅ Back
//         </button>
//       </div>

//       {history.length === 0 ? (
//         <p>No history found.</p>
//       ) : (
//         <div className="space-y-4">
//           {history.map((item) => (
//             <div key={item.id} className="border p-4 rounded shadow-sm bg-white">
//               <h2 className="font-semibold text-lg">
//                 📅 {item.fromMonth} → {item.toMonth}
//               </h2>
//               <p className="mt-1 text-sm text-gray-600">
//                 🔌 Unit Price: ₹{item.unitPrice} per unit
//               </p>
//               <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
//                 <div className="bg-blue-50 p-3 rounded">
//                   <p className="font-medium">{item.submeterPerson}</p>
//                   <p>Units: {item.portion1Units}</p>
//                   <p>Bill: ₹{item.portion1Bill}</p>
//                 </div>
//                 <div className="bg-green-50 p-3 rounded">
//                   <p className="font-medium">{item.nonSubmeterPerson}</p>
//                   <p>Units: {item.portion2Units}</p>
//                   <p>Bill: ₹{item.portion2Bill}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-between items-center mb-4">
//   <h1 className="text-2xl font-bold">📜 History - {houseName}</h1>
//   <div className="flex gap-2">
//     <button
//       onClick={() => navigate("/")}
//       className="bg-gray-600 text-white px-4 py-2 rounded"
//     >
//       ⬅ Back
//     </button>
//     <button
//       onClick={() => navigate(`/graph/${houseName}`)}
//       className="bg-purple-600 text-white px-4 py-2 rounded"
//     >
//       📊 View Graph
//     </button>
//   </div>
// </div>

//         </div>
        
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistory } from "../api";

export default function HistoryPage() {
  const { houseName } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory(houseName);
        setHistory(res.history || []);
      } catch (err) {
        alert("Failed to fetch history");
        console.error(err);
      }
    };
    fetchHistory();
  }, [houseName]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📜 History - {houseName}</h1>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border p-4 rounded shadow-sm bg-white">
                <h2 className="font-semibold text-lg">
                  📅 {item.fromMonth} → {item.toMonth}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  🔌 Unit Price: ₹{item.unitPrice} per unit
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-medium">{item.submeterPerson}</p>
                    <p>Units: {item.portion1Units}</p>
                    <p>Bill: ₹{item.portion1Bill}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-medium">{item.nonSubmeterPerson}</p>
                    <p>Units: {item.portion2Units}</p>
                    <p>Bill: ₹{item.portion2Bill}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Button Row */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              ⬅ Back
            </button>
            <button
              onClick={() => navigate(`/graph/${houseName}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              📊 View Graph
            </button>
          </div>
        </>
      )}
    </div>
  );
}
