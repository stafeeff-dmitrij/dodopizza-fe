import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../lib';

interface Props {
	link: string;
	name?: string;
	className?: string;
}

/**
 * @component
 * @description Ссылка меню
 *
 * @prop {string} link - ссылка для редиректа
 * @prop {string} name - наименование для вывода
 */
export const LinkMenu: React.FC<React.PropsWithChildren<Props>> = ({ link, name, children, className }) => {
	return (
		<Link to={link} className={cn('flex items-center gap-x-1.5 text-black hover:text-primary transition duration-300', className)}>
			{children}
			{name && <p className='font-medium text-[13px] text-center'>{name}</p>}
		</Link>
	);
};