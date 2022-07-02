import exampleRectangle from './examples/exampleRectangles';
import exampleTriangle from './examples/exampleTriangle';
import Program from './models/Program';
import simpleFragmentShader from './shaders/simpleFragmentShader';
import simpleVertexShader from './shaders/simpleVertexShader';

function engine(gl: WebGL2RenderingContext) {
  const program = new Program(gl, simpleVertexShader, simpleFragmentShader);
  if (program.program) {
    exampleRectangle(program.gl, program.program);
  }
}

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvasElement?.getContext('webgl2');
if (gl) {
  engine(gl);
}

export default engine;
