import { baseApi } from './baseApi.ts';


export interface CategoryProps {
	id: number,
	name: string,
}

/**
 * @function
 * @description Получение всех категорий
 */
export const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<CategoryProps[], void>({
			query: () => `categories/`,
			providesTags: ['categories'],
		}),
	}),



});

export const { useGetCategoriesQuery } = categoryApi;