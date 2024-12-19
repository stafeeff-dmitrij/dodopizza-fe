import { Title } from '../components/typography/Title.tsx';

/**
 * @component
 * @description Страница 404
 */
export function NotFound() {
	return (
		<div>
			<Title text="Ничего не найдено :(" size="xl" />
		</div>
	);
}