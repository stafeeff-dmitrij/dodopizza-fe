import { Outlet } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

import './styles/styles.scss';


function App() {
	return (
		<>
			<ScrollToTop/>
			<ErrorBoundary>
				<Outlet/>
			</ErrorBoundary>
		</>
	);
}

export default App;
