// Calculates split based on given submeter readings and total units
export function calculateSplit(subLast, monthsData) {
  let prevReading = subLast;
  let total = 0;
  let portion1Total = 0;
  let portion2Total = 0;
  const breakdown = [];

  for (let month of monthsData) {
    const { totalUnits, totalBill, subCurrent } = month;

    const unitPrice = totalBill / totalUnits;
    const portion1Units = subCurrent - prevReading;
    const portion2Units = totalUnits - portion1Units;
    const portion1Bill = parseFloat((unitPrice * portion1Units).toFixed(2));
    const portion2Bill = parseFloat((unitPrice * portion2Units).toFixed(2));

    breakdown.push({
      ...month,
      portion1Units,
      portion2Units,
      portion1Bill,
      portion2Bill,
      unitPrice: parseFloat(unitPrice.toFixed(2)),
    });

    total += totalBill;
    portion1Total += portion1Bill;
    portion2Total += portion2Bill;
    prevReading = subCurrent;
  }

  return {
    total: parseFloat(total.toFixed(2)),
    portion1Total: parseFloat(portion1Total.toFixed(2)),
    portion2Total: parseFloat(portion2Total.toFixed(2)),
    breakdown,
  };
}
