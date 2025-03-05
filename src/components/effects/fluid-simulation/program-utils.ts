
import { FrameBuffer, DoubleFrameBuffer } from './types';

export function compileShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.trace(gl.getShaderInfoLog(shader));

  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext | WebGL2RenderingContext, 
  vertexShader: WebGLShader | null, 
  fragmentShader: WebGLShader | null
) {
  if (!vertexShader || !fragmentShader) return null;
  
  const program = gl.createProgram();
  if (!program) return null;
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program));

  return program;
}

export function createFBO(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  width: number, 
  height: number, 
  internalFormat: number, 
  format: number, 
  type: number, 
  filter: number
): FrameBuffer {
  gl.activeTexture(gl.TEXTURE0);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
  
  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  return {
    texture,
    fbo,
    width,
    height,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    }
  };
}

export function createDoubleFBO(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  width: number, 
  height: number, 
  internalFormat: number, 
  format: number, 
  type: number, 
  filter: number
): DoubleFrameBuffer {
  let fbo1 = createFBO(gl, width, height, internalFormat, format, type, filter);
  let fbo2 = createFBO(gl, width, height, internalFormat, format, type, filter);
  
  return {
    width,
    height,
    texelSizeX: 1.0 / width,
    texelSizeY: 1.0 / height,
    get read() {
      return fbo1;
    },
    set read(value) {
      fbo1 = value;
    },
    get write() {
      return fbo2;
    },
    set write(value) {
      fbo2 = value;
    },
    swap() {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    }
  };
}
