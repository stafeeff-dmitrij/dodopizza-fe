import React from 'react';
import { useClickAway } from 'react-use';
import { Search, X } from 'lucide-react';

import { cn } from '../../lib';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Инпут для поиска товаров
 */
export const SearchInput: React.FC<Props> = ({ className }) => {

	const [searchQuery, setSearchQuery] = React.useState('');
	const [focused, setFocused] = React.useState(false);

	const ref = React.useRef(null);

	// автоматический вызов при клике вне HTML-элемента с ref
	useClickAway(ref, () => {
		clearStates();  // сброс фокуса и инпута
	});

	const clearStates = () => {
		setFocused(false);
		setSearchQuery('');
	};

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-30"/>}
			<div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)} ref={ref}>
				<Search size={25} className='absolute top-1/2 translate-y-[-50%] left-4 h-5 text-gray-400'/>
				<input
					className='rounded-full outline-none w-full bg-gray-50 pl-14 text-gray-500 placeholder-gray-400 text-sm'
					type="text"
					placeholder="Найти товар..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<X
					className='absolute top-1/2 translate-y-[-50%] right-4 h-5 text-gray-400 cursor-pointer'
					onClick={() => setSearchQuery('')}
				/>
			</div>
		</>
	);
};
