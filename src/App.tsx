import { Outlet } from 'react-router-dom';

import Container from './components/Container/Container.tsx';
import Header from './layout/Header/Header.tsx';

import './styles/styles.scss';


function App() {
	return (
		<div className="wrapper">
			<Container>
				<Header/>
				<Outlet/>
			</Container>
		</div>
	);
}

export default App;
