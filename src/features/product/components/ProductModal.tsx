import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
export const ProductModal: React.FC<Props> = ({ className }) => {

	const navigate = useNavigate();

	const { openModal, loading, activeProduct } = useSelector(selectActiveProduct);
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

	// чтобы не было ошибки при рендере страницы с товарами, когда активный товар еще не выбран
	if (!activeProduct) {
		return null;
	}

	return (
		<Dialog open={openModal} onOpenChange={() => onCloseModalClick()}>
			{/*
				Вместо лоадера для разных типов модалок просто не выводим модалку, пока идет загрузка детальной информации о товаре - loading.
				В противном случае размеры модалки скачут до и после загрузки данных о товаре.
			*/}
			<DialogContent
				className={cn('inline-table p-0 sm:rounded-[20px] overflow-hidden', [{'hidden': loading}], className)}
			>
				<ProductForm productId={activeProduct.id} closeModal={onCloseModalClick} />
				{/* визуально скрываем заголовок и описание (обязательны внутри DialogContent) */}
				<VisuallyHidden>
					<DialogTitle>{activeProduct.name}</DialogTitle>
					<DialogDescription>{activeProduct.description}</DialogDescription>
				</VisuallyHidden>
			</DialogContent>
		</Dialog>
	);
};