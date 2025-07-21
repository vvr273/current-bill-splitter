// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { calculateBillSplit } from "./calculateBillSplit"; // Adjust the path as needed
// const serviceAccount = require("./serviceAccountKey.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
import dotenv from "dotenv";
dotenv.config();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/add-bill/:houseName", async (req, res) => {
  const { houseName } = req.params;
  const { months } = req.body;

  if (!months || !Array.isArray(months)) {
    return res.status(400).json({ success: false, error: "Missing months array" });
  }

  try {
    const result = calculateBillSplit(months); // 👈 perform split

    // Save to Firestore or wherever
    await db.collection("houses").doc(houseName).collection("bills").add({
      timestamp: Date.now(),
      months,
      breakdown: result.monthly,
      summary: result.totals,
    });

    // ✅ Return correct shape to frontend
    res.json({
      success: true,
      summary: {
        monthly: result.monthly,
        totals: result.totals,
      },
    });
  } catch (error) {
    console.error("Error in add-bill:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


// ✅ Get list of all houses
app.get("/api/houses", async (req, res) => {
  try {
    const snapshot = await db.collection("houses").get();
    const houses = snapshot.docs.map((doc) => doc.id);
    res.status(200).json({ success: true, houses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


/** 🔧 Add House */
app.post("/api/add-house/:houseName", async (req, res) => {
  const { houseName } = req.params;
  try {
    await db.collection("houses").doc(houseName).set({ created: true }, { merge: true });
    res.status(200).json({ success: true, message: `House '${houseName}' added.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// /** 💡 Add Range Bill with Multiple Submeter Readings */
// app.post("/api/add-bill/:houseName", async (req, res) => {
//   const { houseName } = req.params;
//   const {
//     fromMonth,
//     toMonth,
//     submeterPerson,
//     nonSubmeterPerson,
//     submeterReadings, // [{ month: "June 2024", reading: 200 }, { month: "August 2024", reading: 260 }]
//     bills,            // [{ month, billNumber, totalUnits, totalBill }]
//   } = req.body;

//   try {
//     // 🔠 Sort readings and bills by month
//     const readingMap = new Map();
//     for (const r of submeterReadings) readingMap.set(r.month, r.reading);

//     const sortedReadings = [...submeterReadings].sort(
//       (a, b) => new Date(a.month) - new Date(b.month)
//     );
//     const sortedBills = [...bills].sort((a, b) => new Date(a.month) - new Date(b.month));

//     let historyData = [];
//     let totalSubUnits = 0;
//     let totalUnits = 0;
//     let totalBill = 0;

//     for (let i = 0; i < sortedReadings.length - 1; i++) {
//       const fromMonth = sortedReadings[i].month;
//       const toMonth = sortedReadings[i + 1].month;
//       const subFrom = sortedReadings[i].reading;
//       const subTo = sortedReadings[i + 1].reading;
//       const portion1Units = subTo - subFrom;

//       // 🧾 Filter bills between this submeter range
//       const billsInRange = sortedBills.filter((b) => {
//         const date = new Date(b.month);
//         return date >= new Date(fromMonth) && date <= new Date(toMonth);
//       });

//       const rangeTotalUnits = billsInRange.reduce((sum, b) => sum + b.totalUnits, 0);
//       const rangeTotalBill = billsInRange.reduce((sum, b) => sum + b.totalBill, 0);

//       const unitPrice = parseFloat((rangeTotalBill / rangeTotalUnits).toFixed(2));
//       const portion1Bill = parseFloat((unitPrice * portion1Units).toFixed(2));
//       const portion2Units = rangeTotalUnits - portion1Units;
//       const portion2Bill = parseFloat((unitPrice * portion2Units).toFixed(2));

//       totalSubUnits += portion1Units;
//       totalUnits += rangeTotalUnits;
//       totalBill += rangeTotalBill;

//       // 📦 Save bill for each month
//       for (const b of billsInRange) {
//         await db.collection("houses").doc(houseName).collection("months").doc(b.month).set({
//           ...b,
//           unitPrice,
//           timestamp: admin.firestore.FieldValue.serverTimestamp(),
//         });
//       }

//       // 🗃️ Save range
//       const rangeId = `${fromMonth.replace(" ", "_")}_to_${toMonth.replace(" ", "_")}`;
//       await db.collection("houses").doc(houseName).collection("history").doc(rangeId).set({
//         fromMonth,
//         toMonth,
//         portion1Units,
//         portion2Units,
//         portion1Bill,
//         portion2Bill,
//         unitPrice,
//         rangeTotalBill,
//         rangeTotalUnits,
//         submeterPerson,
//         nonSubmeterPerson,
//         timestamp: admin.firestore.FieldValue.serverTimestamp(),
//       });

//       historyData.push({
//         fromMonth,
//         toMonth,
//         portion1Units,
//         portion2Units,
//         portion1Bill,
//         portion2Bill,
//         unitPrice,
//       });
//     }

//     // Save house member names
//     await db.collection("houses").doc(houseName).set(
//       {
//         submeterPerson,
//         nonSubmeterPerson,
//       },
//       { merge: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Bill range calculated and saved",
//       summary: {
//         totalBill,
//         totalUnits,
//         portion1Total: parseFloat((totalSubUnits * (totalBill / totalUnits)).toFixed(2)),
//         portion2Total: parseFloat((totalBill - totalSubUnits * (totalBill / totalUnits)).toFixed(2)),
//         historyData,
//       },
//     });
//   } catch (err) {
//     console.error("🔥 Firebase Error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
// ✅ Get Bill History for a House
app.get("/api/history/:houseName", async (req, res) => {
  const { houseName } = req.params;
  try {
    const snapshot = await db
      .collection("houses")
      .doc(houseName)
      .collection("history")
      .orderBy("timestamp", "desc")
      .get();

    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// 🔥 Recursively delete a house and its subcollections
app.delete("/api/delete-house/:houseName", async (req, res) => {
  const { houseName } = req.params;

  const deleteCollection = async (collectionRef) => {
    const snapshot = await collectionRef.get();
    const batch = db.batch();
    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  };

  try {
    const houseRef = db.collection("houses").doc(houseName);

    // Delete subcollections first
    await deleteCollection(houseRef.collection("months"));
    await deleteCollection(houseRef.collection("history"));

    // Delete house document
    await houseRef.delete();

    res.status(200).json({ success: true, message: `House '${houseName}' deleted.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/** 🚀 Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
