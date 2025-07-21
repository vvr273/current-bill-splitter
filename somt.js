
  function calculateBillSplit(data) {
    let result = [];
    let subTotals = {
      submeter: 0,
      other: 0,
    };

    // Step 1: Extract only valid submeter readings
    const submeterMap = {};
    for (let row of data) {
      if (row.sub !== "") submeterMap[row.month] = parseFloat(row.sub);
    }

    // Step 2: Get all months in chronological order
    const months = data.map(row => row.month);

    // Step 3: Loop from second month onwards for difference
    for (let i = 1; i < months.length; i++) {
      const month = months[i];
      const prevMonth = months[i - 1];
      const current = data.find(d => d.month === month);
      const previous = data.find(d => d.month === prevMonth);

      const mainUnits = parseFloat(current.mainUnits);
      const mainBill = parseFloat(current.mainBill);
      const unitPrice = mainBill / mainUnits;

      let subUsed = 0;
      let note = "";

      if (submeterMap[prevMonth] !== undefined && submeterMap[month] !== undefined) {
        subUsed = submeterMap[month] - submeterMap[prevMonth];
      } else {
        // bridging missing submeter reading
        let lastAvailableMonth = prevMonth;
        while (!submeterMap[lastAvailableMonth] && months.indexOf(lastAvailableMonth) > 0) {
          lastAvailableMonth = months[months.indexOf(lastAvailableMonth) - 1];
        }

        let nextAvailableMonth = month;
        while (!submeterMap[nextAvailableMonth] && months.indexOf(nextAvailableMonth) < months.length - 1) {
          nextAvailableMonth = months[months.indexOf(nextAvailableMonth) + 1];
        }

        if (
          submeterMap[lastAvailableMonth] !== undefined &&
          submeterMap[nextAvailableMonth] !== undefined &&
          lastAvailableMonth !== nextAvailableMonth
        ) {
          const subTotal = submeterMap[nextAvailableMonth] - submeterMap[lastAvailableMonth];

          const missingMonths = [];
          const startIndex = months.indexOf(lastAvailableMonth) + 1;
          const endIndex = months.indexOf(nextAvailableMonth);

          for (let j = startIndex; j <= endIndex; j++) {
            missingMonths.push(months[j]);
          }

          const totalUnits = missingMonths.reduce((acc, m) => acc + parseFloat(data.find(d => d.month === m).mainUnits), 0);
          const totalBill = missingMonths.reduce((acc, m) => acc + parseFloat(data.find(d => d.month === m).mainBill), 0);

          const avgPrice = totalBill / totalUnits;

          subUsed = (subTotal * parseFloat(current.mainUnits)) / totalUnits;
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

      subTotals.submeter += subBill;
      subTotals.other += otherBill;
    }

    return { monthly: result, totals: subTotals };
  }
// </script>
