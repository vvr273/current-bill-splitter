import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HistoryPage() {
  const { houseName } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/history/${houseName}`);
        setHistory(res.data.history || []);
      } catch (err) {
        alert("Failed to fetch history");
      }
    };
    fetchHistory();
  }, [houseName]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📜 History - {houseName}</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
      </div>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
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
      )}
    </div>
  );
}
