import React from 'react';
import { useClickAway } from 'react-use';
import { Search, X } from 'lucide-react';

import { cn } from '../../lib';
import { Input } from '../ui';
import { Product, useGetFilterProductsQuery } from '../../redux/api/productApi.ts';
import { useDebounce } from '../../hooks';
import { FoundProducts } from './foundProducts.tsx';


interface Props {
	className?: string;
}

/**
 * @component
 * @description Инпут для поиска товаров
 */
export const SearchInput: React.FC<Props> = ({ className }) => {

	const ref = React.useRef(null);

	const [focused, setFocused] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState('')
	const [products, setProducts] = React.useState<Product[]>([]);

	// ограничиваем частоту запросов на бэк при изменении инпута в 500 мс
	const debouncedSearchQuery = useDebounce<string>(searchInput, 500);

	const { data, isLoading, isSuccess } = useGetFilterProductsQuery({ search: debouncedSearchQuery }, {
		skip: debouncedSearchQuery === '',
	});

	// сохраняем первые 5 найденных товаров
	React.useEffect(() => {
		if (isSuccess) {
			setProducts(data.results.slice(0,5));
		}
	}, [data?.results, debouncedSearchQuery]);

	// сброс инпута, если есть значени
	// сброс фокуса при пустом инпуте
	const clearInput = () => {
		if (!searchInput) {
			setFocused(false);
		} else {
			setSearchInput('');
			setProducts([]);
		}
	};

	// сброс фокуса и инпута
	const clearStates = () => {
		setFocused(false);
		clearInput();
	};

	// автоматический вызов при клике вне HTML-элемента с ref
	useClickAway(ref, () => {
		clearStates();
	});

	// отключаем скролл при фокусе
	React.useEffect(() => {
		document.body.style.overflow = focused ? 'hidden' : '';
	}, [focused]);

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-30"/>}
			<div className={cn('relative flex flex-1 justify-between h-11 rounded-full z-30', className)} ref={ref}>
				<Search size={25} className='absolute top-[47%] translate-y-[-50%] left-4 h-5 text-gray-400'/>
				<Input
					className='outline-none w-full bg-[#F3F3F7] pl-14 text-gray-500 placeholder-gray-400 text-sm'
					type="text"
					placeholder="Найти товар..."
					onFocus={() => setFocused(true)}
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<X
					className='absolute top-[47%] translate-y-[-50%] right-4 h-5 text-gray-400 cursor-pointer transition duration-300 hover:text-gray-500'
					onClick={() => clearInput()}
				/>
				{searchInput && debouncedSearchQuery && <FoundProducts
					loading={isLoading}
					focused={focused}
					products={products}
					clearResult={clearStates}
				/>}

			</div>
		</>
	);
};
