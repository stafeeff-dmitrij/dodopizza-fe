import { CategoriesId, mapPizzaSize, mapPizzaType } from '../constants.ts';
import { PizzaVariation } from '../components/form/ChoicePizzaForm.tsx';
import { Variation } from '../../../redux/api/productApi.ts';


/**
 * @function
 * @description Возврат короткого описания пиццы в зависимости от выбранной вариации
 *
 * @prop {PizzaVariation} variation - вариация пиццы
 */
export const getShortDescriptionPizza = (variation: PizzaVariation) => {
	return `${mapPizzaSize[variation.pizza_size]}, ${mapPizzaType[variation.pizza_type].toLowerCase()} тесто, ${variation.mass} г`;
}

/**
 * @function
 * @description Возврат короткого описания товара в зависимости от переданной вариации
 *
 * @prop {number} categoryId - id категории товара
 * @prop {Variation} variation - вариация товара
 *
 * @return {string} описание товара
 */
export const getShortDescriptionProduct = (categoryId: number, variation: Variation): string => {

	let description = '';

	switch (categoryId) {
		case CategoriesId.pizzas:
			if (variation.pizza_size && variation.pizza_type) {
				description = `${mapPizzaSize[variation.pizza_size]}, ${mapPizzaType[variation.pizza_type].toLowerCase()} тесто`;
			}
			break;
		case CategoriesId.snacks:
		case CategoriesId.breakfasts:
		case CategoriesId.desserts:
		case CategoriesId.sauces:
			if (variation.count) {
				description = `${[variation.count]} шт`;
			}
			if (variation.portion_size) {
				description = `${[variation.portion_size]}`;
			}
			break;
		case CategoriesId.cocktails:
		case CategoriesId.coffee:
		case CategoriesId.drinks:
			if (variation.volume) {
				description = `${variation.volume} л`;
			}
			if (variation.count) {
				description = `${[variation.count]} шт`;
			}
			break;
		case CategoriesId.other:
			if (variation.count) {
				description = `${[variation.count]} шт`;
			}
			if (variation.weight) {
				description = `${[variation.weight]} кг`;
			}
			break;
	}

	if (description && variation.mass) {
		description += `, ${variation.mass} г`;
	}

	return description;
}