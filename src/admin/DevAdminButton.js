import { Link, useLocation } from 'react-router-dom';

export default function DevAdminButton() {
  const { search } = useLocation();
  if (!search.includes('admin=1')) return null;
  return (
    <Link
      to="/admin"
      aria-label="Open admin"
      className="fixed bottom-20 right-4 z-50 px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur hover:brightness-110 text-xs"
    >
      Admin
    </Link>
  );
}
