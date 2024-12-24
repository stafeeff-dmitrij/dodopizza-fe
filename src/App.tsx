import { Outlet } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop.ts';

import './styles/styles.scss';


function App() {
	return (
		<>
			<ScrollToTop/>
			<Outlet/>
		</>
	);
}

export default App;
