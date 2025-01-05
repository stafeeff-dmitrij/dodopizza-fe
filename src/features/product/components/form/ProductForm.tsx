import React from 'react';

import { useGetDetailProductQuery } from '../../../../redux/api/productApi.ts';
import { ChoicePizzaForm, PizzaVariation } from './ChoicePizzaForm.tsx';
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

	const { data, isLoading, isSuccess, isError } = useGetDetailProductQuery({ product_id: productId });

	if (isError) {
		return <p>Ошибка!</p>;
	}

	// TODO Размеры для всех типов форм
	// const mapFormSize = {
	// 	small: 'w-[740px] h-[420px]',
	// 	average: 'w-[920px] h-[610px]',
	// 	big: 'w-[980px] h-[768px]',
	// } as const;

	if (isSuccess) {
		if (data.category_id === CategoriesId.pizzas) {
			return <ChoicePizzaForm
				name={data.name}
				description={data.description}
				variations={data.variations as PizzaVariation[]}
				default_ingredients={data.default_ingredients}
				loading={isLoading}
			/>
		} else {
			return <ChoiceProductForm loading={isLoading}/>
		}
	}
};