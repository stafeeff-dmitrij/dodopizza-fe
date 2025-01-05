import { PizzaVariation } from '../components/form/ChoicePizzaForm.tsx';


/**
 * Подсчет и возврат общей стоимости с учетом переданной вариации пиццы и ингредиентов
 *
 * @param variation - вариация пиццы
 * @param selectedIngredientsId - id выбранных ингредиентов
 *
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
	variation: PizzaVariation,
	selectedIngredientsId: Set<number>,
) => {

	const totalIngredientsPrice = variation.ingredients
		.filter(ingredient => selectedIngredientsId.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return variation.price + totalIngredientsPrice;
};