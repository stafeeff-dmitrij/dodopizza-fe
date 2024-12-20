import React from 'react';
import { CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '../ui';


interface Props {
	onClickSignIn?: () => void;
	className?: string;
}

/**
 * @component
 * @description Кнопка авторизации / профиля пользователя

 * @prop {function} onClickSignIn - функция для отображения модального окна выбора способа авторизации
 */
export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {

	const session = true;  // статус авторизации

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSignIn} variant="light" size='sm' className="flex items-center gap-1">
					Войти
				</Button>
			) : (
				<Link to="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			)}
		</div>
	);
};