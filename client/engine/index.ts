import createProgram from './createProgram';
import createShader from './createShader';
import simpleFragmentShader from './shaders/simpleFragmentShader';
import simpleVertexShader from './shaders/simpleVertexShader';
import resizeCanvasToDisplaySize from './utils/resizeCanvasToDisplaySize';

function engine(gl: WebGL2RenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, simpleVertexShader);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, simpleFragmentShader);

  if (!vertexShader) {
    console.log('Vertex shader is null');
    return;
  }

  if (!fragmentShader) {
    console.log('Fragment shader is null');
    return;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) {
    console.log('Program is null');
    return;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  gl.enableVertexAttribArray(positionAttributeLocation);

  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindVertexArray(vao);

  const primitiveType = gl.TRIANGLES;
  const drawArrayOffset = 0;
  const count = 3;
  gl.drawArrays(primitiveType, drawArrayOffset, count);
}

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvasElement?.getContext('webgl2');
if (gl) {
  engine(gl);
}

export default engine;
