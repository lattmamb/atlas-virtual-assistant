
export function getWebGLContext(canvas: HTMLCanvasElement) {
  const params = { 
    alpha: true, 
    depth: false, 
    stencil: false, 
    antialias: false, 
    preserveDrawingBuffer: false,
    desynchronized: false,
    premultipliedAlpha: true
  };

  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  
  // Try to get WebGL2 context first
  gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
  
  // Fall back to WebGL1 if WebGL2 is not available
  if (!gl) {
    gl = canvas.getContext('webgl', params) as WebGLRenderingContext | null;
  }
  
  if (!gl) {
    throw new Error('WebGL not supported');
  }
  
  const ext = {
    formatRGBA: null,
    formatRG: null,
    formatR: null,
    halfFloatTexType: null,
    supportLinearFiltering: null
  };
  
  if (gl instanceof WebGLRenderingContext) {
    // WebGL1 context
    ext.formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
    ext.formatRG = { internalFormat: gl.RGBA, format: gl.RGBA };
    ext.formatR = { internalFormat: gl.RGBA, format: gl.RGBA };
    
    const textureFloat = gl.getExtension('OES_texture_float');
    if (textureFloat) {
      ext.halfFloatTexType = gl.FLOAT;
    } else {
      ext.halfFloatTexType = gl.UNSIGNED_BYTE;
    }
    
    const textureHalfFloat = gl.getExtension('OES_texture_half_float');
    if (textureHalfFloat) {
      ext.halfFloatTexType = textureHalfFloat.HALF_FLOAT_OES;
    }
    
    const floatLinearFiltering = gl.getExtension('OES_texture_float_linear');
    const halfFloatLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    
    ext.supportLinearFiltering = !!(floatLinearFiltering || halfFloatLinearFiltering);
  } else {
    // WebGL2 context
    ext.formatRGBA = { internalFormat: gl.RGBA8, format: gl.RGBA };
    ext.formatRG = { internalFormat: gl.RG8, format: gl.RG };
    ext.formatR = { internalFormat: gl.R8, format: gl.RED };
    
    const textureHalfFloat = gl.getExtension('EXT_color_buffer_half_float');
    if (textureHalfFloat) {
      ext.halfFloatTexType = gl.HALF_FLOAT;
    } else {
      ext.halfFloatTexType = gl.UNSIGNED_BYTE;
    }
    
    ext.supportLinearFiltering = true;
  }
  
  return { gl, ext };
}

// Rest of your WebGL utility functions
export function createTexture(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  width: number, 
  height: number, 
  internalFormat: number, 
  format: number, 
  type: number, 
  param: number
) {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
  
  return texture;
}

export function createDoubleFBO(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  width: number, 
  height: number, 
  internalFormat: number, 
  format: number, 
  type: number, 
  param: number
) {
  let fbo1 = createFBO(gl, width, height, internalFormat, format, type, param);
  let fbo2 = createFBO(gl, width, height, internalFormat, format, type, param);
  
  return {
    read: fbo1,
    write: fbo2,
    swap: () => {
      const temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    }
  };
}

export function createFBO(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  width: number, 
  height: number, 
  internalFormat: number, 
  format: number, 
  type: number, 
  param: number
) {
  const texture = createTexture(gl, width, height, internalFormat, format, type, param);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  const texelSizeX = 1.0 / width;
  const texelSizeY = 1.0 / height;
  
  return {
    texture,
    fbo,
    width,
    height,
    texelSizeX,
    texelSizeY,
    attach: (id: number) => {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    }
  };
}
