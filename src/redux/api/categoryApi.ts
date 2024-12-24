import { baseApi } from './baseApi.ts';


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
			providesTags: ['categories'],
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;