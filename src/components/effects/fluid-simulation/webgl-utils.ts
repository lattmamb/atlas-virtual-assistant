
// WebGL utility functions
export function loadTexture(gl: WebGLRenderingContext | WebGL2RenderingContext, src: string): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error('Failed to create texture');
  }
  
  const image = new Image();
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
  image.src = src;
  
  return texture;
}

export function createFramebuffer(gl: WebGLRenderingContext | WebGL2RenderingContext, texture: WebGLTexture): WebGLFramebuffer {
  const framebuffer = gl.createFramebuffer();
  if (!framebuffer) {
    throw new Error('Failed to create framebuffer');
  }
  
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  
  return framebuffer;
}

// Fixed function with proper WebGL2 handling
export function getWebGLContext(canvas: HTMLCanvasElement): WebGLRenderingContext | WebGL2RenderingContext {
  const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
  
  // Try WebGL2 first
  let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
  
  if (!gl) {
    // Fall back to WebGL1
    gl = canvas.getContext('webgl', params) as WebGLRenderingContext;
    
    if (!gl) {
      throw new Error('WebGL not supported');
    }
  }
  
  return gl;
}

// Fix HALF_FLOAT handling with proper feature detection
export function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number): boolean {
  if (isWebGL2(gl)) {
    // WebGL2 context
    const gl2 = gl as WebGL2RenderingContext;
    
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
    
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    
    return status === gl.FRAMEBUFFER_COMPLETE;
  } else {
    // WebGL1 context
    const gl1 = gl as WebGLRenderingContext;
    const ext = gl1.getExtension('OES_texture_half_float');
    
    if (!ext) {
      return false;
    }
    
    return true;
  }
}

// Helper to check if the context is WebGL2
export function isWebGL2(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  return (gl as WebGL2RenderingContext).HALF_FLOAT !== undefined;
}

// Function to get correct HALF_FLOAT type based on context
export function getHalfFloatType(gl: WebGLRenderingContext | WebGL2RenderingContext): number {
  if (isWebGL2(gl)) {
    return (gl as WebGL2RenderingContext).HALF_FLOAT;
  } else {
    const ext = (gl as WebGLRenderingContext).getExtension('OES_texture_half_float');
    if (!ext) {
      throw new Error('OES_texture_half_float not supported');
    }
    return (ext as any).HALF_FLOAT_OES;
  }
}

// Function to support render texture format
export function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number): boolean {
  // Check if format is supported
  return getSupportedFormat(gl, internalFormat, format, type);
}

// Create an improved texture for use in the fluid simulation
export function createFluidTexture(gl: WebGLRenderingContext | WebGL2RenderingContext, width: number, height: number): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error('Failed to create texture');
  }
  
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  // Use the appropriate format and type
  let internalFormat = gl.RGBA;
  let format = gl.RGBA;
  let type = gl.UNSIGNED_BYTE;
  
  // Try to use half float if available (better precision)
  if (isWebGL2(gl)) {
    const gl2 = gl as WebGL2RenderingContext;
    if (supportRenderTextureFormat(gl, gl2.RGBA16F, gl.RGBA, gl2.HALF_FLOAT)) {
      internalFormat = gl2.RGBA16F;
      type = gl2.HALF_FLOAT;
    }
  } else {
    const gl1 = gl as WebGLRenderingContext;
    const ext = gl1.getExtension('OES_texture_half_float');
    if (ext && supportRenderTextureFormat(gl, gl.RGBA, gl.RGBA, (ext as any).HALF_FLOAT_OES)) {
      type = (ext as any).HALF_FLOAT_OES;
    }
  }
  
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
  
  return texture;
}
