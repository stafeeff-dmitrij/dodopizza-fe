import React from 'react';

import { useGetDetailProductQuery } from '../../../../redux/api/productApi.ts';
import { ChoicePizzaForm } from './ChoicePizzaForm.tsx';
import { ChoiceProductForm } from './ChoiceProductForm.tsx';
import { CategoriesId } from '../../constants.ts';


// type FormSize = 'small' | 'average' | 'big';

interface Props {
	productId: number;
	closeModal?: () => void;
}

/**
 * @component
 * @description Форма выбора товара - возвращает форму нужного типа в зависимости от категории выобранного товара
 *
 * @prop {number} productId - id товара
 * @prop {function} closeModal - функция закрытия модального окна
 */
export const ProductForm: React.FC<Props> = ({ productId, closeModal }) => {

	const mapFormSize = {
		small: 'w-[740px] h-[420px]',
		average: 'w-[920px] h-[610px]',
		big: 'w-[980px] h-[768px]',
	} as const;

	const { data, isLoading, isSuccess, isError } = useGetDetailProductQuery({ product_id: productId });

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (isError) {
		return <p>Ошибка!</p>;
	}

	if (isSuccess) {
		if (data.category_id === CategoriesId.pizzas) {
			return <ChoicePizzaForm loading={isLoading} {...data}/>
		} else {
			return <ChoiceProductForm loading={isLoading}/>
		}
	}
};