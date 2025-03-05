
import { WebGLContextResult } from './types';

export function getWebGLContext(canvas: HTMLCanvasElement): WebGLContextResult {
  const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
  let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;
  if (!isWebGL2)
    gl = canvas.getContext('webgl', params) as WebGLRenderingContext || canvas.getContext('experimental-webgl', params) as WebGLRenderingContext;

  if (!gl) {
    return { gl: null, ext: { formatRGBA: null, formatRG: null, formatR: null, halfFloatTexType: undefined, supportLinearFiltering: undefined } };
  }

  let halfFloat;
  let supportLinearFiltering;
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float');
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
  let formatRGBA;
  let formatRG;
  let formatR;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;
    formatRGBA = getSupportedFormat(gl, gl2.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl2.RG16F, gl2.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl2.R16F, gl2.RED, halfFloatTexType);
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    }
  };
}

export function getSupportedFormat(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  internalFormat: number, 
  format: number, 
  type: number | undefined
) {
  if (!type) return null;
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    if (gl instanceof WebGL2RenderingContext) {
      switch (internalFormat) {
        case gl.R16F:
          return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F:
          return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default:
          return null;
      }
    }
    return null;
  }
  return {
    internalFormat,
    format
  };
}

export function supportRenderTextureFormat(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  internalFormat: number, 
  format: number, 
  type: number
) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status !== gl.FRAMEBUFFER_COMPLETE) return false;
  return true;
}

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
  };
}

export function getResolution(canvas: HTMLCanvasElement, resolution: number) {
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio < 1)
    aspectRatio = 1.0 / aspectRatio;
  
  let min = Math.round(resolution);
  let max = Math.round(resolution * aspectRatio);
  
  if (canvas.width > canvas.height)
    return { width: max, height: min };
  else
    return { width: min, height: max };
}
