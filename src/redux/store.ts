import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authApi from './api/authApi';
import authReducer from './slices/authSlice';
import { categoryApi } from './api/categoryApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer, // Agregar el reducer de RTK Query
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware), // Agregar el middleware de RTK Query
});

// Configura los listeners para la refetch automática
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
