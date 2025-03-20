import React from 'react';

import { cn } from '../../lib';
import { LockBlock } from '../../components/layout';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Страница 404
 */
export const NotFound: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col items-center justify-center h-[70vh]', className)}>
			<LockBlock
				title='Страница не найдена'
				description='Проверьте корректность введённого адреса или повторите попытку позже.'
				imageUrl='/images/404.svg'
			/>
		</div>
	);
}