export default function AddTransactionModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ date: "", amount: "", category: "", type: "Income" });

  const handleSubmit = () => {
    onAdd({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-4">
        <input placeholder="Date" onChange={e => setForm({...form, date: e.target.value})} />
        <input placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />
        <input placeholder="Category" onChange={e => setForm({...form, category: e.target.value})} />
        <select onChange={e => setForm({...form, type: e.target.value})}>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
