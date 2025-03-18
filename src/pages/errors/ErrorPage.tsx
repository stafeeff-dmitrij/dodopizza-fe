import { LockBlock } from '../../components/layout';
import { JSX } from 'react';

/**
 * @component
 * @description Страница вывода в случае ошибки рендера
 */
export function ErrorPage(): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <LockBlock
        className='gap-1'
        title='Упс, что-то сломалось...'
        description='Попробуйте зайти позже или обновить страницу'
        imageUrl='/images/error-trash.svg'
      />
    </div>
  );
}