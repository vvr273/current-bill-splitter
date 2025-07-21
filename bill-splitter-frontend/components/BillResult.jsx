function BillResult({ result, portion1Name, portion2Name }) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">📊 Bill Summary</h2>

      <p>
        <strong>{portion1Name}'s Total Paid:</strong> ₹{result.portion1Total}
      </p>
      <p>
        <strong>{portion2Name}'s Total Paid:</strong> ₹{result.portion2Total}
      </p>
      <p>
        <strong>💰 Total Bill Amount:</strong> ₹{result.total}
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">🧾 Monthly Breakdown:</h3>
      <ul className="space-y-2">
        {result.breakdown.map((month, idx) => (
          <li key={idx} className="p-2 border rounded bg-white">
            <strong>{month.month}</strong>: ₹{month.totalBill} | Unit Price: ₹
            {month.unitPrice} <br />
            {portion1Name}: {month.portion1Units} units (₹{month.portion1Bill}) |{" "}
            {portion2Name}: {month.portion2Units} units (₹{month.portion2Bill})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BillResult;
// BillResult.jsx
// This component displays the result of the bill split calculation, including total amounts and a breakdown by