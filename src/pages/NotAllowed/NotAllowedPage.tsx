import { Title } from '../../components/ui/Title/Title.tsx';

/**
 * @component
 * @description Страница заглушка, когда нет доступа
 */
export function NotAllowedPage() {
	return (
		<div>
			<Title text="Доступ запрещен!" size="xl" />
		</div>
	);
}