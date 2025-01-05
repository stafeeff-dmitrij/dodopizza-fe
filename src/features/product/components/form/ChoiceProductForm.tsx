import React from 'react';

import { ProductDetail } from '../../../../redux/api/productApi.ts';
import { cn } from '../../../../lib';


interface Props extends ProductDetail {
	loading: boolean;
	className?: string;
}

/**
 * @component
 * @description Форма выбора товара
 *
 // * @prop {string} name - наименование товара
 // * @prop {string} description - описание товара
 // * @prop {IngredientVariation[]} ingredients - ингредиенты, доступные для данного товара
 // * @prop {ProductItem[]} items - вариации, доступные для данного товара
 * @prop {boolean} loading - статус загрузки
 // * @prop {function} onSubmit - функция для добавления товара в корзину
 */
export const ChoiceProductForm: React.FC<Props> = ({
	loading,
	className
}) => {
	return (
		<div className={cn(className)}>
			Форма выбора товара
		</div>
	);
};
