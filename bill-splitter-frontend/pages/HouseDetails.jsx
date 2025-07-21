import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HouseDetails() {
  const { houseName } = useParams();
  const [houseInfo, setHouseInfo] = useState(null);

  useEffect(() => {
    const fetchHouseInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/house-info/${houseName}`);
        const data = await res.json();
        if (data.success) {
          setHouseInfo(data.data);
        }
      } catch (err) {
        console.error("Error fetching house info");
      }
    };

    fetchHouseInfo();
  }, [houseName]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🏠 {houseName}</h1>

      {houseInfo ? (
        <div className="mb-6 bg-gray-100 p-4 rounded shadow">
          <p><strong>🔌 Submeter Person:</strong> {houseInfo.submeterPerson}</p>
          <p><strong>👤 Other Person:</strong> {houseInfo.nonSubmeterPerson}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to={`/add-bill/${houseName}`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
        >
          ➕ Add New Bill
        </Link>
        <Link
          to={`/history/${houseName}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
        >
          📜 View History
        </Link>
        <Link
          to={`/graph/${houseName}`}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-center"
        >
          📈 View Graphs
        </Link>
      </div>
    </div>
  );
}

export default HouseDetails;
