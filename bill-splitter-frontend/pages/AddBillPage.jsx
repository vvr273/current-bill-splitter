
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddBillPage() {
//   const { houseName } = useParams();
//   const navigate = useNavigate();
//   const [submeterPerson, setSubmeterPerson] = useState("");
//   const [nonSubmeterPerson, setNonSubmeterPerson] = useState("");
//   const [submeterReadings, setSubmeterReadings] = useState([
//     { month: "", reading: "" },
//   ]);
//   const [bills, setBills] = useState([
//     { month: "", billNumber: "", totalUnits: "", totalBill: "" },
//   ]);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState("");

//   const handleReadingChange = (i, k, v) => {
//     const arr = [...submeterReadings];
//     arr[i][k] = v;
//     setSubmeterReadings(arr);
//   };

//   const handleBillChange = (i, k, v) => {
//     const arr = [...bills];
//     arr[i][k] = v;
//     setBills(arr);
//   };

//   const validateInputs = () => {
//     if (!submeterPerson || !nonSubmeterPerson) return "Both names required.";
//     if (submeterReadings.length < 2) return "Minimum 2 submeter readings required.";
//     for (let r of submeterReadings) {
//       if (!r.month || !r.reading) return "All readings must be filled.";
//     }
//     for (let b of bills) {
//       if (!b.month || !b.billNumber || !b.totalUnits || !b.totalBill) return "All bill fields must be filled.";
//     }
//     return null;
//   };

//   const handleSubmit = async () => {
//     setError("");
//     const errMsg = validateInputs();
//     if (errMsg) {
//       setError(errMsg);
//       return;
//     }

//     try {
//       const res = await axios.post(`http://localhost:5000/api/add-bill/${houseName}`, {
//         fromMonth: submeterReadings[0].month,
//         toMonth: submeterReadings[submeterReadings.length - 1].month,
//         submeterPerson,
//         nonSubmeterPerson,
//         submeterReadings: submeterReadings.map(r => ({ month: r.month, reading: Number(r.reading) })),
//         bills: bills.map(b => ({
//           month: b.month,
//           billNumber: b.billNumber,
//           totalUnits: Number(b.totalUnits),
//           totalBill: Number(b.totalBill)
//         }))
//       });
//       setSummary(res.data.summary);
//     } catch (err) {
//       setError("Error saving bill. Please check the console.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add Bill – {houseName}</h1>

//       {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

//       <input className="w-full border p-2 rounded mb-2" placeholder="Submeter Person" value={submeterPerson} onChange={e => setSubmeterPerson(e.target.value)} />
//       <input className="w-full border p-2 rounded mb-4" placeholder="Non‑Submeter Person" value={nonSubmeterPerson} onChange={e => setNonSubmeterPerson(e.target.value)} />

//       <div className="mb-4">
//         <h2 className="font-semibold">Submeter Readings</h2>
//         {submeterReadings.map((r, i) => (
//           <div key={i} className="flex gap-2 mb-1">
//             <input type="month" className="border p-2 rounded" value={r.month} onChange={e => handleReadingChange(i, "month", e.target.value)} />
//             <input type="number" className="border p-2 rounded" placeholder="Reading" value={r.reading} onChange={e => handleReadingChange(i, "reading", e.target.value)} />
//           </div>
//         ))}
//         <button onClick={() => setSubmeterReadings([...submeterReadings, { month: "", reading: "" }])} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Reading</button>
//       </div>

//       <div className="mb-4">
//         <h2 className="font-semibold">Bill Entries</h2>
//         {bills.map((b, i) => (
//           <div key={i} className="grid grid-cols-4 gap-2 mb-1">
//             <input type="month" className="border p-2 rounded" value={b.month} onChange={e => handleBillChange(i, "month", e.target.value)} />
//             <input className="border p-2 rounded" placeholder="Bill No" value={b.billNumber} onChange={e => handleBillChange(i, "billNumber", e.target.value)} />
//             <input type="number" className="border p-2 rounded" placeholder="Units" value={b.totalUnits} onChange={e => handleBillChange(i, "totalUnits", e.target.value)} />
//             <input type="number" className="border p-2 rounded" placeholder="₹ Bill" value={b.totalBill} onChange={e => handleBillChange(i, "totalBill", e.target.value)} />
//           </div>
//         ))}
//         <button onClick={() => setBills([...bills, { month: "", billNumber: "", totalUnits: "", totalBill: "" }])} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Bill</button>
//       </div>

//       <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">Submit</button>

//       {summary && (
//         <div className="mt-6 bg-gray-100 p-4 rounded shadow">
//           <h2 className="text-lg font-bold mb-2">💡 Calculated Summary</h2>
//           <p>Total Units: {summary.totalUnits}</p>
//           <p>Total Bill: ₹{summary.totalBill}</p>
//           <p>{submeterPerson} (Submeter): ₹{summary.portion1Total}</p>
//           <p>{nonSubmeterPerson} (Non-Submeter): ₹{summary.portion2Total}</p>
//           <button onClick={() => navigate("/")} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded">⬅️ Back to Home</button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addBill } from "../api"; // 👈 import from api.js

export default function AddBillPage() {
  const { houseName } = useParams();
  const navigate = useNavigate();
  const [submeterPerson, setSubmeterPerson] = useState("");
  const [nonSubmeterPerson, setNonSubmeterPerson] = useState("");
  const [submeterReadings, setSubmeterReadings] = useState([{ month: "", reading: "" }]);
  const [bills, setBills] = useState([{ month: "", billNumber: "", totalUnits: "", totalBill: "" }]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleReadingChange = (i, k, v) => {
    const arr = [...submeterReadings];
    arr[i][k] = v;
    setSubmeterReadings(arr);
  };

  const handleBillChange = (i, k, v) => {
    const arr = [...bills];
    arr[i][k] = v;
    setBills(arr);
  };

  const validateInputs = () => {
    if (!submeterPerson || !nonSubmeterPerson) return "Both names required.";
    if (submeterReadings.length < 2) return "Minimum 2 submeter readings required.";
    for (let r of submeterReadings) {
      if (!r.month || !r.reading) return "All readings must be filled.";
    }
    for (let b of bills) {
      if (!b.month || !b.billNumber || !b.totalUnits || !b.totalBill) return "All bill fields must be filled.";
    }
    return null;
  };

  const handleSubmit = async () => {
    setError("");
    const errMsg = validateInputs();
    if (errMsg) {
      setError(errMsg);
      return;
    }

    try {
      const response = await addBill(houseName, {
        fromMonth: submeterReadings[0].month,
        toMonth: submeterReadings[submeterReadings.length - 1].month,
        submeterPerson,
        nonSubmeterPerson,
        submeterReadings: submeterReadings.map(r => ({
          month: r.month,
          reading: Number(r.reading)
        })),
        bills: bills.map(b => ({
          month: b.month,
          billNumber: b.billNumber,
          totalUnits: Number(b.totalUnits),
          totalBill: Number(b.totalBill)
        }))
      });

      if (response.success) {
        setSummary(response.summary);
      } else {
        setError("Error calculating bill: " + response.error);
      }
    } catch (err) {
      setError("Error saving bill. Please check the console.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Bill – {houseName}</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <input className="w-full border p-2 rounded mb-2" placeholder="Submeter Person" value={submeterPerson} onChange={e => setSubmeterPerson(e.target.value)} />
      <input className="w-full border p-2 rounded mb-4" placeholder="Non‑Submeter Person" value={nonSubmeterPerson} onChange={e => setNonSubmeterPerson(e.target.value)} />

      <div className="mb-4">
        <h2 className="font-semibold">Submeter Readings</h2>
        {submeterReadings.map((r, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input type="month" className="border p-2 rounded" value={r.month} onChange={e => handleReadingChange(i, "month", e.target.value)} />
            <input type="number" className="border p-2 rounded" placeholder="Reading" value={r.reading} onChange={e => handleReadingChange(i, "reading", e.target.value)} />
          </div>
        ))}
        <button onClick={() => setSubmeterReadings([...submeterReadings, { month: "", reading: "" }])} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Reading</button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Bill Entries</h2>
        {bills.map((b, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-1">
            <input type="month" className="border p-2 rounded" value={b.month} onChange={e => handleBillChange(i, "month", e.target.value)} />
            <input className="border p-2 rounded" placeholder="Bill No" value={b.billNumber} onChange={e => handleBillChange(i, "billNumber", e.target.value)} />
            <input type="number" className="border p-2 rounded" placeholder="Units" value={b.totalUnits} onChange={e => handleBillChange(i, "totalUnits", e.target.value)} />
            <input type="number" className="border p-2 rounded" placeholder="₹ Bill" value={b.totalBill} onChange={e => handleBillChange(i, "totalBill", e.target.value)} />
          </div>
        ))}
        <button onClick={() => setBills([...bills, { month: "", billNumber: "", totalUnits: "", totalBill: "" }])} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Bill</button>
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">Submit</button>

      {summary && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">💡 Calculated Summary</h2>
          <p>Total Units: {summary.totalUnits}</p>
          <p>Total Bill: ₹{summary.totalBill}</p>
          <p>{submeterPerson} (Submeter): ₹{summary.portion1Total}</p>
          <p>{nonSubmeterPerson} (Non-Submeter): ₹{summary.portion2Total}</p>
          <button onClick={() => navigate("/")} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded">⬅️ Back to Home</button>
        </div>
      )}
    </div>
  );
}
