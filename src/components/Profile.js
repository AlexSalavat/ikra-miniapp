// Profile.js
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Ошибка входа. Проверьте данные.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Ошибка входа через Google.");
    }
    setLoading(false);
  };

  const handleLogout = () => signOut(auth);

  if (!user) {
    // Не авторизован: форма входа
    return (
      <div className="max-w-md mx-auto p-6 bg-neutral-900 rounded-2xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Личный кабинет</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-neutral-800 border border-yellow-500 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 rounded-lg bg-neutral-800 border border-yellow-500 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-400">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-400 font-bold text-black shadow hover:bg-yellow-500"
            disabled={loading}
          >
            Войти
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-lg font-bold shadow"
            disabled={loading}
          >
            Войти через Google
          </button>
        </div>
      </div>
    );
  }

  // Уже авторизован: данные профиля
  return (
    <div className="max-w-md mx-auto p-6 bg-neutral-900 rounded-2xl shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.photoURL || "/images/no-image.webp"}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-yellow-400"
        />
        <div>
          <div className="text-lg font-bold">{user.displayName || "Пользователь"}</div>
          <div className="text-sm text-gray-300">{user.email}</div>
        </div>
      </div>
      <div className="mt-2 mb-4 text-yellow-400 font-semibold">Доступ: <span className="text-white">DEMO</span></div>
      {/* TODO: здесь добавим кнопки/формы управления карточкой и объявлениями */}
      <div className="space-y-2">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-yellow-400 rounded-lg font-bold text-black shadow hover:bg-yellow-500"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Profile;
