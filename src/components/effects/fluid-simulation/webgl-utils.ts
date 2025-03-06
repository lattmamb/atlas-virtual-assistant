
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

// Add extension getters for WebGL context
export const getExtensions = (gl: WebGLRenderingContext | WebGL2RenderingContext) => {
  // Return extensions object for compatibility with fluid simulation
  const isWebGL2 = !!(gl as WebGL2RenderingContext).drawBuffers;
  
  // Create extension objects based on WebGL version
  return {
    formatRGBA: { 
      internalFormat: isWebGL2 ? (gl as WebGL2RenderingContext).RGBA16F : gl.RGBA,
      format: gl.RGBA
    },
    formatRG: { 
      internalFormat: isWebGL2 ? (gl as WebGL2RenderingContext).RG16F : gl.RGBA,
      format: isWebGL2 ? (gl as WebGL2RenderingContext).RG : gl.RGBA
    },
    formatR: { 
      internalFormat: isWebGL2 ? (gl as WebGL2RenderingContext).R16F : gl.RGBA,
      format: isWebGL2 ? (gl as WebGL2RenderingContext).RED : gl.RGBA
    },
    halfFloatTexType: isWebGL2 ? (gl as WebGL2RenderingContext).HALF_FLOAT : gl.UNSIGNED_BYTE,
    supportLinearFiltering: true
  };
};

// Utility for setting canvas resolution
export const setCanvasResolution = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width;
  canvas.height = height;
  return { width, height };
};
