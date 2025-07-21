// // import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function History() {
//   const { houseName } = useParams();
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/get-bills/${houseName}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         const bills = Object.entries(data.bills).map(([month, values]) => ({
//           month,
//           ...values,
//         }));

//         // Sort by actual month
//         bills.sort(
//           (a, b) => new Date("1 " + a.month) - new Date("1 " + b.month)
//         );

//         setHistory(bills);
//       }
//     } catch (err) {
//       console.error("Failed to fetch history", err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, [houseName]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">📜 Bill History</h1>

//       <div className="grid gap-4">
//         {history.map((item, index) => (
//           <div
//             key={index}
//             className="border rounded p-4 shadow bg-white hover:bg-gray-50"
//           >
//             <h2 className="text-xl font-semibold mb-2">🗓️ {item.month}</h2>
//             <p>
//               <strong>📄 Bill Number:</strong> {item.billNumber}
//             </p>
//             <p>
//               <strong>🔌 Total Units:</strong> {item.totalUnits} units
//             </p>
//             <p>
//               <strong>💰 Total Bill:</strong> ₹{item.totalBill}
//             </p>
//             <p>
//               <strong>👩🏻 {item.submeterPerson}:</strong> {item.portion1Units} units → ₹{item.portion1Bill}
//             </p>
//             <p>
//               <strong>👨🏻 {item.nonSubmeterPerson}:</strong> {item.portion2Units} units → ₹{item.portion2Bill}
//             </p>

//             {item.range && (
//               <p className="mt-2 italic text-gray-500">
//                 📆 Calculated for Range: {item.range.from} → {item.range.to}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default History;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function History() {
  const { houseName } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/house-history/${houseName}`);
        const result = await res.json();
        if (result.success) {
          setHistory(result.data.reverse()); // Show latest first
        }
      } catch (error) {
        console.error("History fetch error:", error);
      }
    };

    fetchHistory();
  }, [houseName]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📜 History for {houseName}
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No bills found for this home yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry, idx) => (
            <div key={idx} className="p-4 bg-white shadow rounded border">
              <h2 className="text-xl font-semibold mb-2">📅 {entry.month}</h2>
              <p><strong>📄 Bill No:</strong> {entry.billNumber}</p>
              <p><strong>🔌 Total Units:</strong> {entry.totalUnits}</p>
              <p><strong>💰 Total Bill:</strong> ₹{entry.totalBill}</p>
              <p><strong>👩🏻 {entry.submeterPerson} Units:</strong> {entry.portion1Units}</p>
              <p><strong>👩🏻 {entry.submeterPerson} Bill:</strong> ₹{entry.portion1Bill}</p>
              <p><strong>👨🏻 {entry.nonSubmeterPerson} Units:</strong> {entry.portion2Units}</p>
              <p><strong>👨🏻 {entry.nonSubmeterPerson} Bill:</strong> ₹{entry.portion2Bill}</p>
              <p><strong>📸 Submeter Reading:</strong> {entry.subLast} ➝ {entry.subCurrent}</p>
              <p><strong>📦 Unit Price:</strong> ₹{entry.unitPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
// History.jsx
// This component fetches and displays the bill history for a specific house.