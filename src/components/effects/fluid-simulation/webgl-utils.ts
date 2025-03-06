// Add getResolution and createBlit functions that are missing
export const getResolution = (width: number, height: number) => ({ width, height });

export const createBlit = (gl: WebGLRenderingContext | WebGL2RenderingContext) => {
  // Simple blit function for texture rendering
  return (destination: WebGLFramebuffer | null) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
};
