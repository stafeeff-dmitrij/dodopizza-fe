import { createBrowserRouter } from 'react-router-dom';

import { MainLayout, OrderLayout } from './layout';
import { CatalogPage, CheckoutPage, NotAllowedPage, NotFoundPage, OrdersPage, ProductPage, ProfilePage } from './pages';


const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <CatalogPage />,
			},
			{
				path: 'product/:id',
				element: <ProductPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'not-allowed',
				element: <NotAllowedPage />
			},
			{
				path: '*',
				element: <NotFoundPage />
			}
		],
	},
	{
		path: '/order',
		element: <OrderLayout />,
		children: [
			{
				path: 'checkout',
				element: <CheckoutPage />,
			},
			{
				path: 'history',
				element: <OrdersPage />,
			},
		],
	},
]);

export default router;