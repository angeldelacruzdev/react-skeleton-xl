import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Permission {
  name: string;
}

interface RolePermission {
  permission: Permission;
}

interface Role {
  name: string;
  RolePermission: RolePermission[];
}

interface RoleItem {
  role: Role;
}


interface User {
  email: string;
  accessToken: string;
  refreshToken: string;
  roles: RoleItem[]; // Cambiado a Role
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthenticated: !!localStorage.getItem('user'),
  isLoading: true, // Cargando inicialmente
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
