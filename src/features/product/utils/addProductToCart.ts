import { getErrorToast, getSuccessToast } from '../../../lib';


interface ProductProps {
	id: number;
	name: string;
}

/**
 * Добавление товара в корзину
 *
 * @param product - товар
 * @param variationId - id вариации
 * @param ingredientsId - id выбранных ингредиентов
 */
export const addProductToCart = async (product: ProductProps, variationId?: number, ingredientsId?: number[]) => {
	try {
		getSuccessToast(
			`Товар: id:${product.id} "${product.name}" 
			   id вариации: ${variationId} 
			   id ингредиентов: ${ingredientsId && ingredientsId.length > 0 ? ingredientsId : '-'}`
		);
	} catch (err) {
		getErrorToast('Не удалось добавить товар в корзину');
		console.error(err);
	}
};