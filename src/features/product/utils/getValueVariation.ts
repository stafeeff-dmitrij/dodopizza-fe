import { Variation } from '../../../redux/api/productApi.ts';
import { CategoriesId, TProductValue } from '../constants.ts';

/**
 * @function
 * @description Возврат значения параметра переданной вариации
 *
 * @prop {number} categoryId - id категории товара
 * @prop {Variation} variation - вариация товара
 *
 * @return {string} описание товара
 */
export const getValueVariation = (categoryId: number, variation: Variation): TProductValue => {

	switch (categoryId) {
		// case CategoriesId.pizzas:
		// 	if (variation.pizza_size && variation.pizza_type) {
		// 		description = `${mapPizzaSize[variation.pizza_size]}, ${mapPizzaType[variation.pizza_type].toLowerCase()} тесто`;
		// 	}
		// 	break;
		case CategoriesId.snacks:
		case CategoriesId.breakfasts:
		case CategoriesId.desserts:
		case CategoriesId.sauces:
			if (variation.count) {
				return variation.count;
			}
			if (variation.portion_size) {
				return variation.portion_size;
			}
			break;
		case CategoriesId.cocktails:
		case CategoriesId.coffee:
		case CategoriesId.drinks:
			if (variation.volume) {
				return variation.volume;
			}
			if (variation.count) {
				return variation.count;
			}
			break;
		case CategoriesId.other:
			if (variation.count) {
				return variation.count;
			}
			if (variation.weight) {
				return variation.weight;
			}
			break;
	}

	// TODO Костыль
	return 1;
}