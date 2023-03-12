import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configuration';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';

const store = ConfigureStore();

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Main/>
				</div>
			</BrowserRouter>	
		</Provider>
	);
}

export default App;
