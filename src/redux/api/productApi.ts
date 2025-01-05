import { baseApi } from './baseApi.ts';
import { TPizzaSize, TPizzaType } from '../../features/catalog/constants.ts';

// главная страница
export interface CategoryWithProduct {
	id: number,
	name: string,
	products: Product[],
}

// товары конкретной категории
export interface ProductWithPagination {
	count: number,
	total_pages: number,
	next: string,
	previous: string,
	results: Product[],
}

// карточка товаров
export interface Product {
	id: number,
	name: string,
	description: string,
	image: string,
	min_price: number,
	variation_have: boolean,
	count: number,
}

// дефолтные ингредиенты товара
export interface IngredientProduct {
	id: number,
	name: string,
}

// ингредиенты вариации товара
export interface IngredientVariation extends IngredientProduct {
	image: string,
	price: number,
}

// вариация товара
export interface Variation {
	id: number,
	price: number,
	image: string,
	pizza_size?: TPizzaSize,
	pizza_type?: TPizzaType,
	mass?: number,
	ingredients: IngredientVariation[],
}

// модалка и страница выбора товара
export interface ProductDetail {
	id: number,
	name: string,
	description: string,
	count: number,
	category_id: number,
	default_ingredients: IngredientProduct[],
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

		// отфильтрованные товары определенной категории
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