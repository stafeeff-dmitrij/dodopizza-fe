import React from 'react';

import { cn } from '../../../../../lib';

interface Props {
	imageUrl: string;
	alt: string;
	bigImage?: boolean;
	className?: string;
	imageClassName?: string;
}

/**
 * @component
 * @description Изображение товара
 *
 * @prop imageUrl - URL изображения
 * @prop alt - название изображения
 * @prop bigImage - флаг для отображения большого изображения
 */
export const ProductImage: React.FC<Props> = ({ imageUrl, alt, bigImage = true, className, imageClassName }) => {

	return (
		<div className={cn("relative flex items-center justify-center flex-1 w-full", className)}>
			<img
				src={imageUrl}
				alt={alt}
				className={cn(
					"relative left-2 top-2 w-[65%] aspect-square transition-all z-10 duration-300",
					{'w-[78%]': bigImage},
					imageClassName)}
			/>

		</div>
	);
};