// src/utils/calculateBillSplit.js
// --------------------------------------------------
// Pure function – given month‑wise data, returns
//  1) detailed per‑month split
//  2) final totals for each person
// --------------------------------------------------

export function calculateBillSplit(rows) {
  const result = [];
  const totals = { submeter: 0, other: 0 };

  // 🔹 Build a quick lookup for existing sub‑meter readings
  const subMap = {};
  rows.forEach((r) => {
    if (r.sub !== "" && r.sub !== null && r.sub !== undefined)
      subMap[r.month] = Number(r.sub);
  });

  const months = rows.map((r) => r.month); // already sorted chronologically

  for (let i = 1; i < months.length; i++) {
    const month = months[i];
    const prevMonth = months[i - 1];
    const current = rows.find((r) => r.month === month);

    const mainUnits = Number(current.mainUnits);
    const mainBill = Number(current.mainBill);
    const unitPrice = mainUnits ? mainBill / mainUnits : 0;

    let subUsed = 0;
    let note = "";

    if (subMap[prevMonth] !== undefined && subMap[month] !== undefined) {
      subUsed = subMap[month] - subMap[prevMonth];
    } else {
     
      let lastMonthWithReading = prevMonth;
      while (
        months.indexOf(lastMonthWithReading) > 0 &&
        subMap[lastMonthWithReading] === undefined
      ) {
        lastMonthWithReading = months[months.indexOf(lastMonthWithReading) - 1];
      }

      let nextMonthWithReading = month;
      while (
        months.indexOf(nextMonthWithReading) < months.length - 1 &&
        subMap[nextMonthWithReading] === undefined
      ) {
        nextMonthWithReading = months[months.indexOf(nextMonthWithReading) + 1];
      }

      if (
        subMap[lastMonthWithReading] !== undefined &&
        subMap[nextMonthWithReading] !== undefined &&
        lastMonthWithReading !== nextMonthWithReading
      ) {
        const totalGapUnits =
          subMap[nextMonthWithReading] - subMap[lastMonthWithReading];

        const gapMonths = months.slice(
          months.indexOf(lastMonthWithReading) + 1,
          months.indexOf(nextMonthWithReading) + 1
        );

        const totalGapMainUnits = gapMonths.reduce(
          (sum, m) => sum + Number(rows.find((r) => r.month === m).mainUnits),
          0
        );

        // proportion of current month’s main units in the whole gap
        subUsed =
          (totalGapUnits * Number(current.mainUnits)) / totalGapMainUnits;
        note = "🔗 Bridged";
      }
    }

    const subBill = +(subUsed * unitPrice).toFixed(2);
    const otherBill = +(mainBill - subBill).toFixed(2);

    result.push({
      month,
      units: mainUnits,
      bill: mainBill,
      subUsed: +subUsed.toFixed(2),
      subBill,
      otherBill,
      note,
    });

    totals.submeter += subBill;
    totals.other += otherBill;
  }

  totals.submeter = +totals.submeter.toFixed(2);
  totals.other = +totals.other.toFixed(2);

  return { monthly: result, totals };
}
