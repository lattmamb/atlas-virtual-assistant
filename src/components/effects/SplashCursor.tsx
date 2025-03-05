
"use client";
import React, { useEffect, useRef } from "react";
import { setupFluidSimulation } from "./fluid-simulation/fluid-simulation";
import { FluidSimulationProps } from "./fluid-simulation/types";

const SplashCursor: React.FC<FluidSimulationProps> = ({
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
  BACK_COLOR = { r: 0.0, g: 0.0, b: 0.15 }, // Dark blue to match cosmic theme
  TRANSPARENT = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Configure all parameters for the fluid simulation
    const params: FluidSimulationProps = {
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

    // Setup the fluid simulation
    const cleanup = setupFluidSimulation(canvas, params, () => {
      // This will be called when the component unmounts
      window.removeEventListener('resize', handleResize);
    });
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Return cleanup function from useEffect
    return cleanup;
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
