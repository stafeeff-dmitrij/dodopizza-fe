import React from 'react';

import { cn } from '../../lib';

interface Props {
	text: string;
	className?: string;
}

/**
 * @component
 * @description Вывод короткого текста
 *
 * @prop {string} text - фраза для вывода
 */
export const TextSnippet: React.FC<Props> = ({ text, className }) => {
	return (
		<b className={cn('text-sm font-normal', className)}>{text}</b>
	);
};