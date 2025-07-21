// // import { useState } from "react";

// // function AddBill() {
// //   const [form, setForm] = useState({
// //   houseName: "",
// //   billNumber: "",
// //   totalUnits: "",
// //   totalBill: "",
// //   subCurrent: "",
// //   subLast: "",
// //   submeterPerson: "",
// //   nonSubmeterPerson: "",
// // });


// //   const [result, setResult] = useState(null);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //  const handleSubmit = async () => {
// //   try {
// //     const response = await fetch(
// //       `http://localhost:5000/api/add-bill/${form.houseName}`,
// //       {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           month: new Date().toLocaleString("default", {
// //             month: "long",
// //             year: "numeric",
// //           }),
// //           billNumber: form.billNumber,
// //           submeterPerson: form.submeterPerson,
// //           nonSubmeterPerson: form.nonSubmeterPerson,
// //           totalUnits: parseFloat(form.totalUnits),
// //           totalBill: parseFloat(form.totalBill),
// //           subCurrent: parseFloat(form.subCurrent),
// //           subLast: parseFloat(form.subLast),
// //         }),
// //       }
// //     );

// //     const data = await response.json();
// //     if (data.success) {
// //       setResult(data.data);
// //       alert("✅ Bill saved and calculated successfully!");
// //     } else {
// //       alert("❌ Something went wrong");
// //     }
// //   // eslint-disable-next-line no-unused-vars
// //   } catch (error) {
// //     alert("🚨 Backend connection failed");
// //   }
// // };


// //   return (
// //     <div className="p-6 max-w-3xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-6 text-center">
// //         💡 Add Current Bill
// //       </h1>

// //       <div className="grid gap-4">
// //         <input
// //           className="border p-2 rounded"
// //           name="houseName"
// //           placeholder="🏠 House Name"
// //           onChange={handleChange}
// //         />

// //         <input
// //           className="border p-2 rounded"
// //           name="billNumber"
// //           placeholder="📄 Bill Number"
// //           onChange={handleChange}
// //         />

// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <input
// //             className="border p-2 rounded"
// //             name="totalUnits"
// //             placeholder="🔌 Main Meter Units"
// //             type="number"
// //             onChange={handleChange}
// //           />
// //           <input
// //             className="border p-2 rounded"
// //             name="totalBill"
// //             placeholder="💰 Main Meter Amount ₹"
// //             type="number"
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <input
// //             className="border p-2 rounded"
// //             name="subCurrent"
// //             placeholder="📸 Submeter This Month"
// //             type="number"
// //             onChange={handleChange}
// //           />
// //           <input
// //             className="border p-2 rounded"
// //             name="subLast"
// //             placeholder="📸 Submeter Last Month"
// //             type="number"
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <input
// //             className="border p-2 rounded"
// //             name="portion1Name"
// //             placeholder="👩🏻 Name - Submeter Person"
// //             onChange={handleChange}
// //           />
// //           <input
// //             className="border p-2 rounded"
// //             name="portion2Name"
// //             placeholder="👨🏻 Name - Other Person"
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <button
// //           onClick={handleSubmit}
// //           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
// //         >
// //           ➕ Save & Calculate
// //         </button>
// //       </div>

// //       {result && (
// //   <div className="mt-8 p-4 bg-gray-100 rounded shadow">
// //     <h2 className="text-xl font-semibold mb-2">📊 Result</h2>
// //     <p>
// //       <strong>{form.portion1Name} Units:</strong> {result.portion1Units}
// //     </p>
// //     <p>
// //       <strong>{form.portion2Name} Units:</strong> {result.portion2Units}
// //     </p>
// //     <p>
// //       <strong>📦 Per Unit Price:</strong> ₹{result.unitPrice}
// //     </p>
// //     <p>
// //       <strong>{form.portion1Name} Bill:</strong> ₹{result.portion1Bill}
// //     </p>
// //     <p>
// //       <strong>{form.portion2Name} Bill:</strong> ₹{result.portion2Bill}
// //     </p>
// //   </div>
// // )}
// //     </div>
// //   );
// // }

// // export default AddBill;
// import { useState } from "react";

// function AddBill() {
//   const [form, setForm] = useState({
//     houseName: "",
//     billNumber: "",
//     totalUnits: "",
//     totalBill: "",
//     subCurrent: "",
//     subLast: "",
//     submeterPerson: "",
//     nonSubmeterPerson: "",
//   });

//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/add-bill/${form.houseName}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             month: new Date().toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             }),
//             billNumber: form.billNumber,
//             submeterPerson: form.submeterPerson,
//             nonSubmeterPerson: form.nonSubmeterPerson,
//             totalUnits: parseFloat(form.totalUnits),
//             totalBill: parseFloat(form.totalBill),
//             subCurrent: parseFloat(form.subCurrent),
//             subLast: parseFloat(form.subLast),
//           }),
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         setResult(data.data);
//         alert("✅ Bill saved and calculated successfully!");
//       } else {
//         alert("❌ Something went wrong");
//       }
//     } catch (error) {
//       alert("🚨 Backend connection failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">💡 Add Current Bill</h1>

//       <div className="grid gap-4">
//         <input
//           className="border p-2 rounded"
//           name="houseName"
//           placeholder="🏠 House Name"
//           onChange={handleChange}
//         />

//         <input
//           className="border p-2 rounded"
//           name="billNumber"
//           placeholder="📄 Bill Number"
//           onChange={handleChange}
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             className="border p-2 rounded"
//             name="totalUnits"
//             placeholder="🔌 Main Meter Units"
//             type="number"
//             onChange={handleChange}
//           />
//           <input
//             className="border p-2 rounded"
//             name="totalBill"
//             placeholder="💰 Main Meter Amount ₹"
//             type="number"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             className="border p-2 rounded"
//             name="subCurrent"
//             placeholder="📸 Submeter This Month"
//             type="number"
//             onChange={handleChange}
//           />
//           <input
//             className="border p-2 rounded"
//             name="subLast"
//             placeholder="📸 Submeter Last Month"
//             type="number"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             className="border p-2 rounded"
//             name="submeterPerson"
//             placeholder="👩🏻 Name - Submeter Person"
//             onChange={handleChange}
//           />
//           <input
//             className="border p-2 rounded"
//             name="nonSubmeterPerson"
//             placeholder="👨🏻 Name - Other Person"
//             onChange={handleChange}
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//         >
//           ➕ Save & Calculate
//         </button>
//       </div>

//       {result && (
//         <div className="mt-8 p-4 bg-gray-100 rounded shadow">
//           <h2 className="text-xl font-semibold mb-2">📊 Result</h2>
//           <p>
//             <strong>{form.submeterPerson} Units:</strong> {result.portion1Units}
//           </p>
//           <p>
//             <strong>{form.nonSubmeterPerson} Units:</strong> {result.portion2Units}
//           </p>
//           <p>
//             <strong>📦 Per Unit Price:</strong> ₹{result.unitPrice}
//           </p>
//           <p>
//             <strong>{form.submeterPerson} Bill:</strong> ₹{result.portion1Bill}
//           </p>
//           <p>
//             <strong>{form.nonSubmeterPerson} Bill:</strong> ₹{result.portion2Bill}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// // export default AddBill;
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// function AddBill() {
//   const { houseName } = useParams();
//   const [range, setRange] = useState({
//     from: "",
//     to: "",
//   });

//   const [form, setForm] = useState([
//     {
//       month: "",
//       billNumber: "",
//       totalUnits: "",
//       totalBill: "",
//       subCurrent: "",
//     },
//   ]);

//   const [subLast, setSubLast] = useState(""); // Previous submeter reading
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
//     try {
//       const response = await fetch(`http://localhost:5000/api/add-range-bill/${houseName}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           from: range.from,
//           to: range.to,
//           subLast: parseFloat(subLast),
//           monthsData: form.map((month) => ({
//             ...month,
//             totalUnits: parseFloat(month.totalUnits),
//             totalBill: parseFloat(month.totalBill),
//             subCurrent: parseFloat(month.subCurrent),
//           })),
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setResult(data.summary);
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

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <input
//           type="text"
//           name="from"
//           placeholder="📆 From Month (e.g. June 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="to"
//           placeholder="📆 To Month (e.g. August 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//       </div>

//       <input
//         type="number"
//         placeholder="📉 Submeter Previous Reading"
//         onChange={(e) => setSubLast(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       {form.map((month, index) => (
//         <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
//           <h2 className="font-semibold mb-2">📆 Month {index + 1}</h2>
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
// //       </button>

// //       <button
// //         onClick={handleSubmit}
// //         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
// //       >
// //         ✅ Save & Calculate
// //       </button>

// //       {result && (
// //         <div className="mt-8 p-4 bg-gray-50 rounded shadow">
// //           <h2 className="text-xl font-semibold mb-2">📊 Summary</h2>
// //           <p><strong>Total Paid by Submeter Person:</strong> ₹{result.portion1Total}</p>
// //           <p><strong>Total Paid by Other:</strong> ₹{result.portion2Total}</p>
// //           <p><strong>Total Bill:</strong> ₹{result.total}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default AddBill;
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// function AddBill() {
//   const { houseName } = useParams();
//   const [range, setRange] = useState({
//     from: "",
//     to: "",
//   });

//   const [form, setForm] = useState([
//     {
//       month: "",
//       billNumber: "",
//       totalUnits: "",
//       totalBill: "",
//       subCurrent: "",
//     },
//   ]);

//   const [subLast, setSubLast] = useState("");
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
//     try {
//       const response = await fetch(`http://localhost:5000/api/add-range-bill/${houseName}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           from: range.from,
//           to: range.to,
//           subLast: parseFloat(subLast),
//           monthsData: form.map((month) => ({
//             ...month,
//             totalUnits: parseFloat(month.totalUnits),
//             totalBill: parseFloat(month.totalBill),
//             subCurrent: parseFloat(month.subCurrent),
//           })),
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setResult(data.summary);
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

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         <input
//           type="text"
//           name="from"
//           placeholder="🗖️ From Month (e.g. June 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="to"
//           placeholder="🗖️ To Month (e.g. August 2024)"
//           onChange={handleRangeChange}
//           className="border p-2 rounded"
//         />
//       </div>

//       <input
//         type="number"
//         placeholder="📉 Submeter Previous Reading"
//         onChange={(e) => setSubLast(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />

//       {form.map((month, index) => (
//         <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
//           <h2 className="font-semibold mb-2">🗖️ Month {index + 1}</h2>
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
//           <p><strong>Total Paid by Submeter Person:</strong> ₹{result.portion1Total}</p>
//           <p><strong>Total Paid by Other:</strong> ₹{result.portion2Total}</p>
//           <p><strong>Total Bill:</strong> ₹{result.total}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddBill;
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddBill() {
  const { houseName } = useParams();

  const [range, setRange] = useState({ from: "", to: "" });
  const [subLastReading, setSubLastReading] = useState("");
  const [submeterName, setSubmeterName] = useState("");
  const [nonSubmeterName, setNonSubmeterName] = useState("");

  const [form, setForm] = useState([
    {
      month: "",
      billNumber: "",
      totalUnits: "",
      totalBill: "",
      subCurrent: "",
    },
  ]);

  const [result, setResult] = useState(null);

  const handleRangeChange = (e) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  const handleChange = (index, field, value) => {
    const newForm = [...form];
    newForm[index][field] = value;
    setForm(newForm);
  };

  const addMonthRow = () => {
    setForm([
      ...form,
      {
        month: "",
        billNumber: "",
        totalUnits: "",
        totalBill: "",
        subCurrent: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    const bills = form.map((month) => ({
      month: month.month,
      billNumber: month.billNumber,
      totalUnits: parseFloat(month.totalUnits),
      totalBill: parseFloat(month.totalBill),
    }));

    const lastMonth = form[form.length - 1];
    const subCurrentReading = parseFloat(lastMonth.subCurrent);

    try {
      const response = await fetch(`http://localhost:5000/api/add-bill/${houseName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromMonth: range.from,
          toMonth: range.to,
          subLastReading: parseFloat(subLastReading),
          subCurrentReading,
          submeterPerson: submeterName,
          nonSubmeterPerson: nonSubmeterName,
          bills,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        alert("✅ Bill range calculated and saved successfully!");
      } else {
        alert("❌ Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("🚨 Backend connection failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">➕ Add Bill for Range</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="from"
          placeholder="🗓️ From Month (e.g. June 2024)"
          onChange={handleRangeChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="to"
          placeholder="🗓️ To Month (e.g. August 2024)"
          onChange={handleRangeChange}
          className="border p-2 rounded"
        />
      </div>

      <input
        type="number"
        placeholder="📉 Submeter Previous Reading"
        onChange={(e) => setSubLastReading(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <input
        type="text"
        placeholder="👩 Submeter Person Name"
        onChange={(e) => setSubmeterName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="👨 Other Person Name"
        onChange={(e) => setNonSubmeterName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {form.map((month, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2">🗓️ Month {index + 1}</h2>
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="Month (e.g. June 2024)"
            value={month.month}
            onChange={(e) => handleChange(index, "month", e.target.value)}
          />
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="📄 Bill Number"
            onChange={(e) => handleChange(index, "billNumber", e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded mb-2 w-full"
            placeholder="🔌 Total Units"
            onChange={(e) => handleChange(index, "totalUnits", e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded mb-2 w-full"
            placeholder="💰 Total Bill ₹"
            onChange={(e) => handleChange(index, "totalBill", e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="📸 Submeter Current"
            onChange={(e) => handleChange(index, "subCurrent", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addMonthRow}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ➕ Add Another Month
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
      >
        ✅ Save & Calculate
      </button>

      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📊 Summary</h2>
          <p><strong>{submeterName} Paid:</strong> ₹{result.portion1Total}</p>
          <p><strong>{nonSubmeterName} Paid:</strong> ₹{result.portion2Total}</p>
          <p><strong>Total Bill:</strong> ₹{result.total}</p>
        </div>
      )}
    </div>
  );
}

export default AddBill;
