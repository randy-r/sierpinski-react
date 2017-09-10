import React from 'react';
import { interpolateInferno } from 'd3-scale';
import { scaleQuantize } from 'd3';

const MAX_RECURSION_LIMIT = 6;
const totalTriangles =
  [...Array(MAX_RECURSION_LIMIT).keys()]
    .map(i => 3 ** i)
    .reduce((a, b) => a + b); // (3 ** (MAX_RECURSION_LIMIT));
const colorDenominator = totalTriangles;
let crtTotalTriangles = 0;

const InnerLines = ({ triangle, crtRecDepth, recursionLimit, trianglesLimit }) => {
  if (crtRecDepth >= MAX_RECURSION_LIMIT
    || crtRecDepth >= recursionLimit
    || crtTotalTriangles >= trianglesLimit) {
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

  const newRecDepth = crtRecDepth + 1;
  const color = interpolateInferno(crtTotalTriangles / colorDenominator);
  return (
    <g >
      <path d={pathData} fill={color} stroke="none" />
      <InnerLines triangle={triangleA} crtRecDepth={newRecDepth} recursionLimit={recursionLimit} trianglesLimit={trianglesLimit} />
      <InnerLines triangle={triangleB} crtRecDepth={newRecDepth} recursionLimit={recursionLimit} trianglesLimit={trianglesLimit} />
      <InnerLines triangle={triangleC} crtRecDepth={newRecDepth} recursionLimit={recursionLimit} trianglesLimit={trianglesLimit} />
    </g>
  );
};

class InitialTriangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recursionLimit: 1, trianglesLimit: 1 };
    this.side = 400;
    this.height = (Math.cos(Math.PI / 6) * this.side);
  }

  handleMouseMove = (event) => {
    if (this.inProgress) return;
    this.inProgress = true;
    const bcr = this.svg.getBoundingClientRect();
    const x = event.pageX - bcr.left;
    const y = event.pageY - bcr.top;

    const mapXFunc = scaleQuantize()
      .domain([0, this.side])
      .range([...Array(MAX_RECURSION_LIMIT + 1).keys()]);

    const mapYFunc = scaleQuantize()
      .domain([0, this.height])
      .range([...Array(totalTriangles + 1).keys()]);

    const newRecursionLimit = mapXFunc(x);
    const newTrianglesLimit = mapYFunc(y);

    crtTotalTriangles = 0;
    this.setState({ recursionLimit: newRecursionLimit, trianglesLimit: newTrianglesLimit });
    this.inProgress = false;
  }

  render() {
    const side = this.side;
    const height = this.height;
    const initialTriangle = {
      A: { x: 0, y: height },
      B: { x: side, y: height },
      C: { x: side / 2, y: 0 },
    };
    const { A, B, C } = initialTriangle;
    const pathData = `M${A.x} ${A.y} L${B.x} ${B.y} L${C.x} ${C.y} Z`;
    return (
      <svg
        ref={(el) => { this.svg = el; }}
        onMouseMove={this.handleMouseMove}
        width={side}
        height={height}
        viewBox={`0 0 ${side + 10} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathData} fill="none" stroke="none" />
        <InnerLines
          triangle={initialTriangle}
          crtRecDepth={0}
          recursionLimit={this.state.recursionLimit}
          trianglesLimit={this.state.trianglesLimit}
        />
      </svg>
    );
  }
}

const App = () => <InitialTriangle />;


export default App;
