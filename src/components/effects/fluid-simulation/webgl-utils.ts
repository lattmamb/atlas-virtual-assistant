
import { WebGLContext } from './types';

export function getWebGLContext(canvas: HTMLCanvasElement): WebGLContext {
  const params = { 
    alpha: true, 
    depth: false, 
    stencil: false, 
    antialias: false, 
    preserveDrawingBuffer: false,
    premultipliedAlpha: true
  };

  let gl: WebGLRenderingContext | WebGL2RenderingContext;
  const gl2Context = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
  const isWebGL2 = !!gl2Context;
  
  if (isWebGL2) {
    gl = gl2Context;
  } else {
    const fallbackContext = (
      canvas.getContext('webgl', params) || 
      canvas.getContext('experimental-webgl', params)
    ) as WebGLRenderingContext;
    
    if (!fallbackContext) {
      throw new Error('WebGL not supported');
    }
    
    gl = fallbackContext;
  }

  // Extension handling
  const ext = {
    formatRGBA: null,
    formatRG: null,
    formatR: null,
    halfFloatTexType: null,
    supportLinearFiltering: false
  };

  if (isWebGL2) {
    gl2Context.getExtension('EXT_color_buffer_float');
    ext.supportLinearFiltering = gl2Context.getExtension('OES_texture_float_linear') !== null;
  } else {
    ext.formatRGBA = gl.getExtension('EXT_sRGB');
    ext.formatRG = gl.getExtension('EXT_sRGB');
    ext.formatR = gl.getExtension('EXT_sRGB');
    const halfFloatExt = gl.getExtension('OES_texture_half_float');
    ext.halfFloatTexType = halfFloatExt ? halfFloatExt.HALF_FLOAT_OES : undefined;
    ext.supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear') !== null;
  }

  return { gl, ext };
}

// Add getResolution function
export function getResolution(canvas: HTMLCanvasElement, resolution: number): { width: number, height: number } {
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

  let width = Math.round(resolution);
  let height = Math.round(width / aspectRatio);

  if (canvas.width > canvas.height) {
    return { width, height };
  } else {
    return { width: height, height: width };
  }
}

// Add createBlit function
export function createBlit(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  return (destination: WebGLFramebuffer | null) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }
}
