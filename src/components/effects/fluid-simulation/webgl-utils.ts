
// WebGL utility functions
export const getWebGLContext = (canvas: HTMLCanvasElement): WebGLRenderingContext | WebGL2RenderingContext | null => {
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  return gl;
};

export const getResolution = (width: number, height: number) => ({ width, height });

export const createBlit = (gl: WebGLRenderingContext | WebGL2RenderingContext) => {
  // Simple blit function for texture rendering
  return (destination: WebGLFramebuffer | null) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
};
