import React, { Component } from 'react';
import './App.css';
import Portfolio from './Portfolio';

class App extends Component {
    render() {
        return (
            <div>
                <div className="appHeader">
                    <h1>Stock Portfolio Management System(SPMS)</h1>
                </div>
                <Portfolio />

            </div>
        );
    }
}

export default App;
