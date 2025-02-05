import { baseApi } from './baseApi.ts';
import {
	TPizzaSize,
	TPizzaType,
	TPortionSize,
	TProductCount,
	TProductVolume, TWeightValue
} from '../../features/product/constants.ts';
import { Ingredient } from './ingredientsApi.ts';
import { sortType } from '../../features/catalog/hooks/useFiltersParams.ts';

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
	variations_have: boolean,
	count: number,
}

// ингредиенты вариации товара
export interface IngredientVariation extends Ingredient {
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
	count?: TProductCount,
	portion_size?: TPortionSize,
	volume?: TProductVolume,
	weight?: TWeightValue,
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
	default_ingredients: Ingredient[],
	variations: Variation[],
}

interface filterParams {
	search?: string,
	category_id?: string,
	sort?: sortType,
	min_price?: number,
	max_price?: number,
	ingredients?: string[],
	page?: number,
	page_size?: number
}

/**
 * @function
 * @description Получение товаров
 */
export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({

		// все товары с группировкой по категориям (для главной страницы)
		getAllProducts: builder.query<CategoryWithProduct[], void>({
			query: () => 'all_products/',
			providesTags: ['all_products'],
		}),

		// отфильтрованные товары определенной категории
		getFilterProducts: builder.query<ProductWithPagination, filterParams>({
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