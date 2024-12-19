import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../../lib';

interface Props {
	className?: string;
}

/**
 * @component
 * @description Ссылка-логотип
 */
export const LogoLink: React.FC<Props> = ({ className }) => {
	return (
		<Link to="/">
			<div className={cn('flex items-start gap-4', className)}>
				<img
					src="/images/icons/logo.svg"
					alt="Логотип ДОДО ПИЦЦА"
					width="44px"
					height="44px"
				/>
				<div className='flex flex-col gap-2'>
					<img
						src="/images/icons/logo-title.svg"
						alt="Логотип ДОДО ПИЦЦА"
					/>
					<div className='flex flex-col'>
						<p className='text-xs'>Сеть №1 в России</p>
						<p className='text-xs text-orange-600'>по количеству пиццерий</p>
					</div>
				</div>
			</div>
		</Link>
	);
}