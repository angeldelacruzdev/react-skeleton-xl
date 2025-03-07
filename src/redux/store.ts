import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authApi from './api/authApi';
import authReducer from './slices/authSlice';
import { categoryApi } from './api/categoryApi';
import { userApi } from './api/userApi';
import { rolesApi } from './api/rolesApi';
import { permissionsApi } from './api/ermissionsApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [permissionsApi.reducerPath]: permissionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, categoryApi.middleware, rolesApi.middleware, permissionsApi.middleware), // Agregar el middleware de RTK Query
});

// Configura los listeners para la refetch automática
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
