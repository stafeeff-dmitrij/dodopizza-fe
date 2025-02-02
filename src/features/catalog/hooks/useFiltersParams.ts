import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSet } from 'react-use';
import { MAX_PRICE, MIN_PRICE } from '../constants.ts';


export interface PriceRangeProps {
	priceFrom: number;
	priceTo: number;
}

export type sortType = 'popular' | 'price' | 'name';

export interface FilterParams {
	prices: PriceRangeProps;
	selectedIngredients: Set<string>;
	page: number;
	sortType: sortType | undefined;
	onlyInHave: boolean;
	setPrices: (name: keyof PriceRangeProps, value: number) => void;
	setSelectedIngredients: (value: string) => void;
	setPage: (value: number) => void;
	setSortType: (value: sortType) => void;
	setOnlyInHave: (value: boolean) => void;
}

/**
 * @function
 * @description Чтение из URL, хранение и возврат параметров фильтрации товаров
 *
 * @arg id - id активной категории товаров
 */
export const useFiltersParams = (id?: string): FilterParams => {

	const [searchParams] = useSearchParams();
	const lastCategoryId = React.useRef(id);  // id старой активной категории товаров

	const [sortType, setSortType] = useState<sortType | undefined>(searchParams.get('sort') as sortType || '');
	const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
	const [onlyInHave, setOnlyInHave] = useState(!!searchParams.get('in_have') || false);

	// диапазон стоимости товаров
	const [prices, setPrices] = React.useState<PriceRangeProps>({
		priceFrom: Number(searchParams.get('min_price')) || MIN_PRICE,
		priceTo: Number(searchParams.get('max_price')) || MAX_PRICE,
	});

	// выбранные ингредиенты
	const [selectedIngredients, { toggle: toggleIngredients, clear: clearIngredients }] = useSet(new Set<string>(
		searchParams.get('ingredients')?.split(',')
	));

	const updatePrices = (name: keyof PriceRangeProps, value: number) => {
		setPrices(prev => ({ ...prev, [name]: value }));
	};

	// сброс параметров фильтрации при изменении категории товаров
	// используем lastCategoryId, чтобы параметры фильтрации не сбрасывались при открытии страницы по ссылке с активными параметрами
	useEffect(() => {
		if (lastCategoryId.current != id) {
			clearIngredients();
			setSortType(searchParams.get('sort') as sortType || '');
			setOnlyInHave(!!searchParams.get('in_have') || false);
			setPage(Number(searchParams.get('page')) || 1);
			lastCategoryId.current = id;
		}
	}, [id]);

	return React.useMemo(
		() => ({
			prices,
			selectedIngredients,
			page,
			sortType,
			onlyInHave,
			setPrices: updatePrices,
			setSelectedIngredients: toggleIngredients,
			setPage,
			setSortType,
			setOnlyInHave,
		}),
		[prices, selectedIngredients, page, sortType, onlyInHave],
	);
};