import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

//below the test method is is used to test the 
//App component, it takes two values, the first 
//value is the description(string), the second 
//value is the actually logic for the test
test('Snapshot test for the component', () => {
    const tree = renderer
    .create(<App/>)
    .toJSON();
    expect(tree).toMatchSnapshot()
})