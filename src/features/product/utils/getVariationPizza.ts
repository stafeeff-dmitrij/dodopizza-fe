import { TPizzaSize, TPizzaType } from '../constants.ts';
import { PizzaVariation } from '../components/form/ChoicePizzaForm.tsx';


/**
 * @function
 * @description Возврат вариации пиццы по переданным размерам и типу теста
 *
 * @prop {Variation[]} variations - вариации пицц
 * @prop {TPizzaSize} size - размер пиццы
 * @prop {TPizzaType} type - тип теста пиццы
 */
export const getVariationPizza = (
	variations: PizzaVariation[],
	size: TPizzaSize,
	type: TPizzaType
) => {
	return variations.find(variation => {
		if (variation.pizza_size && variation.pizza_type && variation.pizza_size === size && variation.pizza_type === type) {
			return variation;
		}
	});
}