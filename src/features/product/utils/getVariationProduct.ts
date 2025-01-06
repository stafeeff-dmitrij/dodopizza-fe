import { CategoriesId, TProductValue } from '../constants.ts';
import { Variation } from '../../../redux/api/productApi.ts';


/**
 * @function
 * @description Возврат вариации товара по переданной категории и значению
 *
 * @prop {number} categoryId - id категории
 * @prop {Variation[]} variations - вариации товара
 * @prop {TProductValue} value - значение активной вариации
 */
export const getVariationProduct = (
	categoryId: number,
	variations: Variation[],
	value: TProductValue,
) => {

	return variations.find(variation => {

		switch (categoryId) {
			case CategoriesId.snacks:
				if (variation.count && variation.count === value) {
					return variation;
				}
				break;
		}
	});

};