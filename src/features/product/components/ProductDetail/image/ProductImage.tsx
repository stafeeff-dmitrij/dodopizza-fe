import React from 'react';

import { cn } from '../../../../../lib';

interface Props {
	imageUrl: string;
	alt: string;
	bigImage?: boolean;
	smaller?: boolean;
	className?: string;
}

/**
 * @component
 * @description Изображение товара
 *
 * @prop imageUrl - URL изображения
 * @prop alt - название изображения
 * @prop bigImage - флаг для отображения большого изображения
 * @prop smaller - флаг для отображения уменьшенных версий изображений
 */
export const ProductImage: React.FC<Props> = ({ imageUrl, alt, bigImage = true, smaller = false, className }) => {

	let percentImageWidth = bigImage ? 80 : 65;

	// для страниц уменьшение картинки товара на 20%
	if (smaller) {
		percentImageWidth -= 20;
	}

	return (
		<div className={cn("relative flex items-center justify-center flex-1 w-full", className)}>
			<img
				src={imageUrl}
				alt={alt}
				className={cn(`w-[${percentImageWidth}%]`, "relative left-2 top-2 aspect-square transition-all z-10 duration-300")}
			/>
		</div>
	);
};