import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/authSlice";
import { petLoversApi } from "./services/petLovers";

export const store = configureStore({
	reducer: {
		[petLoversApi.reducerPath]: petLoversApi.reducer,
		account: accountReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(petLoversApi.middleware),
});
