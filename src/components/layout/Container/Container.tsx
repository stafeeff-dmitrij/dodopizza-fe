import React from 'react';
import cn from 'classnames';

import styles from './Container.module.scss';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Контейнер для ограничения максимальной ширины страницы и центрирования дочерних компонентов
 */
const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn(styles.container, className)}>
		{children}
	</div>;
};

export default Container;