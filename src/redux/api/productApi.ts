import { baseApi } from './baseApi.ts';


export interface Product {
	id: number,
	name: string,
	description: string,
	image: string,
	min_price: number,
	variation_have: boolean,
	count: number,
}

export interface CategoryWithProduct {
	id: number,
	name: string,
	products: Product[],
}

export interface ProductWithPagination {
	count: number,
	total_pages: number,
	next: string,
	previous: string,
	results: Product[],
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
		getDetailProduct: builder.query<Product, { product_id?: number}>({
			query: (query) => ({
				url: `products/${query.product_id}`,
				params: query,
			}),
			providesTags: ['product_detail'],
		}),
	}),
});

export const { useGetAllProductsQuery, useGetFilterProductsQuery, useGetDetailProductQuery } = productApi;