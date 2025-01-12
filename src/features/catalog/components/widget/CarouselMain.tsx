import React from 'react';
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../../../components/ui';

import { cn } from '../../../../lib';
import { Container } from '../../../../components/layout';


interface Props {
	className?: string;
}

// TODO Получать слайды с бэка вместе с настройкой отображать или нет слайдер
const sliders = [
	"/images/sliders/slide-1.jpeg",
	"/images/sliders/slide-2.jpeg",
	"/images/sliders/slide-3.jpeg",
	"/images/sliders/slide-4.jpeg",
	"/images/sliders/slide-5.jpeg",
	"/images/sliders/slide-6.jpeg",
	"/images/sliders/slide-7.jpeg",
]

/**
 * @component
 * @description Слайдер с изображениями
 */
export const CarouselMain: React.FC<Props> = ({ className }) => {

	return (
		// <Container className={cn('w-[1060px] pt-3', className)}>
		<Container className={cn('w-[1092px] pt-3', className)}>
			<Carousel
				plugins={[
					Autoplay({
						delay: 10000,
					}),
				]}
			>
				<CarouselContent className='w-full -ml-0'>
					{sliders.map((image, index) =>
						<CarouselItem key={index} className='basis-[1060px] pl-2 pr-2'>
							<img
								className='rounded-[20px]'
								src={image}
								alt={image}
							/>
						</CarouselItem>
					)}
				</CarouselContent>
				<CarouselPrevious/>
				<CarouselNext/>
			</Carousel>
		</Container>
	);
};