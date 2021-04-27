import React, { Component } from 'react';
import axios from 'axios';
import Home from './pages/home/index';
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';

class App extends Component {
	render() {
		return <Home />;
	}
}

export default App;
