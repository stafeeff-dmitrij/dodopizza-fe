import React from 'react';

import { Container } from '../layout';
import { SearchInput } from './SearchInput.tsx';
import { ProfileButton } from './ProfileButton.tsx';
import { LinkLogo } from './LinkLogo.tsx';


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
				<LinkLogo/>
				{hasSearch && <SearchInput className="mx-12"/>}
				<div className="flex items-center gap-2.5">
					<ProfileButton onClickSignIn={() => console.log('Типа открытие модального окна')} />
				</div>
			</Container>
		</header>
	);
}