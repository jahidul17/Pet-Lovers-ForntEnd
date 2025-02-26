import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petLoversApi = createApi({
	reducerPath: "petLoversApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://pet-lovers-mu.vercel.app" }),
	endpoints: (builder) => ({
		// authorization
		signup: builder.mutation({
			query: (credentials) => ({
				url: "/accounts/signup/",
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "/accounts/login/",
				method: "POST",
				body: credentials,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (credentials) => ({
				url: "/accounts/changepassword/",
				method: "POST",
				body: credentials,
			}),
		}),

		// post
		getList: builder.query({
			query: () => "/post/list/",
		}),
		getPetDetails: builder.query({
			query: ({ id }) => `/post/list/${id}`,
		}),

		// category & review
		getCategory: builder.query({
			query: ({ slug }) => `/category/${slug}`,
		}),

		getReviewById: builder.query({
			query: ({ id }) => `/post/review/${id}`,
		}),

		// contact
		contact: builder.mutation({
			query: (data) => ({
				url: "/contact_us/",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useSignupMutation,
	useLoginMutation,
	useForgotPasswordMutation,
	useGetListQuery,
	useGetPetDetailsQuery,
	useGetCategoryQuery,
	useGetReviewByIdQuery,
	useContactMutation,
} = petLoversApi;
