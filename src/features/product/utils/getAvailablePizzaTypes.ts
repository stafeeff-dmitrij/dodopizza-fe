import { PizzaVariation } from '../../catalog/components/form/ChoicePizzaForm.tsx';
import { pizzaTypes, TPizzaSize } from '../../catalog/constants.ts';
import { Variant } from '../components/ProductDetail/VariationsGroup.tsx';


/**
 * Возврат доступных вариаций пицц (по типу теста) в зависимости от выбранного размера
 *
 * @param variations - вариации пицц
 * @param selectSize - выбранный размер пиццы
 *
 * @returns доступные вариации пицц
 */
export const getAvailablePizzaTypes = (variations: PizzaVariation[], selectSize: TPizzaSize): Variant[] => {

	// вариации пицц с текущим выбранным размером
	const filteredVariationBySize = variations.filter(variation => variation.pizza_size === selectSize);

	return pizzaTypes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredVariationBySize.some(variation => variation.pizza_type === item.value),
	}));

};