import { useParams } from 'react-router-dom';

import { Container } from '../../components/layout';
import { useGetDetailProductQuery, Variation } from '../../redux/api/productApi.ts';
import { CategoriesId } from '../../features/product/constants.ts';
import { PizzaVariation } from '../../features/product/components/form/ChoicePizzaForm.tsx';
import { addProductToCart } from '../../features/product/utils';
import { ChoicePizzaPage, ChoiceProductPage, ProductPageSkeleton } from '../../features/product/components/page';
import { RecommendationProducts } from '../../features/product/components';
import { ErrorPage } from '../errors';


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
		return <ErrorPage error={error}/>
	}

	return (
		<Container className='mb-14 pt-5'>
			<div className='mb-10'>
				{isLoading && <ProductPageSkeleton/>}
				{isSuccess && data.category_id === CategoriesId.pizzas &&
					<ChoicePizzaPage
						categoryId={data.category_id}
						name={data.name}
						description={data.description}
						count={data.count}
						variations={data.variations as PizzaVariation[]}
						default_ingredients={data.default_ingredients}
						onSubmit={onSubmit}
						className='mb-10'
					/>
				}
				{isSuccess && data.category_id === CategoriesId.combo &&
					<p>Страница для комбо товаров еще не готова</p>
				}
				{isSuccess && data.category_id != CategoriesId.pizzas && data.category_id != CategoriesId.combo &&
					<ChoiceProductPage
						categoryId={data.category_id}
						name={data.name}
						description={data.description}
						count={data.count}
						variations={data.variations as Variation[]}
						onSubmit={onSubmit}
					/>
				}
			</div>
			{isSuccess && <RecommendationProducts
				categoryId={data.category_id}
				ignoreProductId={Number(id)}
				count={8}
			/>}
		</Container>
	);
}
