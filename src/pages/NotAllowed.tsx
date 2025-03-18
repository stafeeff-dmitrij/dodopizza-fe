import { LockBlock } from '../components/layout';

/**
 * @component
 * @description Страница заглушка, когда нет доступа
 */
export function NotAllowed() {
	return (
		<div className='flex flex-col items-center justify-center h-[80vh]'>
			<LockBlock
				title='Доступ запрещен'
				description='Данную страницу могут просматривать только авторизованные пользователи'
				imageUrl='/images/locked.svg'
			/>
		</div>
	);
}