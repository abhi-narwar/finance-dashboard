export default function SummaryCards({ totals }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 my-4">
      <Card title="Balance" value={totals.balance} />
      <Card title="Income" value={totals.income} />
      <Card title="Expense" value={totals.expense} />
    </div>
  );
}

function Card({ title, value }) {
  return (
     <div className="p-5 rounded-2xl shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition duration-300">
      <h2>{title}</h2>
      <p className="text-2xl font-bold">₹{value}</p>
    </div>
  );
}