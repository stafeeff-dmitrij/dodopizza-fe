import React from 'react';

import { cn } from '../../lib';


type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
	size?: TitleSize;
	text: string;
	className?: string;
}

/**
 * @component
 * @description Заголовок
 *
 * @prop {string} text - текст заголовка
 * @prop {string} size - размер заголовка
 * @prop {string} className - стили
 */
export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {

	const mapTagBySize = {
		xs: 'h5',
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	} as const;

	const mapClassNameBySize = {
		xs: 'text-[16px]',
		sm: 'text-[20px]',
		md: 'text-[24px]',
		lg: 'text-[36px]',
		xl: 'text-[42px]',
		'2xl': 'text-[52px]',
	} as const;

	return React.createElement(
		mapTagBySize[size],
		{ className: cn(mapClassNameBySize[size], className) },
		text,
	);
};