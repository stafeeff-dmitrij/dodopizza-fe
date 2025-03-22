import React, { useRef, useState } from 'react';

import { Categories } from './Categories.tsx';
import { LogoImg } from '../../shared';
import { MainMenuSkeleton } from './MainMenuSkeleton.tsx';
import { cn } from '../../../lib';
import { useGetCategoriesQuery } from '../../../redux/api';
import { CartButton } from './CartButton.tsx';
import { Container } from '../../layout';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Главное меню с категориями товаров
 */
export const MainMenu: React.FC<Props> = ({ className }) => {

	const authorized = true;  // статус авторизации

	const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();

	const [isSticky, setIsSticky] = useState(false);
	const menuRef = useRef<HTMLElement>(null);

	// отслеживаем свойство sticky
	const handleScroll = () => {
		if (menuRef.current) {
			const rect = menuRef.current.getBoundingClientRect();
			setIsSticky(rect.top <= 0);  // если расстояние до края экрана 0 - значит блок прикреплен кверху (sticky активен)
		}
	};

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	if (isError) {
		return null;
	}

	return (
		<nav
			className={cn(
				'flex items-center h-14 sticky top-[-1px] bg-white py-2',
				{
					'shadow-[0px_4px_30px_rgba(6,5,50,0.1)] z-20 backdrop-blur-[20px] bg-white/75': isSticky,
				}
				, className
			)}
			ref={menuRef}
		>
			<Container className="flex items-center justify-between gap-14">
				{isLoading && <MainMenuSkeleton/>}
				{isSuccess && data.length > 0 &&
					<div className="flex items-center gap-4">
						<LogoImg className={cn({ 'hidden': !isSticky })} size="36px"/>
						<Categories categories={data}/>
					</div>
				}
				{authorized && <CartButton/>}
			</Container>
		</nav>
	);
};