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
            headers.set("refreshToken", `Bearer ${refreshToken}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);


    if (result.error && result.error.status === 403) {
        const refreshToken = (api.getState() as RootState).auth.user?.refreshToken;
        console.log(refreshToken)
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                    body: { refreshToken },
                },
                api,
                extraOptions
            );

            console.log(refreshResult)


            if (refreshResult) {

                // api.dispatch(setUser(refreshResult));
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
