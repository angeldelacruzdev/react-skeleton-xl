import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout } from '../slices/authSlice';

interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.user?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        protectedData: builder.query<any, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            extraOptions: {
                onQueryStarted: async (_: any, { dispatch, queryFulfilled }: {
                    dispatch: any;
                    queryFulfilled: any;
                }) => {
                    try {
                        await queryFulfilled;
                    } catch {
                        dispatch(logout());
                    }
                },
            },
        }),
    }),
});

export const { useLoginMutation, useProtectedDataQuery } = authApi;
export default authApi;
