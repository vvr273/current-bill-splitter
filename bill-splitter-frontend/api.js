const BASE = import.meta.env.VITE_API_BASE;

// 🏠 Get All Houses
export const getHouses = () =>
  fetch(`${BASE}/api/houses`).then(res => res.json());

// ➕ Add House
export const addHouse = (houseName) =>
  fetch(`${BASE}/api/add-house/${houseName}`, { method: "POST" }).then(res => res.json());

// 💡 Add Bill
export const addBill = (houseName, data) =>
  fetch(`${BASE}/api/add-bill/${houseName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

// 📜 Get History
export const getHistory = (houseName) =>
  fetch(`${BASE}/api/history/${houseName}`).then(res => res.json());

// ❌ Delete House
export const deleteHouse = (houseName) =>
  fetch(`${BASE}/api/delete-house/${houseName}`, { method: "DELETE" }).then(res => res.json());

export const getGraphData = async (houseName) => {
  const res = await fetch(`${BASE}/api/house-history/${houseName}`);
  const data = await res.json();
  return data;
};

