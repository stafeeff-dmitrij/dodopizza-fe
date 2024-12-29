import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../../../components/ui';
import { ProductForm } from './form';

import { AppDispatch } from '../../../redux/store.ts';
import { setDeActiveModal, selectActiveProduct } from '../../../redux/slices/productModalSlice.ts';
import { cn } from '../../../lib';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Модальное окно выбора и добавления товара в корзину
 */
export const ChooseProductModal: React.FC<Props> = ({ className }) => {

	const navigate = useNavigate();

	const { openModal, activeProduct } = useSelector(selectActiveProduct);
	const dispatch = useDispatch<AppDispatch>()

	// закрытие модального окна с товаром
	const onCloseModalClick = () => {
		dispatch(setDeActiveModal());
		if (history.length > 1) {
			navigate(-1);  // возврат на предыдущий URL
		} else {
			navigate('/');
		}
	}

	// смена текущего URL
	React.useEffect(() => {
		if (activeProduct) {
			history.pushState(null, '', `/product/${activeProduct?.id}`);
		}
	}, [activeProduct])

	if (!activeProduct) {
		return null;
	}

	return (
		<Dialog open={openModal} onOpenChange={() => onCloseModalClick()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
					className,
				)}
			>
				<ProductForm productId={activeProduct.id} closeModal={onCloseModalClick} />

				{/* в консоли ругается, что DialogTitle обязателен при использовании DialogContent */}
				<DialogTitle>Товар</DialogTitle>
				<DialogDescription>Описание товара</DialogDescription>

			</DialogContent>
		</Dialog>
	);
};