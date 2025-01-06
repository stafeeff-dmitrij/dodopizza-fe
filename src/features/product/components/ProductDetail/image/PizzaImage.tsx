import React from 'react';

import { cn } from '../../../../../lib';
import { PizzaSize, TPizzaSize } from '../../../constants.ts';

interface Props {
	imageUrl: string;
	alt: string;
	size: TPizzaSize;
	className?: string;
}

/**
 * @component
 * @description Изображение пиццы
 *
 * @prop {string} imageUrl - URL изображения
 * @prop {string} alt - название изображения
 * @prop {TPizzaSize} size - размер изображения
 * @prop {number} size - размер пиццы
 */
export const PizzaImage: React.FC<Props> = ({ imageUrl, alt, size, className }) => {
	return (
		<div className={cn('relative flex items-center justify-center flex-1 w-full', className)}>
			<img
				src={imageUrl}
				alt={alt}
				className={cn('relative left-2 top-2 aspect-square transition-all z-10 duration-300', {
					'w-[334px]': size === PizzaSize.small,
					'w-[409px]': size === PizzaSize.average,
					'w-[480px]': size === PizzaSize.big,
				})}
			/>
			{/* черточки для обозначения границ большего размера пиццы */}
			<div className={cn(
				"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] aspect-square",
				{"hidden": size === PizzaSize.average || size === PizzaSize.big},
			)}/>
			<div className={cn(
				"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[440px] aspect-square",
				{"hidden": size === PizzaSize.big},
			)}/>
		</div>
	);
};