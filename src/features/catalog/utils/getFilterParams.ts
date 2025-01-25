import { sortType } from '../hooks/useFiltersParams.ts';
import { Filters } from '../hooks/useQueryFilters.ts';

export interface ReturnProps {
	category_id?: string;
	min_price?: number;
	max_price?: number;
	ingredients?: string[];
	sort?: sortType;
	page: number;
	page_size?: number;
}

/**
 * Возврат заполненных параметров фильтрации.
 * Используется для фильтрации незаполненных параметров перед отправкой запроса на бэк.
 */
export const getFilterParams = (filters: Filters, category_id?: string, pageSize?: number): ReturnProps => {

	const params: ReturnProps = {
		page: filters.page,
	};

	if (category_id) {
		params.category_id = category_id;
	}
	if (filters.prices.priceFrom) {
		params.min_price = filters.prices.priceFrom;
	}
	if (filters.prices.priceTo) {
		params.max_price = filters.prices.priceTo;
	}
	if (filters.selectedIngredients?.size) {
		params.ingredients = [...filters.selectedIngredients];
	}
	if (filters.sortType) {
		params.sort = filters.sortType;
	}
	if (pageSize) {
		params.page_size = pageSize;
	}

	return params;
}