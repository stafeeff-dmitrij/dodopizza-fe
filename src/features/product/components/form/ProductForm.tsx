import React from 'react';

import { useGetDetailProductQuery, Variation } from '../../../../redux/api/productApi.ts';
import { ChoicePizzaForm, PizzaVariation } from './ChoicePizzaForm.tsx';
import { ChoiceProductForm } from './ChoiceProductForm';
import { CategoriesId } from '../../constants.ts';
import { getErrorToast } from '../../../../lib';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store.ts';
import { setLoadingStatus } from '../../../../redux/slices/productModalSlice.ts';
import { NotFound } from '../../../../pages';


interface Props {
	productId: number;
	closeModal?: () => void;
}

/**
 * @component
 * @description Форма выбора товара - возвращает форму нужного типа в зависимости от категории выобранного товара
 *
 * @prop productId - id товара
 * @prop closeModal - функция закрытия модального окна
 */
export const ProductForm: React.FC<Props> = ({ productId, closeModal }) => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>()

	const { data, isLoading, isSuccess, isError, error } = useGetDetailProductQuery({ product_id: productId });

	// добавление товара в корзину
	const onSubmit = async (variationId: number, ingredientsId?: number[]) => {
		await addProductToCart(data!, variationId, ingredientsId);
		closeModal?.();
	};

	React.useEffect(() => {
		if (isSuccess) {
			dispatch(setLoadingStatus(false));
		}
	}, [data, isSuccess])

	if (isError) {
		if ('status' in error && error.status === 404) {
			return <NotFound/>;
		}
		getErrorToast('Ошибка при получении данных о товаре');
		dispatch(setLoadingStatus(false));
		closeModal?.();
		navigate('/');
	}

	if (isSuccess) {
		if (data.category_id === CategoriesId.pizzas) {
			return <ChoicePizzaForm
				name={data.name}
				description={data.description}
				count={data.count}
				variations={data.variations as PizzaVariation[]}
				default_ingredients={data.default_ingredients}
				loading={isLoading}
				onSubmit={onSubmit}
			/>
		} else if (data.category_id === CategoriesId.combo) {
			return <p>Форма для комбо товаров еще не готова</p>
		} else {
			return <ChoiceProductForm
				// средний размер формы, если хотя бы в одной вариации товара есть ингредиенты, иначе маленький
				size={data.variations.some(variation => variation.ingredients.length > 0) ? 'medium' : 'small'}
				categoryId={data.category_id}
				name={data.name}
				description={data.description}
				count={data.count}
				variations={data.variations as Variation[]}
				loading={isLoading}
				onSubmit={onSubmit}
			/>
		}
	}
};