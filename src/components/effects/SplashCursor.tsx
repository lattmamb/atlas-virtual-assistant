
"use client";
import React, { useEffect, useRef } from "react";

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

const SplashCursor: React.FC<SplashCursorProps> = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.0, g: 0.0, b: 0.15 }, // Changed to dark blue to match cosmic theme
  TRANSPARENT = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const params = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      BACK_COLOR,
      TRANSPARENT,
    };

    let config = {
      TEXTURE_DOWNSAMPLE: 1,
      TEXTURE_ALPHA: true,
      COLOR_SPACE: 0,
      COLOR_UPDATE_SPEED: params.COLOR_UPDATE_SPEED,
      BACK_COLOR: params.BACK_COLOR,
      TRANSPARENT: params.TRANSPARENT,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    };

    let pointers: any[] = [];
    let splatStack: any[] = [];
    let bloomFramebuffers: any[] = [];
    pointers.push(new pointerPrototype());

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // WebGL setup
    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl = canvas.getContext('webgl', params) as WebGLRenderingContext || canvas.getContext('experimental-webgl', params) as WebGLRenderingContext;

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
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
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

    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case (gl as WebGL2RenderingContext).R16F:
            return getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, gl.RG, type);
          case (gl as WebGL2RenderingContext).RG16F:
            return getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return {
        internalFormat,
        format
      };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
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

    function pointerPrototype() {
      this.id = -1;
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.down = false;
      this.moved = false;
      this.color = [30, 0, 300];
    }

    function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

      return program;
    }

    // Shader program creation
    let baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    let clearShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `);

    let colorShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec4 color;
      void main () {
          gl_FragColor = color;
      }
    `);

    let backgroundShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float aspectRatio;
      #define BACK_COLOR vec3(${BACK_COLOR.r}, ${BACK_COLOR.g}, ${BACK_COLOR.b})
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          
          #define TRANSPARENT
          #ifdef TRANSPARENT
              vec3 backColor = BACK_COLOR;
              gl_FragColor = vec4(backColor * (1.0 - c.r), 1.0);
          #else
              gl_FragColor = vec4(c, 1.0);
          #endif
      }
    `);

    let displayShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `);

    let splatShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

    let advectionShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      
      void main () {
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
          gl_FragColor.a = 1.0;
      }
    `);

    let divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

    let curlShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `);

    let vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    let pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `);

    let gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    let bloomPrefilterShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 curve;
      uniform float threshold;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          float rq = clamp(br - curve.x, 0.0, curve.y);
          rq = curve.z * rq * rq;
          c *= max(rq, br - threshold) / max(br, 0.0001);
          gl_FragColor = vec4(c, 0.0);
      }
    `);

    let bloomBlurShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;
      uniform vec2 direction;
      void main () {
          vec3 result = vec3(0.0);
          vec2 off1 = vec2(1.3846153846) * direction;
          vec2 off2 = vec2(3.2307692308) * direction;
          result += texture2D(uTexture, vUv).rgb * 0.2270270270;
          result += texture2D(uTexture, vUv + texelSize * off1).rgb * 0.3162162162;
          result += texture2D(uTexture, vUv - texelSize * off1).rgb * 0.3162162162;
          result += texture2D(uTexture, vUv + texelSize * off2).rgb * 0.0702702703;
          result += texture2D(uTexture, vUv - texelSize * off2).rgb * 0.0702702703;
          gl_FragColor = vec4(result, 0.0);
      }
    `);

    let bloomFinalShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform sampler2D uBloom;
      uniform sampler2D uSunrays;
      uniform float sunraysWeight;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          vec3 bloom = texture2D(uBloom, vUv).rgb;
          float sunrays = texture2D(uSunrays, vUv).r;
          c += bloom;
          c += sunrays * sunraysWeight;
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `);

    let sunraysShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float weight;
      void main () {
          float r = texture2D(uTexture, vUv).r;
          float g = texture2D(uTexture, vUv).g;
          float b = texture2D(uTexture, vUv).b;
          float a = max(r, max(g, b));
          gl_FragColor = vec4(weight * a);
      }
    `);

    let sunraysMaskShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          c = mix(vec3(0.0), c, br);
          gl_FragColor = vec4(c, 1.0);
      }
    `);

    // Program creation
    let clearProgram = createProgram(gl, baseVertexShader!, clearShader!);
    let colorProgram = createProgram(gl, baseVertexShader!, colorShader!);
    let backgroundProgram = createProgram(gl, baseVertexShader!, backgroundShader!);
    let displayProgram = createProgram(gl, baseVertexShader!, displayShader!);
    let splatProgram = createProgram(gl, baseVertexShader!, splatShader!);
    let advectionProgram = createProgram(gl, baseVertexShader!, advectionShader!);
    let divergenceProgram = createProgram(gl, baseVertexShader!, divergenceShader!);
    let curlProgram = createProgram(gl, baseVertexShader!, curlShader!);
    let vorticityProgram = createProgram(gl, baseVertexShader!, vorticityShader!);
    let pressureProgram = createProgram(gl, baseVertexShader!, pressureShader!);
    let gradientSubtractProgram = createProgram(gl, baseVertexShader!, gradientSubtractShader!);
    let bloomPrefilterProgram = createProgram(gl, baseVertexShader!, bloomPrefilterShader!);
    let bloomBlurProgram = createProgram(gl, baseVertexShader!, bloomBlurShader!);
    let bloomFinalProgram = createProgram(gl, baseVertexShader!, bloomFinalShader!);
    let sunraysProgram = createProgram(gl, baseVertexShader!, sunraysShader!);
    let sunraysMaskProgram = createProgram(gl, baseVertexShader!, sunraysMaskShader!);

    // Assign locations for program variables
    const blit = (() => {
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
    })();

    // Create framebuffers and textures
    let simWidth = params.SIM_RESOLUTION;
    let simHeight = Math.round(canvas.height / canvas.width * simWidth);
    let dyeWidth = params.DYE_RESOLUTION;
    let dyeHeight = Math.round(canvas.height / canvas.width * dyeWidth);
    
    let density: any;
    let velocity: any;
    let divergence: any;
    let curl: any;
    let pressure: any;
    
    let ditheringTexture: WebGLTexture | null = null;

    initFramebuffers();

    function initFramebuffers () {
      let simRes = getResolution(params.SIM_RESOLUTION);
      let dyeRes = getResolution(params.DYE_RESOLUTION);
      
      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;
      
      density = createDoubleFBO(dyeWidth, dyeHeight, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
      velocity = createDoubleFBO(simWidth, simHeight, ext.formatRG.internalFormat, ext.formatRG.format, ext.halfFloatTexType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
      divergence = createFBO(simWidth, simHeight, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
      curl = createFBO(simWidth, simHeight, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
      pressure = createDoubleFBO(simWidth, simHeight, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
    }
    
    function getResolution (resolution: number) {
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
    
    function createFBO (width: number, height: number, internalFormat: number, format: number, type: number, filter: number) {
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
        attach (id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    }
    
    function createDoubleFBO (width: number, height: number, internalFormat: number, format: number, type: number, filter: number) {
      let fbo1 = createFBO(width, height, internalFormat, format, type, filter);
      let fbo2 = createFBO(width, height, internalFormat, format, type, filter);
      
      return {
        width,
        height,
        texelSizeX: 1.0 / width,
        texelSizeY: 1.0 / height,
        get read () {
          return fbo1;
        },
        set read (value) {
          fbo1 = value;
        },
        get write () {
          return fbo2;
        },
        set write (value) {
          fbo2 = value;
        },
        swap () {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    }
    
    // Animation and rendering
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;
    let running = true;
    
    function update() {
      if (!running) return;
      
      const now = Date.now();
      const dt = Math.min((now - lastUpdateTime) / 1000, 0.016);
      lastUpdateTime = now;
      
      gl.viewport(0, 0, simWidth, simHeight);
      
      if (splatStack.length > 0) {
        for (let i = 0; i < splatStack.pop(); i++) {
          const color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
          const x = canvas.width * Math.random();
          const y = canvas.height * Math.random();
          const dx = 1000 * (Math.random() - 0.5);
          const dy = 1000 * (Math.random() - 0.5);
          splat(x, y, dx, dy, color);
        }
      }
      
      if (pointers[0].down) {
        splat(pointers[0].x, pointers[0].y, pointers[0].dx, pointers[0].dy, pointers[0].color);
      }
      
      advectionProgram && gl.useProgram(advectionProgram);
      gl.uniform2f(gl.getUniformLocation(advectionProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uSource'), velocity.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(advectionProgram!, 'dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectionProgram!, 'dissipation'), params.VELOCITY_DISSIPATION);
      blit(velocity.write.fbo);
      velocity.swap();
      
      gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uSource'), density.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(advectionProgram!, 'dissipation'), params.DENSITY_DISSIPATION);
      blit(density.write.fbo);
      density.swap();
      
      curlProgram && gl.useProgram(curlProgram);
      gl.uniform2f(gl.getUniformLocation(curlProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(curlProgram!, 'uVelocity'), velocity.read.attach(0));
      blit(curl.fbo);
      
      vorticityProgram && gl.useProgram(vorticityProgram);
      gl.uniform2f(gl.getUniformLocation(vorticityProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(vorticityProgram!, 'uVelocity'), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(vorticityProgram!, 'uCurl'), curl.attach(1));
      gl.uniform1f(gl.getUniformLocation(vorticityProgram!, 'curl'), params.CURL);
      gl.uniform1f(gl.getUniformLocation(vorticityProgram!, 'dt'), dt);
      blit(velocity.write.fbo);
      velocity.swap();
      
      divergenceProgram && gl.useProgram(divergenceProgram);
      gl.uniform2f(gl.getUniformLocation(divergenceProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(divergenceProgram!, 'uVelocity'), velocity.read.attach(0));
      blit(divergence.fbo);
      
      colorProgram && gl.useProgram(colorProgram);
      gl.uniform4f(gl.getUniformLocation(colorProgram!, 'color'), 0, 0, 0, 1);
      blit(pressure.write.fbo);
      pressure.swap();
      
      pressureProgram && gl.useProgram(pressureProgram);
      gl.uniform2f(gl.getUniformLocation(pressureProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(pressureProgram!, 'uDivergence'), divergence.attach(0));
      
      for (let i = 0; i < params.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(gl.getUniformLocation(pressureProgram!, 'uPressure'), pressure.read.attach(1));
        blit(pressure.write.fbo);
        pressure.swap();
      }
      
      gradientSubtractProgram && gl.useProgram(gradientSubtractProgram);
      gl.uniform2f(gl.getUniformLocation(gradientSubtractProgram!, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(gradientSubtractProgram!, 'uPressure'), pressure.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(gradientSubtractProgram!, 'uVelocity'), velocity.read.attach(1));
      blit(velocity.write.fbo);
      velocity.swap();
      
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      displayProgram && gl.useProgram(displayProgram);
      gl.uniform1i(gl.getUniformLocation(displayProgram!, 'uTexture'), density.read.attach(0));
      blit(null);
      
      requestAnimationFrame(update);
    }

    // Handle mouse/touch events
    function splat (x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProgram && gl.useProgram(splatProgram);
      gl.uniform1i(gl.getUniformLocation(splatProgram!, 'uTarget'), velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(splatProgram!, 'aspectRatio'), canvas.width / canvas.height);
      gl.uniform2f(gl.getUniformLocation(splatProgram!, 'point'), x / canvas.width, 1.0 - y / canvas.height);
      gl.uniform3f(gl.getUniformLocation(splatProgram!, 'color'), dx, -dy, 1.0);
      gl.uniform1f(gl.getUniformLocation(splatProgram!, 'radius'), params.SPLAT_RADIUS / 100.0);
      blit(velocity.write.fbo);
      velocity.swap();
      
      gl.uniform1i(gl.getUniformLocation(splatProgram!, 'uTarget'), density.read.attach(0));
      gl.uniform3f(gl.getUniformLocation(splatProgram!, 'color'), color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
      blit(density.write.fbo);
      density.swap();
    }
    
    function multipleSplats (amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
        const x = canvas.width * Math.random();
        const y = canvas.height * Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }
    
    // Event handlers
    function updatePointerDownData(pointer: any, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.x = posX;
      pointer.y = posY;
      pointer.dx = 0;
      pointer.dy = 0;
      pointer.color = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];
    }
    
    function updatePointerMoveData(pointer: any, posX: number, posY: number) {
      if (!pointer.down) return;
      pointer.moved = true;
      pointer.dx = posX - pointer.x;
      pointer.dy = posY - pointer.y;
      pointer.x = posX;
      pointer.y = posY;
    }
    
    function updatePointerUpData(pointer: any) {
      pointer.down = false;
    }
    
    // Add event listeners
    canvas.addEventListener('mousedown', e => {
      let posX = e.offsetX;
      let posY = e.offsetY;
      let pointer = pointers[0];
      updatePointerDownData(pointer, -1, posX, posY);
    });
    
    canvas.addEventListener('mousemove', e => {
      let posX = e.offsetX;
      let posY = e.offsetY;
      updatePointerMoveData(pointers[0], posX, posY);
    });
    
    window.addEventListener('mouseup', () => {
      updatePointerUpData(pointers[0]);
    });
    
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        if (i >= pointers.length) pointers.push(new pointerPrototype());
        
        let posX = touches[i].pageX - canvas.getBoundingClientRect().left;
        let posY = touches[i].pageY - canvas.getBoundingClientRect().top;
        updatePointerDownData(pointers[i], touches[i].identifier, posX, posY);
      }
    });
    
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        let posX = touches[i].pageX - canvas.getBoundingClientRect().left;
        let posY = touches[i].pageY - canvas.getBoundingClientRect().top;
        updatePointerMoveData(pointers[i], posX, posY);
      }
    });
    
    window.addEventListener('touchend', e => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers.find(p => p.id === touches[i].identifier);
        if (pointer) updatePointerUpData(pointer);
      }
    });
    
    // Initialize the animation
    multipleSplats(parseInt(String(Math.random() * 20)) + 5);
    update();
    
    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup function for useEffect
    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mouseup', updatePointerUpData);
      window.removeEventListener('touchend', updatePointerUpData);
      canvas.removeEventListener('mousedown', updatePointerDownData);
      canvas.removeEventListener('mousemove', updatePointerMoveData);
      canvas.removeEventListener('touchstart', updatePointerDownData);
      canvas.removeEventListener('touchmove', updatePointerMoveData);
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-full h-full" />
    </div>
  );
};

export default SplashCursor;
