import React, { Component } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import { Container } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div>
                <div className="appHeader">
                    <h1>Stock Portfolio Management System(SPMS)</h1>
                </div>
                <Container fluid>
                <Portfolio />
                </Container>
            </div>
        );
    }
}

export default App;
