import { baseApi } from './baseApi.ts';


export interface Ingredient {
	id: number,
	name: string,
}

/**
 * @function
 * @description Получение ингредиентов
 */
export const ingredientApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getIngredients: builder.query<Ingredient[], {category_id?: number}>({
			query: (query) => ({
				url: 'ingredients/',
				params: query,
			}),
			providesTags: ['ingredients'],
		}),
	}),
});

export const { useGetIngredientsQuery } = ingredientApi;