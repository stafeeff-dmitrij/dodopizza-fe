import { createBrowserRouter } from 'react-router-dom';

import { Main, Order } from './layout';
import { Catalog, Checkout, NotAllowed, NotFound, Orders, Product, Profile } from './pages';


const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Catalog />,
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