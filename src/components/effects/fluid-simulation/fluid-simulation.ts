
import { FluidSimulationProps, PointerData } from './types';
import { getWebGLContext, getResolution, createBlit } from './webgl-utils';
import { compileShader, createProgram, createFBO, createDoubleFBO } from './program-utils';
import { getBaseVertexShader, getShaders } from './shaders';

export function setupFluidSimulation(
  canvas: HTMLCanvasElement,
  params: FluidSimulationProps,
  onCleanup: () => void
) {
  // Initialize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Get WebGL context
  const { gl, ext } = getWebGLContext(canvas);
  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  // Initialize pointers and state
  let pointers: PointerData[] = [];
  let splatStack: number[] = [];
  let bloomFramebuffers: any[] = [];
  pointers.push(createPointerPrototype());

  function createPointerPrototype(): PointerData {
    return {
      id: -1,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
      color: [30, 0, 300]
    };
  }

  // Compile shaders
  const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, getBaseVertexShader());
  const shaders = getShaders(params.BACK_COLOR || { r: 0.0, g: 0.0, b: 0.15 });
  
  const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.clearShader);
  const colorShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.colorShader);
  const backgroundShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.backgroundShader);
  const displayShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.displayShader);
  const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.splatShader);
  const advectionShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.advectionShader);
  const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.divergenceShader);
  const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.curlShader);
  const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.vorticityShader);
  const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.pressureShader);
  const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.gradientSubtractShader);
  const bloomPrefilterShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.bloomPrefilterShader);
  const bloomBlurShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.bloomBlurShader);
  const bloomFinalShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.bloomFinalShader);
  const sunraysShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.sunraysShader);
  const sunraysMaskShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.sunraysMaskShader);

  // Create programs
  const clearProgram = createProgram(gl, baseVertexShader, clearShader);
  const colorProgram = createProgram(gl, baseVertexShader, colorShader);
  const backgroundProgram = createProgram(gl, baseVertexShader, backgroundShader);
  const displayProgram = createProgram(gl, baseVertexShader, displayShader);
  const splatProgram = createProgram(gl, baseVertexShader, splatShader);
  const advectionProgram = createProgram(gl, baseVertexShader, advectionShader);
  const divergenceProgram = createProgram(gl, baseVertexShader, divergenceShader);
  const curlProgram = createProgram(gl, baseVertexShader, curlShader);
  const vorticityProgram = createProgram(gl, baseVertexShader, vorticityShader);
  const pressureProgram = createProgram(gl, baseVertexShader, pressureShader);
  const gradientSubtractProgram = createProgram(gl, baseVertexShader, gradientSubtractShader);
  const bloomPrefilterProgram = createProgram(gl, baseVertexShader, bloomPrefilterShader);
  const bloomBlurProgram = createProgram(gl, baseVertexShader, bloomBlurShader);
  const bloomFinalProgram = createProgram(gl, baseVertexShader, bloomFinalShader);
  const sunraysProgram = createProgram(gl, baseVertexShader, sunraysShader);
  const sunraysMaskProgram = createProgram(gl, baseVertexShader, sunraysMaskShader);

  // Create blit function for rendering
  const blit = createBlit(gl);

  // Initialize framebuffers
  let simWidth = params.SIM_RESOLUTION || 128;
  let simHeight = Math.round(canvas.height / canvas.width * simWidth);
  let dyeWidth = params.DYE_RESOLUTION || 1440;
  let dyeHeight = Math.round(canvas.height / canvas.width * dyeWidth);
  
  let density: any;
  let velocity: any;
  let divergence: any;
  let curl: any;
  let pressure: any;
  
  initFramebuffers();

  function initFramebuffers() {
    let simRes = getResolution(canvas, params.SIM_RESOLUTION || 128);
    let dyeRes = getResolution(canvas, params.DYE_RESOLUTION || 1440);
    
    simWidth = simRes.width;
    simHeight = simRes.height;
    dyeWidth = dyeRes.width;
    dyeHeight = dyeRes.height;
    
    density = createDoubleFBO(gl, dyeWidth, dyeHeight, ext.formatRGBA?.internalFormat || gl.RGBA, ext.formatRGBA?.format || gl.RGBA, ext.halfFloatTexType || gl.UNSIGNED_BYTE, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    velocity = createDoubleFBO(gl, simWidth, simHeight, ext.formatRG?.internalFormat || gl.RGBA, ext.formatRG?.format || gl.RGBA, ext.halfFloatTexType || gl.UNSIGNED_BYTE, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    divergence = createFBO(gl, simWidth, simHeight, ext.formatR?.internalFormat || gl.RGBA, ext.formatR?.format || gl.RGBA, ext.halfFloatTexType || gl.UNSIGNED_BYTE, gl.NEAREST);
    curl = createFBO(gl, simWidth, simHeight, ext.formatR?.internalFormat || gl.RGBA, ext.formatR?.format || gl.RGBA, ext.halfFloatTexType || gl.UNSIGNED_BYTE, gl.NEAREST);
    pressure = createDoubleFBO(gl, simWidth, simHeight, ext.formatR?.internalFormat || gl.RGBA, ext.formatR?.format || gl.RGBA, ext.halfFloatTexType || gl.UNSIGNED_BYTE, gl.NEAREST);
  }

  // Simulation and rendering state
  let lastUpdateTime = Date.now();
  let colorUpdateTimer = 0.0;
  let running = true;
  
  // Animation loop
  function update() {
    if (!running) return;
    
    const now = Date.now();
    const dt = Math.min((now - lastUpdateTime) / 1000, 0.016);
    lastUpdateTime = now;
    
    gl.viewport(0, 0, simWidth, simHeight);
    
    if (splatStack.length > 0) {
      for (let i = 0; i < splatStack.pop()!; i++) {
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
    gl.uniform1f(gl.getUniformLocation(advectionProgram!, 'dissipation'), params.VELOCITY_DISSIPATION || 2.0);
    blit(velocity.write.fbo);
    velocity.swap();
    
    gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uVelocity'), velocity.read.attach(0));
    gl.uniform1i(gl.getUniformLocation(advectionProgram!, 'uSource'), density.read.attach(1));
    gl.uniform1f(gl.getUniformLocation(advectionProgram!, 'dissipation'), params.DENSITY_DISSIPATION || 3.5);
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
    gl.uniform1f(gl.getUniformLocation(vorticityProgram!, 'curl'), params.CURL || 3);
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
    
    for (let i = 0; i < (params.PRESSURE_ITERATIONS || 20); i++) {
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

  // Fluid behavior functions
  function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
    splatProgram && gl.useProgram(splatProgram);
    gl.uniform1i(gl.getUniformLocation(splatProgram!, 'uTarget'), velocity.read.attach(0));
    gl.uniform1f(gl.getUniformLocation(splatProgram!, 'aspectRatio'), canvas.width / canvas.height);
    gl.uniform2f(gl.getUniformLocation(splatProgram!, 'point'), x / canvas.width, 1.0 - y / canvas.height);
    gl.uniform3f(gl.getUniformLocation(splatProgram!, 'color'), dx, -dy, 1.0);
    gl.uniform1f(gl.getUniformLocation(splatProgram!, 'radius'), (params.SPLAT_RADIUS || 0.2) / 100.0);
    blit(velocity.write.fbo);
    velocity.swap();
    
    gl.uniform1i(gl.getUniformLocation(splatProgram!, 'uTarget'), density.read.attach(0));
    gl.uniform3f(gl.getUniformLocation(splatProgram!, 'color'), color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
    blit(density.write.fbo);
    density.swap();
  }
  
  function multipleSplats(amount: number) {
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
  function setupEventListeners() {
    // Mousedown event
    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      const posX = e.offsetX;
      const posY = e.offsetY;
      updatePointerDownData(pointers[0], -1, posX, posY);
    });
    
    // Mousemove event
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const posX = e.offsetX;
      const posY = e.offsetY;
      updatePointerMoveData(pointers[0], posX, posY);
    });
    
    // Mouseup event
    window.addEventListener('mouseup', () => {
      updatePointerUpData(pointers[0]);
    });
    
    // Touch events
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        if (i >= pointers.length) pointers.push(createPointerPrototype());
        
        const posX = touches[i].pageX - canvas.getBoundingClientRect().left;
        const posY = touches[i].pageY - canvas.getBoundingClientRect().top;
        updatePointerDownData(pointers[i], touches[i].identifier, posX, posY);
      }
    });
    
    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        const posX = touches[i].pageX - canvas.getBoundingClientRect().left;
        const posY = touches[i].pageY - canvas.getBoundingClientRect().top;
        updatePointerMoveData(pointers[i], posX, posY);
      }
    });
    
    window.addEventListener('touchend', (e: TouchEvent) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const pointer = pointers.find(p => p.id === touches[i].identifier);
        if (pointer) updatePointerUpData(pointer);
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initFramebuffers();
    });
  }

  // Helper functions for pointer events
  function updatePointerDownData(pointer: PointerData, id: number, posX: number, posY: number) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.x = posX;
    pointer.y = posY;
    pointer.dx = 0;
    pointer.dy = 0;
    pointer.color = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];
  }
  
  function updatePointerMoveData(pointer: PointerData, posX: number, posY: number) {
    if (!pointer.down) return;
    pointer.moved = true;
    pointer.dx = posX - pointer.x;
    pointer.dy = posY - pointer.y;
    pointer.x = posX;
    pointer.y = posY;
  }
  
  function updatePointerUpData(pointer: PointerData) {
    pointer.down = false;
  }

  // Initialize and start the animation
  setupEventListeners();
  multipleSplats(parseInt(String(Math.random() * 20)) + 5);
  update();
  
  // Return cleanup function
  return () => {
    running = false;
    onCleanup();
  };
}
