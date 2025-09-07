import { useState } from 'react';
import { useAuthStore } from '../../store/auth';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    const success = login(password);
    if (!success) {
      setError('密码错误，请重试。');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">在线自由画板</h1>
        <p className="text-gray-600 mb-6">请输入访问码进入</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="访问码"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          进入
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
