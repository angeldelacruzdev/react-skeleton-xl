import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ page = 1, search = "" }) => `/categories?page=${page}&search=${search}&pageSize=10`,
            providesTags: ["Category"],
        }),
        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: "/categories",
                method: "POST",
                body: categoryData,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, name }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
