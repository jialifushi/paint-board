import Board from '@/pages/board';
import LoginPage from './pages/login'; // 确保路径正确
import { useAuthStore } from './store/auth';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? <Board /> : <LoginPage />}
    </div>
  )
}

export default App
