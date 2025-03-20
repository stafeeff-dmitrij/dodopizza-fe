import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '../../lib';
import { Title } from '../typography';
import { Button } from '../ui';


interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  visibleButtons?: boolean;
  className?: string;
}

/**
 * @component
 * @description Блок с уведомлением ограничения доступа
 *
 * @prop title - название страницы
 * @prop description - описание
 * @prop imageUrl - URL изображения
 * @prop visibleButtons - отображение блока с кнопками
 */
export const LockBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  description,
  imageUrl,
  visibleButtons = true,
  children,
  className,
}) => {

  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return <div className={cn('flex items-center gap-20', className)}>
    <div className="flex flex-col items-start max-w-[480px]">
      <Title text={title} size="xl" />
      <p className="mb-5 text-[14px] leading-[18px] text-muted-foreground text-justify">
        {description}
      </p>
      {visibleButtons &&
        <div className="flex gap-4">
          <Button variant="light" className="rounded-2xl gap-2" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
            <p>На главную</p>
          </Button>
          <Button variant="light" className="rounded-2xl" onClick={handleReload}>
            <p>Обновить</p>
          </Button>
        </div>
      }
      {children}
    </div>
    {imageUrl && <img src={imageUrl} alt={title} />}
  </div>;
};