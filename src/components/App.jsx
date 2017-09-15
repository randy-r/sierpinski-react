import React from 'react';
import SierpinskiTriangle from './SierpinskiTriangle';

const style = {
  margin: '0 auto',
  width: '600px',
};

// size of the element that will display the triangle
const width = 600;
const height = (Math.cos(Math.PI / 6) * width);

// triangle to display, the points can have any coordinates
// between (0,0) and (width, height) in order for the triangle to be fully visible
const initialTriangle = {
  A: { x: 0, y: 10 + height },
  B: { x: width, y: 10 + height },
  C: { x: width / 2, y: 10 },
};

const App = () =>
  <div style={style}> <SierpinskiTriangle {...{ width, height, initialTriangle }} /></div>;


export default App;
