import React from 'react';

interface Props {
	size: string;
	className?: string;
}

/**
 * @component
 * @description Изобрадение логотипа
 *
 * @prop {string} size - размер изображения
 */
export const LogoImg: React.FC<Props> = ({ size, className }) => {
	return (
		<img
			className={className}
			src="/images/icons/logo.svg"
			alt="Логотип ДОДО ПИЦЦА"
			width={size}
			height={size}
		/>
	);
}