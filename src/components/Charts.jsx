import { LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Charts({ transactions }) {

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"];

  // Line chart data
  const data = transactions.map(t => ({
    name: t.date,
    value: t.amount
  }));

  // ✅ FIX: categoryData define karo
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "Expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">

      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" stroke="#6366F1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}