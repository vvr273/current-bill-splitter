import { Link } from "react-router-dom";

function HouseCard({ house }) {
  return (
    <Link to={`/house/${house.name}`}>
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 bg-white">
        <h2 className="text-xl font-bold mb-2">🏠 {house.name}</h2>
        <p>
          👤 <strong>Submeter:</strong> {house.submeterPerson}
        </p>
        <p>
          👥 <strong>Other:</strong> {house.nonSubmeterPerson}
        </p>
        <p>
          🧾 <strong>Last Updated:</strong>{" "}
          {house.lastUpdated
            ? new Date(house.lastUpdated.toDate()).toLocaleString()
            : "Not available"}
        </p>
      </div>
    </Link>
  );
}

export default HouseCard;
