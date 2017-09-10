import React from 'react';


const InnerLines = ({ triangle }) => {
  const { A, B, C } = triangle;
  const side = B.x - A.x;
  const L = { x: (B.x - A.x) / 2, y: A.y };
  const M = { x: ((B.x - C.x) / 2) + (side / 2), y: (B.y - C.y) / 2 };
  const N = { x: (C.x - A.x) / 2, y: (A.y - C.y) / 2 };

  const pathData = `M${L.x} ${L.y} L${M.x} ${M.y} L${N.x} ${N.y} Z`;
  return (
    <path d={pathData} fill="none" stroke="blue" />
  );
};

const InitialTriangle = () => {
  const side = 400;
  const height = (Math.cos(Math.PI / 6) * side);
  const initialTriangle = {
    A: { x: 0, y: height },
    B: { x: side, y: height },
    C: { x: side / 2, y: 0 },
  };
  const { A, B, C } = initialTriangle;
  const pathData = `M${A.x} ${A.y} L${B.x} ${B.y} L${C.x} ${C.y} Z`;
  return (
    <svg width={side} height={height} viewBox={`0 0 ${side + 10} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <path d={pathData} fill="none" stroke="red" />
      <InnerLines triangle={initialTriangle} />
    </svg>
  );
};

const App = () => <InitialTriangle />;


export default App;
