import { baseApi } from './baseApi.ts';


export interface Product {
	id: number,
	name: string,
	description: string,
	image: string,
	count: number,
}

export interface Category {
	id: number,
	name: string,
	products: Product[],
}

/**
 * @function
 * @description Получение всех категорий с товарами
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