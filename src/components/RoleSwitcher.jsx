export default function RoleSwitcher({ role, setRole }) {
  return (
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option>Viewer</option>
      <option>Admin</option>
    </select>
  );
}