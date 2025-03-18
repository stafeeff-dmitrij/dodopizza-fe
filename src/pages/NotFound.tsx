import { LockBlock } from '../components/layout';

/**
 * @component
 * @description Страница 404
 */
export function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-[80vh]'>
			<LockBlock
				title='Страница не найдена'
				description='Проверьте корректность введённого адреса или повторите попытку позже'
				imageUrl='/images/404.svg'
			/>
		</div>
	);
}