import createProgram from '../createProgram';
import createShader from '../createShader';
import resizeCanvasToDisplaySize from '../utils/resizeCanvasToDisplaySize';

class Program {
  public gl: WebGL2RenderingContext;

  public program: WebGLProgram | undefined;

  private positions: number[] = [];

  private positionBuffer: WebGLBuffer | null = null;

  private colorBuffer: WebGLBuffer | null = null;

  private colorAttribLocation = 0;

  private vao: WebGLVertexArrayObject | null = null;

  private resolutionUniformLocation: WebGLUniformLocation | null = null;

  constructor(gl: WebGL2RenderingContext, vertexShaderCode: string, fragmentShaderCode: string) {
    this.gl = gl;
    this.initProgram(vertexShaderCode, fragmentShaderCode);
  }

  private initProgram(vertexShaderCode: string, fragmentShaderCode: string) {
    const gl = this.gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

    if (!vertexShader) {
      console.log('Vertex shader is null');
      return;
    }

    if (!fragmentShader) {
      console.log('Fragment shader is null');
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    this.program = program;

    if (!program) {
      console.log('Program is null');
      return;
    }

    this.colorBuffer = gl.createBuffer();

    const positionBuffer = gl.createBuffer();
    this.positionBuffer = positionBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // eslint-disable-next-line prettier/prettier
    const positions = [
      10, 20,
      80, 20,
      10, 30,
      10, 30,
      80, 20,
      80, 30,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    this.colorAttribLocation = gl.getAttribLocation(program, 'a_color');
    // const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    const vao = gl.createVertexArray();
    this.vao = vao;
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

    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  }

  public setColors(colors: number[]) {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  }

  public setPositions(positions: number[]) {
    this.positions = positions;
    const gl = this.gl;

    // gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // eslint-disable-next-line prettier/prettier
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
  }

  public drawScene() {
    if (!this.program) {
      throw new Error('program not set');
    }
    const gl = this.gl;
    const vao = this.vao;
    const { resolutionUniformLocation, positionBuffer } = this;
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(this.program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // Pass in the canvas resolution so we can convert from
    // pixels to clipspace in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Update the position buffer with rectangle positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.setPositions(this.positions);
    // setRectangle(gl, translation[0], translation[1], width, height);

    // Set a random color.
    // gl.uniform4fv(colorLocation, color);

    // this.connectColors();

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLE_STRIP;
    const offset = 0;
    const count = this.positions.length / 2;
    gl.drawArrays(primitiveType, offset, count);
  }

  private connectColors() {
    const gl = this.gl;
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(this.colorAttribLocation, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(this.colorAttribLocation);
  }
}

export default Program;
