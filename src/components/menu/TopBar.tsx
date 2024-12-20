import React from 'react';

import { Container } from '../layout';
import { LinkMenu } from '../shared';
import { cn } from '../../lib';


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
					<div className="w-2 h-2 bg-red-500 rounded-3xl animate-pulse"/>
				</LinkMenu>
				<LinkMenu link="/" name="Работа в ДоДо"/>
				<LinkMenu link='/' name='О нас'/>
				<LinkMenu link='/' name='Контакты'/>
			</Container>
		</div>
	);
}