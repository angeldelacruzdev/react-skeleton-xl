import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { logout, setUser } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user?.accessToken;
        const refreshToken = (getState() as RootState).auth.user?.refreshToken;
        if (token) {

            headers.set("Authorization", `Bearer ${token}`);
            headers.set("refreshtoken", `Bearer ${refreshToken}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);


    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.user?.refreshToken;

        if (refreshToken) {
          
            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                },
                api,
                extraOptions
            );

            if (refreshResult) {
                api.dispatch(setUser(refreshResult.data));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};
