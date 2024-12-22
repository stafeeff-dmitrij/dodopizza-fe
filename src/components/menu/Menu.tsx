import React, { useRef, useState } from 'react';

import { Container } from '../layout';
import { cn } from '../../lib';
import { Category } from '../../redux/api/categoryApi.ts';
import { Categories } from './Categories.tsx';
import { MenuSkeleton } from '../skeleton';
import { CartButton } from '../button';
import { LogoImg } from '../shared';


interface Props {
	isLoading: boolean;
	categories: Category[];
	className?: string;
}

/**
 * @component
 * @description Меню для вывода категорий товаров
 *
 * @prop {boolean} isLoading - статус загрузки
 * @prop {Category[]} categories - категории товаров
 */
export const Menu: React.FC<Props> = ({ categories, isLoading, className }) => {

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

	return (
		<nav
			className={cn(
				'flex items-center h-14 sticky top-[-1px] bg-white py-2',
				{
					'shadow-[0px_4px_30px_rgba(6,5,50,0.1)] z-10 backdrop-blur-[20px] bg-white/75': isSticky
				}
				, className
			)}
			ref={menuRef}
		>
			<Container className="flex items-center justify-between gap-5">
				{isLoading
					? <MenuSkeleton/>
					: <div className="flex items-center gap-4">
						<LogoImg className={cn({'hidden': !isSticky})} size="36px"/>
						<Categories categories={categories}/>
					</div>
				}
				<CartButton/>
			</Container>
		</nav>
	);
};