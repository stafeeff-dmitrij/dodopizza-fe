import { CategoriesId, mapPortionSize, mapProductCount, mapProductVolume, mapWeightValue } from '../constants.ts';
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
				if (variation.portion_size) {
					return {
						name: mapPortionSize[variation.portion_size],
						value: variation.portion_size,
					}
				}
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
			case CategoriesId.other:
				if (variation.count) {
					return {
						name: mapProductCount[variation.count],
						value: variation.count,
					}
				}
				if (variation.weight) {
					return {
						name: mapWeightValue[variation.weight],
						value: variation.weight,
					}
				}
				break;
		}
	})

	return variants.filter((variant) => variant !== undefined);
};