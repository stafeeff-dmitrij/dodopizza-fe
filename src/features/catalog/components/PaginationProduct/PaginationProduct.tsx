import React from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink, PaginationNext,
	PaginationPrevious
} from '../../../../components/ui';


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

	const visiblePage = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
	let visiblePaginationEllipsis = false;

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

				{/* страницы */}
				{[...Array(totalPages)].map((_, i) => {
					if (visiblePage.includes(i + 1)) {
						visiblePaginationEllipsis = false;
						return <PaginationItem key={i}>
							<PaginationLink
								isActive={i + 1 === currentPage}
								onClick={() => handlePageChange(i + 1)}
							>{i + 1}</PaginationLink>
						</PaginationItem>;
					} else if (!visiblePage.includes(i + 1) && !visiblePaginationEllipsis) {
						visiblePaginationEllipsis = true;
						return <PaginationItem key={i}>
							<PaginationEllipsis/>
						</PaginationItem>;
					} else {
						return null;
					}
				})}

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
