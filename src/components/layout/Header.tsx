import React from 'react';

import { Container } from './Container.tsx';
import { LogoLink } from '../shared';
import { SearchInput } from '../input';
import { ProfileButton } from '../button';


interface Props {
	hasSearch?: boolean;
	className?: string;
}

/**
 * @component
 * @description Шапка сайта с логотипом
 *
 * @prop {boolean} hasSearch - флаг для отображения инпута поиска
 */
export const Header: React.FC<Props> = ({ hasSearch = true, className }) => {
	return (
		<header className={className}>
			<Container className="flex items-center justify-between pt-6 pb-4">
				<LogoLink/>
				{hasSearch && <SearchInput className="mx-12"/>}
				<div className="flex items-center gap-2.5">
					<ProfileButton onClickSignIn={() => console.log('Типа открытие модального окна')} />
				</div>
			</Container>
		</header>
	);
}