import React from 'react';
import ReactDOM from 'react-dom';
import PeakPlatePredictor from './index';

test('PeakPlatePredictor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PeakPlatePredictor />, div);
    ReactDOM.unmountComponentAtNode(div);
});
