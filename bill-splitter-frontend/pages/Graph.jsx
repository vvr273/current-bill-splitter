// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// function Graph() {
//   const [houseName, setHouseName] = useState("GandhiHouse");
//   const [bills, setBills] = useState([]);

//   const fetchBills = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/get-bills/${houseName}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         const monthsData = Object.entries(data.bills)
//           .map(([month, values]) => ({
//             month,
//             portion1Units: values.portion1Units,
//             portion2Units: values.portion2Units,
//             portion1Bill: values.portion1Bill,
//             portion2Bill: values.portion2Bill,
//           }))
//           .sort((a, b) => new Date("1 " + a.month) - new Date("1 " + b.month));

//         setBills(monthsData.slice(-12));
//       } else {
//         alert("❌ Failed to fetch data");
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       alert("🚨 Error connecting to backend");
//     }
//   };

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">📊 Bill Graphs</h1>

//       <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
//         <input
//           type="text"
//           value={houseName}
//           onChange={(e) => setHouseName(e.target.value)}
//           placeholder="Enter house name"
//           className="border px-4 py-2 rounded w-full sm:w-auto"
//         />
//         <button
//           onClick={fetchBills}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           🔄 Refresh Data
//         </button>
//       </div>

//       {/* 🔌 Units Chart */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-2">🔌 Units Used (Last 12 Months)</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={bills}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="portion1Units" fill="#82ca9d" name="Portion 1 Units" />
//             <Bar dataKey="portion2Units" fill="#8884d8" name="Portion 2 Units" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 💰 Bill Chart */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">💰 Bill Amount (Last 12 Months)</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={bills}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="portion1Bill" fill="#ffc658" name="Portion 1 ₹" />
//             <Bar dataKey="portion2Bill" fill="#ff7f50" name="Portion 2 ₹" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default Graph;
// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// function Graph() {
//   const [houseName, setHouseName] = useState("GandhiHouse");
//   const [bills, setBills] = useState([]);
//   const [error, setError] = useState("");

//   const fetchBills = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/get-bills/${houseName}`);
//       const data = await response.json();

//       if (data.success) {
//         const monthsData = Object.entries(data.bills)
//           .map(([month, values]) => ({
//             month,
//             portion1Units: values.portion1Units,
//             portion2Units: values.portion2Units,
//             portion1Bill: values.portion1Bill,
//             portion2Bill: values.portion2Bill,
//           }))
//           .sort(
//             (a, b) =>
//               new Date("1 " + a.month) - new Date("1 " + b.month)
//           );

//         setBills(monthsData.slice(-12));
//         setError("");
//       } else {
//         setError("❌ No data found for this house.");
//       }
//     } catch (err) {
//       setError("🚨 Failed to fetch bill data from backend.");
//     }
//   };

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">📊 Electricity Usage Graph</h1>

//       <div className="flex gap-4 mb-6">
//         <input
//           className="border p-2 rounded flex-1"
//           value={houseName}
//           onChange={(e) => setHouseName(e.target.value)}
//           placeholder="🏠 Enter house name"
//         />
//         <button
//           onClick={fetchBills}
//           className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {!error && (
//         <>
//           {/* Units Bar Chart */}
//           <div className="mb-10">
//             <h2 className="text-xl font-semibold mb-4">🔌 Units Used (Last 12 Months)</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={bills}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="portion1Units" fill="#38bdf8" name="Portion 1 Units" />
//                 <Bar dataKey="portion2Units" fill="#4ade80" name="Portion 2 Units" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bill Amount Bar Chart */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">💰 Bill Amount (Last 12 Months)</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={bills}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="portion1Bill" fill="#facc15" name="Portion 1 ₹" />
//                 <Bar dataKey="portion2Bill" fill="#f97316" name="Portion 2 ₹" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Graph;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function Graph() {
//   const { houseName } = useParams();
//   const [history, setHistory] = useState([]);
//   const [names, setNames] = useState({ submeterPerson: "", nonSubmeterPerson: "" });

//   useEffect(() => {
//     const fetchGraphData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/house-history/${houseName}`);
//         const data = await response.json();

//         if (data.success) {
//           setHistory(data.data.months);
//           setNames({
//             submeterPerson: data.data.submeterPerson,
//             nonSubmeterPerson: data.data.nonSubmeterPerson,
//           });
//         } else {
//           alert("Failed to fetch data");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("🚨 Backend connection failed");
//       }
//     };

//     fetchGraphData();
//   }, [houseName]);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">📊 {houseName} - Bill Graph</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">📅 Month</th>
//               <th className="border px-4 py-2">🔌 Total Units</th>
//               <th className="border px-4 py-2">💰 Total Bill</th>
//               <th className="border px-4 py-2">⚡ {names.submeterPerson} Units</th>
//               <th className="border px-4 py-2">💸 {names.submeterPerson} Bill</th>
//               <th className="border px-4 py-2">⚡ {names.nonSubmeterPerson} Units</th>
//               <th className="border px-4 py-2">💸 {names.nonSubmeterPerson} Bill</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((month) => (
//               <tr key={month.month}>
//                 <td className="border px-4 py-2">{month.month}</td>
//                 <td className="border px-4 py-2">{month.totalUnits}</td>
//                 <td className="border px-4 py-2">₹{month.totalBill}</td>
//                 <td className="border px-4 py-2">{month.portion1Units}</td>
//                 <td className="border px-4 py-2">₹{month.portion1Bill}</td>
//                 <td className="border px-4 py-2">{month.portion2Units}</td>
//                 <td className="border px-4 py-2">₹{month.portion2Bill}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Graph;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Graph() {
  const { houseName } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/house-history/${houseName}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Graph fetch error:", error);
      }
    };

    fetchHistory();
  }, [houseName]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Usage Overview - {houseName}</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">🔌 Total Units & Bills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalUnits" fill="#8884d8" name="Total Units" />
            <Bar dataKey="totalBill" fill="#82ca9d" name="Total Bill ₹" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">👩🏻‍⚖️ Portion-wise Units</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="portion1Units" stroke="#ff7300" name="Submeter Units" />
            <Line type="monotone" dataKey="portion2Units" stroke="#387908" name="Other Units" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">💰 Portion-wise Bills</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="portion1Bill" stroke="#8884d8" name="Submeter ₹" />
            <Line type="monotone" dataKey="portion2Bill" stroke="#82ca9d" name="Other ₹" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
