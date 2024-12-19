import React from 'react';

import { cn } from '../../lib';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Контейнер для ограничения максимальной ширины страницы и центрирования дочерних компонентов
 */
export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn("mx-auto max-w-[1024px]", className)}>
		{children}
	</div>;
};