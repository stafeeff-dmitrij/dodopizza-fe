import { useState, useEffect } from 'react';


/**
 * Обновление и возврат переданного значения через указанный промежуток времени.
 * Используется для задержки обновления быстроменяющихся значений в формах и инпутах, при изменении которых выполняется запрос на бэк.
 *
 * @param value значение инпута / состояния
 * @param delay время задержки обновления
 */
export function useDebounce<T>(value: T, delay: number): T {

	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
