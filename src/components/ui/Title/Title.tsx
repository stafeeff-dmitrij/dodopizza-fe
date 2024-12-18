import React from 'react';
import cn from 'classnames';

import styles from './Title.module.scss';


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
		xs: styles.text_xs,
		sm: styles.text_sm,
		md: styles.text_md,
		lg: styles.text_lg,
		xl: styles.text_xl,
		'2xl': styles.text_2xl,
	} as const;

	return React.createElement(
		mapTagBySize[size],
		{ className: cn(mapClassNameBySize[size], className) },
		text,
	);
};