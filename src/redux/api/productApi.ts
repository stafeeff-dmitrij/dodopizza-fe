import { baseApi } from './baseApi.ts';
import { TPizzaSize, TPizzaType } from '../../features/catalog/constants.ts';


export interface CategoryWithProduct {
	id: number,
	name: string,
	products: Product[],
}

export interface Product {
	id: number,
	name: string,
	description: string,
	image: string,
	min_price: number,
	variation_have: boolean,
	count: number,
}

export interface ProductWithPagination {
	count: number,
	total_pages: number,
	next: string,
	previous: string,
	results: Product[],
}

export interface Ingredient {
	id: number,
	name: string,
	image: string,
	price: number,
}

export interface Variation {
	id: number,
	price: number,
	image: string,
	pizza_size?: TPizzaSize,
	pizza_type?: TPizzaType,
	// count?: number,
	// portion_size?: number,
	// volume?: number,
	// weight?: number,
	// mass?: number,
	ingredients: Ingredient[],
}

export interface ProductDetail {
	id: number,
	name: string,
	description: string,
	count: number,
	category_id: number,
	variations: Variation[],
}

/**
 * @function
 * @description Получение товаров
 */
export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({

		// все товары
		getAllProducts: builder.query<CategoryWithProduct[], void>({
			query: () => 'all_products/',
			providesTags: ['all_products'],
		}),

		// товары определенной категории с возможностью фильтрации
		getFilterProducts: builder.query<ProductWithPagination, { category_id?: string, page?: string }>({
			query: (query) => ({
				url: 'products/',
				params: query,
			}),
			providesTags: ['products'],
		}),

		// детальная информация о товаре
		getDetailProduct: builder.query<ProductDetail, { product_id?: number}>({
			query: (query) => ({
				url: `products/${query.product_id}`,
				params: query,
			}),
			providesTags: ['product_detail'],
		}),
	}),
});

export const { useGetAllProductsQuery, useGetFilterProductsQuery, useGetDetailProductQuery } = productApi;