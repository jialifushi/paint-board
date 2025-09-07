import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
}

// 从环境变量中获取正确的密码
const correctPassword = import.meta.env.VITE_ALLOW_CODE;

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !correctPassword, // 如果没有设置密码，则直接认证通过
  login: (password: string) => {
    if (password === correctPassword) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
}));
