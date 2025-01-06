import { IngredientVariation } from '../../../redux/api/productApi.ts';

/**
 * Возврат доступных ингредиентов
 *
 * @param ingredients - ингредиенты конкретной вариации товара
 * @param selectedIngredientsId - id выбранных ингредиентов среди всех вариаций товара
 *
 * @returns доступные ингредиенты для переданной вариации товара
 */
export const getCurrentIngredients = (ingredients: IngredientVariation[], selectedIngredientsId: Set<number>): number[] => {
	const ingredientsIds = ingredients.map(ingredient => ingredient.id);
	return Array.from(selectedIngredientsId).filter(ingredientId => ingredientsIds.includes(ingredientId));
};