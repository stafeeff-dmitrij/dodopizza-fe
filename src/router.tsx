import { createBrowserRouter } from 'react-router-dom';

import { Catalog, Order } from './layout';
import { Main, Checkout, NotAllowed, NotFound, Orders, Product, Profile, Category } from './pages';


const router = createBrowserRouter([
	{
		path: '/',
		element: <Catalog />,
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
		element: <Order />,
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
]);

export default router;