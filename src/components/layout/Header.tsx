import React from 'react';

import { Container } from './Container.tsx';
import { LogoLink } from '../shared';
import { SearchInput } from '../input';
import { CartButton } from '../button';


interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

/**
 * @component
 * @description Шапка сайта с логотипом
 *
 * @prop {boolean} hasSearch - флаг для отображения инпута поиска
 * @prop {boolean} hasCart - флаг для отображения кнопки корзины
 */
export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
	return (
		<header className={className}>
			<Container className="flex items-center justify-between py-6">
				<LogoLink/>
				{hasSearch && <SearchInput className="mx-12"/>}
				<div className="flex items-center gap-2.5">
					{hasCart && <CartButton/>}
				</div>
			</Container>
		</header>
	);
}