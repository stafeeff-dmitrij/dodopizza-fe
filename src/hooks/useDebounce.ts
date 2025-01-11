import { useState, useEffect } from 'react';


/**
 * Обновление и возврат переданного значения через указанный промежуток времени.
 * Используется для задержки обновления значений инпутов в формах, перед выполнением запроса на бэк.
 *
 * @param value значение инпута
 * @param delay время задержки обновления
 */
export function useDebounce(value: string, delay: number): string {

	const [debouncedValue, setDebouncedValue] = useState<string>(value);

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
