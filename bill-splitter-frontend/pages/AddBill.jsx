// import { getHouses, addHouse, deleteHouse } from "../api";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// const apiUrl = `${import.meta.env.VITE_API_BASE}/api/houses`;

// const response = await fetch(apiUrl);
// const data = await response.json();


// function AddBill() {
//   const { houseName } = useParams();

//   const [range, setRange] = useState({ from: "", to: "" });
//   const [subLastReading, setSubLastReading] = useState("");
//   const [submeterName, setSubmeterName] = useState("");
//   const [nonSubmeterName, setNonSubmeterName] = useState("");

//   const [form, setForm] = useState([
//     {
//       month: "",
//       billNumber: "",
//       totalUnits: "",
//       totalBill: "",
//       subCurrent: "",
//     },
//   ]);

//   const [result, setResult] = useState(null);

//   const handleRangeChange = (e) => {
//     setRange({ ...range, [e.target.name]: e.target.value });
//   };

//   const handleChange = (index, field, value) => {
//     const newForm = [...form];
//     newForm[index][field] = value;
//     setForm(newForm);
//   };

//   const addMonthRow = () => {
//     setForm([
//       ...form,
//       {
//         month: "",
//         billNumber: "",
//         totalUnits: "",
//         totalBill: "",
//         subCurrent: "",
//       },
//     ]);
//   };

//   const handleSubmit = async () => {
//     const bills = form.map((month) => ({
//       month: month.month,
//       billNumber: month.billNumber,
//       totalUnits: parseFloat(month.totalUnits),
//       totalBill: parseFloat(month.totalBill),
//     }));

//     const lastMonth = form[form.length - 1];
//     const subCurrentReading = parseFloat(lastMonth.subCurrent);

//     try {
//       const response = await fetch(`http://localhost:5000/api/add-bill/${houseName}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromMonth: range.from,
//           toMonth: range.to,
//           subLastReading: parseFloat(subLastReading),
//           subCurrentReading,
//           submeterPerson: submeterName,
//           nonSubmeterPerson: nonSubmeterName,
//           bills,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setResult(data.data);
//         alert("✅ Bill range calculated and saved successfully!");
//       } else {
//         alert("❌ Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("🚨 Backend connection failed");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">➕ Add Bill for Range</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           name="from"
//           placeholder="🗓️ From Month (e.g. June 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="to"
//           placeholder="🗓️ To Month (e.g. August 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//       </div>

//       <input
//         type="number"
//         placeholder="📉 Submeter Previous Reading"
//         onChange={(e) => setSubLastReading(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       <input
//         type="text"
//         placeholder="👩 Submeter Person Name"
//         onChange={(e) => setSubmeterName(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <input
//         type="text"
//         placeholder="👨 Other Person Name"
//         onChange={(e) => setNonSubmeterName(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       {form.map((month, index) => (
//         <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
//           <h2 className="font-semibold mb-2">🗓️ Month {index + 1}</h2>
//           <input
//             className="border p-2 rounded mb-2 w-full"
//             placeholder="Month (e.g. June 2024)"
//             value={month.month}
//             onChange={(e) => handleChange(index, "month", e.target.value)}
//           />
//           <input
//             className="border p-2 rounded mb-2 w-full"
//             placeholder="📄 Bill Number"
//             onChange={(e) => handleChange(index, "billNumber", e.target.value)}
//           />
//           <input
//             type="number"
//             className="border p-2 rounded mb-2 w-full"
//             placeholder="🔌 Total Units"
//             onChange={(e) => handleChange(index, "totalUnits", e.target.value)}
//           />
//           <input
//             type="number"
//             className="border p-2 rounded mb-2 w-full"
//             placeholder="💰 Total Bill ₹"
//             onChange={(e) => handleChange(index, "totalBill", e.target.value)}
//           />
//           <input
//             type="number"
//             className="border p-2 rounded w-full"
//             placeholder="📸 Submeter Current"
//             onChange={(e) => handleChange(index, "subCurrent", e.target.value)}
//           />
//         </div>
//       ))}

//       <button
//         onClick={addMonthRow}
//         className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         ➕ Add Another Month
//       </button>

//       <button
//         onClick={handleSubmit}
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
//       >
//         ✅ Save & Calculate
//       </button>

//       {result && (
//         <div className="mt-8 p-4 bg-gray-50 rounded shadow">
//           <h2 className="text-xl font-semibold mb-2">📊 Summary</h2>
//           <p><strong>{submeterName} Paid:</strong> ₹{result.portion1Total}</p>
//           <p><strong>{nonSubmeterName} Paid:</strong> ₹{result.portion2Total}</p>
//           <p><strong>Total Bill:</strong> ₹{result.total}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddBill;
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { calculateBillSplit } from "../utils/calculateBillSplit";
import { addBill } from "../api";

export default function AddBillPage() {
  const { houseName } = useParams();          // URL /add-bill/:houseName
  const navigate = useNavigate();

  // ────────────────────────── state ──────────────────────────
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [rows, setRows] = useState([]);       // table rows
  const [calc, setCalc] = useState(null);     // { monthly, totals }
  const [error, setError] = useState("");

  // helper: build YYYY‑MM list
  const makeRange = (start, end) => {
    const out = [];
    const d = new Date(start + "-01");
    const last = new Date(end + "-01");
    while (d <= last) {
      out.push(d.toISOString().slice(0, 7));
      d.setMonth(d.getMonth() + 1);
    }
    return out;
  };

  // generate rows after user picks range
  const handleGenerate = () => {
    if (!fromMonth || !toMonth) {
      setError("Select both From and To months");
      return;
    }
    setRows(
      makeRange(fromMonth, toMonth).map((m) => ({
        month: m,
        mainUnits: "",
        mainBill: "",
        sub: "",
      }))
    );
    setCalc(null);
    setError("");
  };

  // update cell
  const updateCell = (idx, key, value) => {
    const copy = [...rows];
    copy[idx][key] = value;
    setRows(copy);
  };

  // validate & calculate
  const handleCalculate = () => {
    if (rows.some((r) => !r.mainUnits || !r.mainBill)) {
      setError("Fill main units and bill for every month");
      return;
    }
    const { monthly, totals } = calculateBillSplit(rows);
    setCalc({ monthly, totals });
    setError("");
  };

  // send to backend
  const handleSave = async () => {
    if (!calc) return;
    const payload = {
      months: rows,            // raw user inputs
      breakdown: calc.monthly, // month‑wise split
      summary: calc.totals,    // final totals
    };
    const res = await addBill(houseName, payload);
    if (res.success) navigate(`/history/${houseName}`);
    else alert("Backend error: " + (res.error || "unknown"));
  };

  // ────────────────────────── render ──────────────────────────
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Bill – {houseName}</h1>

      {/* Pick range */}
      <div className="flex gap-4 mb-4">
        <label>
          From&nbsp;
          <input type="month" value={fromMonth} onChange={(e) => setFromMonth(e.target.value)} />
        </label>
        <label>
          To&nbsp;
          <input type="month" value={toMonth} onChange={(e) => setToMonth(e.target.value)} />
        </label>
        <button className="bg-blue-600 text-white px-3 rounded" onClick={handleGenerate}>
          Generate Months
        </button>
      </div>

      {/* rows table */}
      {rows.length > 0 && (
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th>Month</th>
              <th>Main Units</th>
              <th>Main Bill ₹</th>
              <th>Submeter Reading</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.month}>
                <td>{r.month}</td>
                <td>
                  <input
                    type="number"
                    value={r.mainUnits}
                    onChange={(e) => updateCell(idx, "mainUnits", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={r.mainBill}
                    onChange={(e) => updateCell(idx, "mainBill", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={r.sub}
                    onChange={(e) => updateCell(idx, "sub", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {rows.length > 0 && (
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleCalculate}>
          📊 Calculate
        </button>
      )}

      {/* calculation result */}
      {calc && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-2">📊 Monthly Breakdown</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th>Month</th><th>Units</th><th>Bill ₹</th><th>Sub Used</th>
                <th>Sub ₹</th><th>Other ₹</th><th>Note</th>
              </tr>
            </thead>
            <tbody>
              {calc.monthly.map((m) => (
                <tr key={m.month}>
                  <td>{m.month}</td>
                  <td>{m.units}</td>
                  <td>₹{m.bill}</td>
                  <td>{m.subUsed}</td>
                  <td>₹{m.subBill}</td>
                  <td>₹{m.otherBill}</td>
                  <td>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="mt-4 text-lg font-semibold">📦 Final Totals</h3>
          <p>⚡ Submeter Person: ₹{calc.totals.submeter.toFixed(2)}</p>
          <p>🧍‍♂️ Other Person: ₹{calc.totals.other.toFixed(2)}</p>

          <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>
            💾 Save Bill
          </button>
        </>
      )}

      <button className="mt-6 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate("/")}>
        ⬅ Back Home
      </button>
    </div>
  );
}
