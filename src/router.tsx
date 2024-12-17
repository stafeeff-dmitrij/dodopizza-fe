import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Main from './pages/Main/Main.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '*',
				element: <NotFound />
			}
		],
	},
]);

export default router;