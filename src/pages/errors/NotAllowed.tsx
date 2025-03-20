import React from 'react';

import { LockBlock } from '../../components/layout';
import { AccessForm } from '../../features/access/components';
import { cn } from '../../lib';


interface Props {
  className?: string;
}

/**
 * @component
 * @description Страница заглушка, когда нет доступа к сайту
 */
export const NotAllowed: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center h-screen', className)}>
      <LockBlock
        title="Доступ запрещен"
        description="Доступ к ресурсу ограничен, запросите доступ для просмотра сайта."
        imageUrl="/images/locked.svg"
        visibleButtons={false}
      >
        <AccessForm/>
      </LockBlock>
    </div>
  );
};