// Returns a random integer from 0 to range - 1.
function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.

function setRectangle(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}

const exampleRectangle = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
  const colorLocation = gl.getUniformLocation(program, 'u_color');

  // draw 50 random rectangles in random colors
  for (let ii = 0; ii < 50; ++ii) {
    // Setup a random rectangle
    setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

    // Set a random color.
    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
};

export default exampleRectangle;
