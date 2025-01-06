import { CategoriesId, mapProductCount, mapProductVolume } from '../constants.ts';
import { Variation } from '../../../redux/api/productApi.ts';
import { Variant } from '../components/ProductDetail/Variation.tsx';


/**
 * Возврат доступных вариаций товара
 *
 * @param categoryId - id категории
 * @param variations - вариации товара
 *
 * @returns доступные вариации товара
 */
export const getAvailableVariations = (categoryId: number, variations: Variation[]): Variant[] => {

	// switch (categoryId) {
		// case CategoriesId.pizzas:
		// 	if (variation.pizza_size && variation.pizza_type) {
		// 		description = `${mapPizzaSize[variation.pizza_size]}, ${mapPizzaType[variation.pizza_type].toLowerCase()} тесто`;
		// 	}
		// 	break;
		// case CategoriesId.snacks:
		// case CategoriesId.breakfasts:
		// case CategoriesId.desserts:
		// case CategoriesId.sauces:
		// 	if (variation.count) {
		// 		description = `${[variation.count]} шт`;
		// 	}
		// 	if (variation.portion_size) {
		// 		description = `${[variation.portion_size]}`;
		// 	}
		// 	break;
		// case CategoriesId.cocktails:
		// case CategoriesId.coffee:
		// case CategoriesId.drinks:
		// 	if (variation.volume) {
		// 		`${variation.volume} л`;
		// 	}
		// 	if (variation.count) {
		// 		description = `${[variation.count]} шт`;
		// 	}
		// 	break;
		// case CategoriesId.other:
		// 	if (variation.count) {
		// 		description = `${[variation.count]} шт`;
		// 	}
		// 	if (variation.weight) {
		// 		description = `${[variation.weight]} кг`;
		// 	}
		// 	break;
	// }

	const variants = variations.map(variation => {
		switch (categoryId) {
			case CategoriesId.snacks:
			case CategoriesId.breakfasts:
			case CategoriesId.desserts:
			case CategoriesId.sauces:
				if (variation.count) {
					return {
						name: mapProductCount[variation.count],
						value: variation.count,
					}
				}
				// if (variation.portion_size) {
				// 	return {
				// 		name: mapProductCount[variation.portion_size],
				// 		value: variation.portion_size,
				// 	}
				// }
				break;
			case CategoriesId.cocktails:
			case CategoriesId.coffee:
			case CategoriesId.drinks:
				if (variation.volume) {
					return {
						name: mapProductVolume[variation.volume],
						value: variation.volume,
					}
				}
				if (variation.count) {
					return {
						name: mapProductCount[variation.count],
						value: variation.count,
					}
				}
				break;
		}
	})

	return variants.filter((variant) => variant !== undefined);
};