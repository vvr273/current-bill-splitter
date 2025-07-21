// 📁 Graph.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";
import { getHistory } from "../api";

function Graph() {
  const { houseName } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isBar, setIsBar] = useState(true); // 🔁 toggle state

  useEffect(() => {
    const fetchAndFormatHistory = async () => {
      try {
        const result = await getHistory(houseName);
        if (result.success || result.history) {
          const formatted = result.history.map((item) => ({
            month: `${item.fromMonth}–${item.toMonth}`,
            totalUnits: item.portion1Units + item.portion2Units,
            totalBill: item.portion1Bill + item.portion2Bill,
            portion1Units: item.portion1Units,
            portion2Units: item.portion2Units,
            portion1Bill: item.portion1Bill,
            portion2Bill: item.portion2Bill,
          }));
          setData(formatted);
        } else {
          alert("No history data found");
        }
      } catch (err) {
        console.error("Graph error:", err);
        alert("Error fetching data");
      }
    };

    fetchAndFormatHistory();
  }, [houseName]);

  const renderChart = (type, keys) => {
    return isBar ? (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map(({ key, color, name }) => (
          <Bar key={key} dataKey={key} fill={color} name={name} />
        ))}
      </BarChart>
    ) : (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map(({ key, color, name }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            name={name}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Bill Graph – {houseName}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsBar(!isBar)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            🔄 Toggle to {isBar ? "Line" : "Bar"} Chart
          </button>
          <button
            onClick={() => navigate(`/history/${houseName}`)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            ⬅ Back to History
          </button>
        </div>
      </div>

      {/* 🔌 Total Units and Bill */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">🔌 Total Units & 💰 Total Bill</h2>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart("total", [
            { key: "totalUnits", color: "#60a5fa", name: "Total Units" },
            { key: "totalBill", color: "#34d399", name: "Total Bill ₹" },
          ])}
        </ResponsiveContainer>
      </section>

      {/* ⚡ Portion-wise Units */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">⚡ Portion-wise Units</h2>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart("units", [
            { key: "portion1Units", color: "#facc15", name: "Submeter Units" },
            { key: "portion2Units", color: "#f97316", name: "Other Units" },
          ])}
        </ResponsiveContainer>
      </section>

      {/* 💰 Portion-wise Bill */}
      <section>
        <h2 className="text-xl font-semibold mb-2">💰 Portion-wise Bill</h2>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart("bill", [
            { key: "portion1Bill", color: "#c084fc", name: "Submeter ₹" },
            { key: "portion2Bill", color: "#38bdf8", name: "Other ₹" },
          ])}
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default Graph;
