import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSet } from 'react-use';


export interface PriceRangeProps {
	priceFrom: number;
	priceTo: number;
}

export type sortType = 'popular' | 'price' | 'name';

export interface FilterParams {
	prices: PriceRangeProps;
	selectedIngredients: Set<string>;
	sortType: sortType | undefined;
	page: number;
	setPrices: (name: keyof PriceRangeProps, value: number) => void;
	setSelectedIngredients: (value: string) => void;
	setPage: (value: number) => void;
	setSortType: (value: sortType) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 2000;

/**
 * @function
 * @description Чтение из URL, хранение и возврат параметров фильтрации товаров
 */
export const useFiltersParams = (): FilterParams => {

	const [searchParams] = useSearchParams();

	const [sortType, setSortType] = useState<sortType | undefined>(searchParams.get('sort') as sortType);
	const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

	// диапазон стоимости товаров
	const [prices, setPrices] = React.useState<PriceRangeProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || MIN_PRICE,
		priceTo: Number(searchParams.get('priceTo')) || MAX_PRICE,
	});

	// выбранные ингредиенты
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(
		searchParams.get('ingredients')?.split(','))
	);

	const updatePrices = (name: keyof PriceRangeProps, value: number) => {
		setPrices(prev => ({ ...prev, [name]: value }));
	};

	// сброс страницы при изменении чувствительных данных
	React.useEffect(() => {
		setPage(1);
	}, [prices, selectedIngredients])

	return React.useMemo(
		() => ({
			prices,
			selectedIngredients,
			page,
			sortType,
			setPrices: updatePrices,
			setSelectedIngredients: toggleIngredients,
			setPage,
			setSortType
		}),
		[prices, selectedIngredients, page, sortType],
	);
};