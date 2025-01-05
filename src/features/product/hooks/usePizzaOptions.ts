import React, { useState } from 'react';
import { useSet } from 'react-use';

import { TPizzaSize, TPizzaType } from '../constants.ts';
import { getVariationPizza } from '../utils';
import { PizzaVariation } from '../components/form/ChoicePizzaForm.tsx';


interface ReturnProps {
	size: TPizzaSize;
	type: TPizzaType;
	activeVariation: PizzaVariation,
	selectedIngredientsId: Set<number>;
	setSize: (size: TPizzaSize) => void;
	setType: (type: TPizzaType) => void;
	addIngredient: (id: number) => void;
}

/**
 * Определение и возврат параметров пиццы
 */
export const usePizzaOptions = (variations: PizzaVariation[]): ReturnProps => {

	// у всех товаров есть, минимум, 1 вариация
	// у пицц 5 вариаций -> по умолчанию 30 см, традиционная
	const [activeVariation, setActiveVariation] = useState<PizzaVariation>(variations.length > 1 ? variations[1] : variations[0]);

	// размер и тип пиццы
	const [size, setSize] = useState<TPizzaSize>(activeVariation.pizza_size);
	const [type, setType] = useState<TPizzaType>(activeVariation.pizza_type);

	// выбранные (уникальные) ингредиенты
	const [selectedIngredientsId, {toggle: addIngredient}] = useSet(new Set<number>([]));

	// смена активной вариации в зависимости от выбранных размеров и типа теста
	React.useEffect(() => {
		const activeVariation = getVariationPizza(variations, size, type);
		if (activeVariation) {
			setActiveVariation(activeVariation);
		} else {
			setActiveVariation(variations[0]);
		}
	}, [size, type])

	// сброс выбранных размеров и типа теста, если при смене размера (вариации) нет допустимого типа теста
	React.useEffect(() => {
		setSize(activeVariation.pizza_size);
		setType(activeVariation.pizza_type);
	}, [activeVariation])

	return {
		size,
		type,
		activeVariation,
		selectedIngredientsId,
		setSize,
		setType,
		addIngredient,
	};
};