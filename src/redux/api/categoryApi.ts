import { baseApi } from './baseApi.ts';
import { setCategories } from '../slices/categorySlice.ts';


export interface Category {
	id: number,
	name: string,
}

/**
 * @function
 * @description Получение категорий
 */
export const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => `categories/`,
			// сохраняем категории в redux
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCategories(data));
				} catch (error) {
					console.error(error);
				}
			},
			providesTags: ['categories'],
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;