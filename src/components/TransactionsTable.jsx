export default function TransactionsTable({ transactions, onDelete, role }) {
  if (!transactions.length) return <p>No transactions</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          {role === "Admin" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.amount}</td>
            <td>{t.category}</td>
            <td>{t.type}</td>
            {role === "Admin" && (
              <td>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
