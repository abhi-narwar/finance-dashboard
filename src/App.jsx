import React, { useState, useMemo, useEffect } from "react";
import SummaryCards from "./components/summarycards";
import Charts from "./components/Charts";
import TransactionsTable from "./components/TransactionsTable";
import RoleSwitcher from "./components/RoleSwitcher";
import Insights from "./components/Insights";
import AddTransactionModal from "./components/AddTransactionModal";

const initialData = [
  { id: 1, date: "2026-03-01", amount: 5000, category: "Salary", type: "Income" },
  { id: 2, date: "2026-03-02", amount: 2000, category: "Food", type: "Expense" },
  { id: 3, date: "2026-03-05", amount: 1500, category: "Shopping", type: "Expense" },
  { id: 4, date: "2026-03-10", amount: 3000, category: "Freelance", type: "Income" },
];

export default function App() {

  const [dark, setDark] = useState(false); // ✅ inside component

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [role, setRole] = useState("Viewer");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (search) {
      data = data.filter(t =>
        t.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "All") {
      data = data.filter(t => t.type === filter);
    }

    data.sort((a, b) =>
      sort === "asc" ? a.amount - b.amount : b.amount - a.amount
    );

    return data;
  }, [transactions, search, filter, sort]);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === "Income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions.filter(t => t.type === "Expense")
      .reduce((a, b) => a + b.amount, 0);

    return {
      balance: income - expense,
      income,
      expense,
    };
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions(prev => [...prev, { ...tx, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      
      <div className="p-4 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <RoleSwitcher role={role} setRole={setRole} />
          
          <button
            onClick={() => setDark(!dark)}
            className="bg-black text-white px-3 py-1 rounded"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        <SummaryCards totals={totals} />
        <Charts transactions={transactions} />
        <Insights transactions={transactions} />

        <div className="flex gap-2 my-4">
          <input
            placeholder="Search category"
            className="border p-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilter(e.target.value)} className="p-2 rounded">
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)} className="p-2 rounded">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>

          {role === "Admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
            >
              Add
            </button>
          )}
        </div>

        <TransactionsTable
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          role={role}
        />

        {isModalOpen && (
          <AddTransactionModal
            onClose={() => setIsModalOpen(false)}
            onAdd={addTransaction}
          />
        )}

      </div>
    </div>
  );
}