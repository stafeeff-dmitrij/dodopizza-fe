import { useParams } from 'react-router-dom';

import { Container } from '../../components/layout';
import { useGetDetailProductQuery, Variation } from '../../redux/api/productApi.ts';
import { getErrorToast } from '../../lib';
import { CategoriesId } from '../../features/product/constants.ts';
import { PizzaVariation } from '../../features/product/components/form/ChoicePizzaForm.tsx';
import { addProductToCart } from '../../features/product/utils';
import { ChoicePizzaPage, ChoiceProductPage } from '../../features/product/components/page';
import { RecommendationProducts } from '../../features/product/components';


/**
 * @component
 * @description Страница товара
 */
export function Product() {

	const { id } = useParams();
	const { data, isLoading, isSuccess, isError, error } = useGetDetailProductQuery({ product_id: Number(id) });

	// добавление товара в корзину
	const onSubmit = async (variationId: number, ingredientsId?: number[]) => {
		await addProductToCart(data!, variationId, ingredientsId);
	};

	if (isError) {
		getErrorToast('Произошла ошибка!');
		console.error(error);
	}

	// TODO перенести лоадер в формы страниц
	if (isLoading) {
		return <p>Идет загрузка...</p>
	}

	if (isSuccess) {
		return (
			<Container className='mb-14 pt-5'>
				<div className='mb-10'>
					{data.category_id === CategoriesId.pizzas &&
						<ChoicePizzaPage
							categoryId={data.category_id}
							name={data.name}
							description={data.description}
							count={data.count}
							variations={data.variations as PizzaVariation[]}
							default_ingredients={data.default_ingredients}
							onSubmit={onSubmit}
							loading={isLoading}
							className='mb-10'
						/>
					}
					{data.category_id === CategoriesId.combo &&
						<p>Страница для комбо товаров еще не готова</p>
					}
					{data.category_id != CategoriesId.pizzas && data.category_id != CategoriesId.combo &&
						<ChoiceProductPage
							categoryId={data.category_id}
							name={data.name}
							description={data.description}
							count={data.count}
							variations={data.variations as Variation[]}
							onSubmit={onSubmit}
							loading={isLoading}
						/>
					}
				</div>
				<RecommendationProducts
					categoryId={data.category_id}
					ignoreProductId={Number(id)}
					count={8}
				/>
			</Container>
		);
	}
}
