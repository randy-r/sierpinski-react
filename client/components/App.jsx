import React from 'react';


const InitialTriangle = () => {
  const side = 400;
  const pickY = side - (Math.cos(Math.PI / 6) * side);
  return (
    <svg width={side} height={side} viewBox={`0 0 ${side} ${side}`} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M0 ${side} L${side} ${side} L${side / 2} ${pickY} Z`}
        fill="none"
        stroke="red"
      />

    </svg>
  );
};

const App = () => <InitialTriangle />;


export default App;
