import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";


export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Role'],
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => "/roles",
            providesTags: ['Role']
        }),
        updatePermision: builder.mutation({
            query: (user) => ({
                url: `/assign-permission/${user.id}`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["Role"],
        }),
    }),
});

export const { useGetRolesQuery, useUpdatePermisionMutation } = rolesApi;
