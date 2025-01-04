import React from 'react';

import { cn } from '../../../../../lib';
import { PizzaSize } from '../../../../catalog/constants.ts';

interface Props {
	imageUrl: string;
	// size: 25 | 30 | 35;
	// type: 'slim' | 'traditional';
	className?: string;
}

/**
 * @component
 * @description Изображение пиццы
 *
 * @prop {string} imageUrl - URL изображения
 // * @prop {number} size - размер пиццы
 // * @prop {string} type - тип теста пиццы
 */
// export const PizzaImage: React.FC<Props> = ({ imageUrl, size, type, className }) => {
export const PizzaImage: React.FC<Props> = ({ imageUrl, className }) => {

	const size = 30;

	return (
		<div className={cn('relative flex items-center justify-center flex-1 w-full', className)}>
			<img
				src={imageUrl}
				// src='/images/icons/not-product.svg'
				alt="Logo"
				className={cn('relative left-2 top-2 aspect-square transition-all z-10 duration-300', {
					'w-[334px]': size === PizzaSize.small,
					'w-[409px]': size === PizzaSize.average,
					'w-[480px]': size === PizzaSize.big,
				})}
			/>
			{/* блоки для обозначения черточек вокруг изображения пиццы для обозначения границ большего размера пиццы */}
			<div className={cn(
				"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] aspect-square",
				{"hidden": size === PizzaSize.average || size === PizzaSize.big},
			)}/>
			<div className={cn(
				"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[440px] aspect-square",
				{"hidden": size === PizzaSize.big},
			)}/>
		</div>
	);
};