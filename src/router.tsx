import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { Layout as CatalogLayout } from './pages/Catalog/Layout.tsx';
import { Layout as OrderLayout } from './pages/Order/Layout.tsx';
import { Main, Checkout, NotAllowed, NotFound, Orders, Product, Profile, Category } from './pages';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <CatalogLayout />,
				children: [
					{
						path: '/',
						element: <Main />,
					},
					{
						path: 'category/:id',
						element: <Category />,
					},
					{
						path: 'product/:id',
						element: <Product />,
					},
					{
						path: 'profile',
						element: <Profile />,
					},
					{
						path: 'not-allowed',
						element: <NotAllowed />
					},
					{
						path: '*',
						element: <NotFound />
					}
				],
			},
			{
				path: '/order',
				element: <OrderLayout />,
				children: [
					{
						path: 'checkout',
						element: <Checkout />,
					},
					{
						path: 'history',
						element: <Orders />,
					},
				],
			},
		]
	},
]);

export default router;