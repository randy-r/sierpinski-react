import React from 'react';
import { interpolateInferno } from 'd3-scale';

const RECCURSION_LIMIT = 6;
const totalTriangles =
  [...Array(RECCURSION_LIMIT).keys()]
    .map(i => 3 ** i)
    .reduce((a, b) => a + b); // (3 ** (RECCURSION_LIMIT));
const colorDenominator = totalTriangles;
let crtTotalTriangles = 0;

const InnerLines = ({ triangle, crtReccDepth }) => {
  if (crtReccDepth >= RECCURSION_LIMIT) {
    return null;
  }

  crtTotalTriangles += 1;

  const { A, B, C } = triangle;
  // compute midpoints of triangle's sides
  const L = { x: ((B.x - A.x) / 2) + A.x, y: ((B.y - A.y) / 2) + A.y };
  const M = { x: ((B.x - C.x) / 2) + C.x, y: ((B.y - C.y) / 2) + C.y };
  const N = { x: ((C.x - A.x) / 2) + A.x, y: ((A.y - C.y) / 2) + C.y };

  const pathData = `M${L.x} ${L.y} L${M.x} ${M.y} L${N.x} ${N.y} Z`;
  const triangleA = { A, B: L, C: N };
  const triangleB = { A: L, B, C: M };
  const triangleC = { A: N, B: M, C };

  const newReccDepth = crtReccDepth + 1;
  const color = interpolateInferno(crtTotalTriangles / colorDenominator);
  return (
    <g >
      <path d={pathData} fill={color} stroke="none" />
      <InnerLines triangle={triangleA} crtReccDepth={newReccDepth} />
      <InnerLines triangle={triangleB} crtReccDepth={newReccDepth} />
      <InnerLines triangle={triangleC} crtReccDepth={newReccDepth} />
    </g>
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
      <path d={pathData} fill="none" stroke="none" />
      <InnerLines triangle={initialTriangle} crtReccDepth={0} />
    </svg>
  );
};

const App = () => <InitialTriangle />;


export default App;
