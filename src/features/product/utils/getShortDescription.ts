import { mapPizzaSize, mapPizzaType } from '../../catalog/constants.ts';
import { PizzaVariation } from '../../catalog/components/form/ChoicePizzaForm.tsx';


/**
 * @function
 * @description Возврат короткого описания пиццы в зависимости от выбранной вариации
 *
 * @prop {PizzaVariation} variation - вариация пиццы
 */
export const getShortPizzaDescription = (variation: PizzaVariation) => {
	return `${mapPizzaSize[variation.pizza_size]}, ${mapPizzaType[variation.pizza_type].toLowerCase()} тесто, ${variation.mass} г`;
}