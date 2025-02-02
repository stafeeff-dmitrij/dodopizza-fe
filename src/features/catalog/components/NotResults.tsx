import React from 'react';

import { cn } from '../../../lib';

interface Props {
	className?: string;
}

export const NotResults: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex justify-center items-center h-full', className)}>
			<p className='text-xl text-muted-foreground opacity-50'>Результатов нет...</p>
		</div>
	);
};