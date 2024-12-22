import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './api';
import crossCategoryReducer from './slices/crossCategorySlice.ts';


export const store = configureStore({
	reducer: {
		crossCategory: crossCategoryReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getMiddleware) => getMiddleware().concat(baseApi.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch