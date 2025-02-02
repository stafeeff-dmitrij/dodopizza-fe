import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PriceRangeProps, sortType } from './useFiltersParams.ts';
import { getFilterParams } from '../utils';


export interface Filters {
	prices: PriceRangeProps;
	selectedIngredients: Set<string>;
	sortType: sortType | undefined;
	onlyInHave: boolean;
	page: number;
}

/**
 * Запись параметров фильтрации в URL
 */
export const useQueryFilters = (filters: Filters) => {

	const [, setSearchParams] = useSearchParams();

	// очистка URL и запись параметров фильтрации
	useEffect(() => {
		const params = getFilterParams(filters);
		const updatedParams = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) {
			updatedParams.set(key, value as string);
		}
		setSearchParams(updatedParams);
	}, [filters]);

}