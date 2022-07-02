function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | undefined {
  const shader = gl.createShader(type);

  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  } else {
    console.error('shader is null');
  }

  return undefined;
}

export default createShader;
