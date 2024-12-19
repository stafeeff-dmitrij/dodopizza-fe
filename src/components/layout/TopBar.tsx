import React from 'react';

import { Container } from './Container.tsx';
import { cn } from '../../lib';
import { LinkMenu } from '../ui';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Топбар с ссылками
 */
export const TopBar: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('border-b border-slate-100 py-3', className)}>
			<Container className="flex items-center gap-5">
				<LinkMenu link="/" name="Прямой эфир">
					<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
				</LinkMenu>
				<LinkMenu link="/" name="Работа в ДоДо"/>
				<LinkMenu link='/' name='О нас'/>
				<LinkMenu link='/' name='Контакты'/>
			</Container>
		</div>
	);
}