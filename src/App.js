import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PeakPlatePredictor from './components/peak-plate-predictor/index';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        React Js Component &quot;pico y placa&quot; predictor.
                    </p>
                </header>
                <p>
                    Component instance #1.
                </p>
                <PeakPlatePredictor/>
                <p>
                    Component instance #2.
                </p>
                <PeakPlatePredictor/>
            </div>
        );
    }
}

export default App;

