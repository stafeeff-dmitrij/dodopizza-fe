import React from 'react';
import { useDispatch } from 'react-redux';

import { Title } from '../../../../components/typography';
import { Button } from '../../../../components/ui';

import { AppDispatch } from '../../../../redux/store.ts';
import { Product } from '../../../../redux/api/productApi.ts';
import { setActiveModal } from '../../../../redux/slices/productModalSlice.ts';
import { cn, getErrorToast } from '../../../../lib';


interface Props {
	product: Product;
	className?: string;
}

/**
 * @component
 * @description Карточка товара
 *
 * @prop {Product} product - товар
 */
export const ProductCard: React.FC<Props> = ({ product, className }) => {

	const dispatch = useDispatch<AppDispatch>()

	// открытие модального окна с товаром из карточки
	const onOpenModalClick = () => {
		dispatch(setActiveModal(product));
	}

	// добавление товара в корзину
	const onAddProductToCartClick = (even: React.MouseEvent<HTMLButtonElement>) => {
		even.stopPropagation();  // останавливаем открытие модального окна
		getErrorToast('Добавление товара в корзину еще не реализовано!');
	}

	return (
		<div
			className={cn('flex flex-col justify-between min-w-[233px] cursor-pointer', className)}
			onClick={() => onOpenModalClick()}
		>
			<div className="flex flex-col">
				<img
					className="w-[233px] h-[233px] self-center transition-transform duration-300 hover:translate-y-1"
					src={product.image ? product.image : '/images/icons/not-product.svg'}
					alt={product.name}
				/>
				<Title text={product.name} size="sm" className="mb-2 mt-2 font-normal"/>
				<p className="mb-4 text-sm font-normal text-[#73798C]">
					{product.description}
				</p>
			</div>
			<div className="flex justify-between items-center">
				{product.count > 0 && <span className="text-[16px] font-semibold">
				{product.variation_have && 'от '}
					<b>{product.min_price} ₽</b>
			</span>}
				{product.count != 0 &&
					<Button
						className="px-7 py-2 text-[16px] font-normal"
						variant="secondary"
						onClick={product.variation_have ? onOpenModalClick : onAddProductToCartClick}
					>
						{product.variation_have ? 'Выбрать' : 'В корзину'}
					</Button>
				}
				{product.count === 0 &&
					<Button
						className="ml-auto px-5 py-2 text-[16px] font-normal"
						variant="block"
						disabled={true}
					>
						Раскупили
					</Button>
				}
			</div>
		</div>
	);
};