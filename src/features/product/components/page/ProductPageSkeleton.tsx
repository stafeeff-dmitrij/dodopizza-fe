import React from 'react';

import { cn } from '../../../../lib';
import { Button, Skeleton } from '../../../../components/ui';

export interface Props {
  className?: string;
}

/**
 * @component
 * @description Лоадер для страницы товара
 */
export const ProductPageSkeleton: React.FC<Props>  = ({ className }) => {
  return (
    <div className={cn('flex flex-1 w-full h-[420px] gap-x-6', className)}>
      <img
        className="w-[626px] bg-[#fffcf8] rounded-3xl"
        src='/images/icons/not-product.svg'
        alt='Изображение товара'
      />

      <div className='flex flex-col justify-between pt-[30px]'>
        <div className="w-[410px] px-[30px]">
          <Skeleton className={'h-10 w-48 mb-2'}/>
          <Skeleton className={'h-6 w-56 mb-3'}/>
          <Skeleton className={'h-4 w-full mb-1.5'}/>
          <Skeleton className={'h-4 w-full mb-1.5'}/>
          <Skeleton className={'h-4 w-full mb-5'}/>
          <Skeleton className={'h-9 w-full rounded-3xl'}/>
        </div>
        <div className="px-[30px] pt-[24px] pb-[30px]">
          <Button
            disabled={true}
            className="px-9 py-6 text-base font-light w-full"
          >
            В корзину
          </Button>
        </div>
      </div>

    </div>
  );
};