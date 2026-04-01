import React from "react";

export default function Insights({ transactions }) {

  const highestCategory = Object.entries(
    transactions.reduce((acc, t) => {
      if (t.type === "Expense") {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  const total = transactions.length;

  return (
    <div className="grid md:grid-cols-2 gap-4 my-4">

      {/* Total Transactions */}
      <div className="p-4 bg-gray-100 rounded shadow">
        <h2 className="text-gray-500">Total Transactions</h2>
        <p className="text-xl font-bold">{total}</p>
      </div>

      {/* Top Category */}
      <div className="p-4 bg-gray-100 rounded shadow">
        <h2 className="text-gray-500">Top Spending Category</h2>
        <p className="text-xl font-bold">
          {highestCategory?.[0] || "N/A"}
        </p>
      </div>

    </div>
  );
}