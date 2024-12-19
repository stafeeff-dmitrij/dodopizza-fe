import { Title } from '../components/typography/Title.tsx';

/**
 * @component
 * @description Страница заглушка, когда нет доступа
 */
export function NotAllowed() {
	return (
		<div>
			<Title text="Доступ запрещен!" size="xl" />
		</div>
	);
}