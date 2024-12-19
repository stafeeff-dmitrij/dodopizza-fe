import { Title } from '../components/typography/Title.tsx';


/**
 * @component
 * @description Страница профиля
 */
export function Profile() {

	return (
		<div>
			<Title text="Профиль пользователя" size="xl"/>
			<p>Здесь будет описание профиля...</p>
		</div>
	);
}
