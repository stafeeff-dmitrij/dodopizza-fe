import React from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink, PaginationNext,
	PaginationPrevious
} from '../../../components/ui';


interface Props {
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	className?: string;
}

/**
 * @component
 * @description Пагинация для товаров

 * @prop totalPages - общее кол-во страниц
 * @prop currentPage - текущая страница
 * @prop setCurrentPage - смена текущей страницы
 */
export const PaginationProduct: React.FC<Props> = ({ totalPages, currentPage, setCurrentPage, className }) => {

	const handlePageChange = (page: number) => {
		if (1 <= page && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<Pagination className={className} >
			<PaginationContent>

				{/* назад */}
				<PaginationItem>
					<PaginationPrevious
						isBlock={currentPage === 1}
						onClick={() => handlePageChange(--currentPage)}
					/>
				</PaginationItem>

				{/* TODO подумать над алгоритмом вывода нумераций страниц с использованием черточек - PaginationEllipsis */}
				{/*{[...Array(totalPages)].map((_, i) => {*/}
				{/*	if (i + 1 === 1 || i + 1 === totalPages) {*/}
				{/*		return <PaginationItem key={i}>*/}
				{/*			<PaginationLink*/}
				{/*				isActive={i + 1 === currentPage}*/}
				{/*				onClick={() => handlePageChange(i + 1)}*/}
				{/*			>{i + 1}</PaginationLink>*/}
				{/*		</PaginationItem>*/}
				{/*	} else {*/}
				{/*		return <PaginationItem>*/}
				{/*			<PaginationEllipsis />*/}
				{/*		</PaginationItem>*/}
				{/*	}})*/}
				{/*}*/}

				{/* все страницы */}
				{[...Array(totalPages)].map((_, i) =>
					<PaginationItem key={i}>
						<PaginationLink
							isActive={i + 1 === currentPage}
							onClick={() => handlePageChange(i + 1)}
						>{i + 1}</PaginationLink>
					</PaginationItem>
				)}

				{/* вперед */}
				<PaginationItem>
					<PaginationNext
						isBlock={currentPage === totalPages}
						onClick={() => handlePageChange(++currentPage)}
					/>
				</PaginationItem>

			</PaginationContent>
		</Pagination>
	);
};
