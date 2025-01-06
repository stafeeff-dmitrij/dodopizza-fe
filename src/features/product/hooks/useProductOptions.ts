import React, { useState } from 'react';
import { useSet } from 'react-use';

import { TProductValue } from '../constants.ts';
import { getValueVariation, getVariationProduct } from '../utils';
import { Variation } from '../../../redux/api/productApi.ts';


interface ReturnProps {
	value: TProductValue;
	activeVariation: Variation,
	selectedIngredientsId: Set<number>;
	setValue: (value: TProductValue) => void;
	addIngredient: (id: number) => void;
}

/**
 * Определение и возврат параметров товара
 */
export const useProductOptions = (categoryId: number, variations: Variation[]): ReturnProps => {

	// у всех товаров есть, минимум, 1 вариация
	const [activeVariation, setActiveVariation] = useState<Variation>(variations[0]);

	// значение активной вариации
	const variationValue = getValueVariation(categoryId, activeVariation);
	const [value, setValue] = useState(variationValue);

	// выбранные (уникальные) ингредиенты
	const [selectedIngredientsId, {toggle: addIngredient}] = useSet(new Set<number>([]));

	// смена активной вариации в зависимости от текущего значения
	React.useEffect(() => {
		const activeVariation = getVariationProduct(categoryId, variations, value);
		if (activeVariation) {
			setActiveVariation(activeVariation);
		} else {
			setActiveVariation(variations[0]);
		}
	}, [value])

	return {
		value,
		activeVariation,
		selectedIngredientsId,
		setValue,
		addIngredient,
	};
};