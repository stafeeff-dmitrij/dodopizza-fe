import React from 'react';
import { useClickAway } from 'react-use';
import { Search, X } from 'lucide-react';

import { cn } from '../../lib';
import { Input } from '../ui';


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

	// отключаем скролл при фокусе
	React.useEffect(() => {
		document.body.style.overflow = focused ? 'hidden' : '';
	}, [focused]);

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-30"/>}
			<div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)} ref={ref}>
				<Search size={25} className='absolute top-[47%] translate-y-[-50%] left-4 h-5 text-gray-400'/>
				<Input
					className='outline-none w-full bg-[#F3F3F7] pl-14 text-gray-500 placeholder-gray-400 text-sm'
					type="text"
					placeholder="Найти товар..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<X
					className='absolute top-[47%] translate-y-[-50%] right-4 h-5 text-gray-400 cursor-pointer transition duration-300 hover:text-gray-500'
					onClick={() => setSearchQuery('')}
				/>
			</div>
		</>
	);
};
