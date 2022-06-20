const exampleTriangle = (gl: WebGL2RenderingContext) => {
  const primitiveType = gl.TRIANGLES;
  const drawArrayOffset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, drawArrayOffset, count);
};

export default exampleTriangle;
