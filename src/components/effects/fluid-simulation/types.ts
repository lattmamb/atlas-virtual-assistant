
export interface FluidSimulationProps {
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

export interface WebGLContext {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  ext: {
    formatRGBA: any;
    formatRG: any;
    formatR: any;
    halfFloatTexType: number | undefined;
    supportLinearFiltering: boolean;
  };
}

export interface WebGLContextResult {
  gl: WebGLRenderingContext | WebGL2RenderingContext | null;
  ext: {
    formatRGBA: { internalFormat: number; format: number } | null;
    formatRG: { internalFormat: number; format: number } | null;
    formatR: { internalFormat: number; format: number } | null;
    halfFloatTexType: number | undefined;
    supportLinearFiltering: boolean | undefined;
  };
}

export interface FrameBuffer {
  texture: WebGLTexture | null;
  fbo: WebGLFramebuffer | null;
  width: number;
  height: number;
  attach: (id: number) => number;
}

export interface DoubleFrameBuffer {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FrameBuffer;
  write: FrameBuffer;
  swap: () => void;
}

export interface PointerData {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  down: boolean;
  moved: boolean;
  color: number[];
}
