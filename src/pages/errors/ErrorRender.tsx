import React from 'react';

import { LockBlock } from '../../components/layout';
import { cn } from '../../lib';


interface Props {
  className?: string;
}

/**
 * @component
 * @description Страница вывода в случае ошибки рендера
 */
export const ErrorRender: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center h-screen', className)}>
      <LockBlock
        className='gap-1'
        title='Упс, что-то сломалось...'
        description='Попробуйте обновить страницу или зайти позже.'
        imageUrl='/images/error-trash.svg'
      />
    </div>
  );
}