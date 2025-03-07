import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";


export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => "/roles",
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi;
