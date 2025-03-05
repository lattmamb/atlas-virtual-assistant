
import React, { useEffect, useRef } from "react";

export function Squares({ className = "" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSquare = () => {
      const square = document.createElement("div");
      square.classList.add("squares-item");
      
      const size = Math.random() * 50 + 10;
      square.style.width = `${size}px`;
      square.style.height = `${size}px`;
      
      square.style.left = `${Math.random() * 100}%`;
      square.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 20 + 10;
      square.style.animationDuration = `${duration}s`;
      
      const delay = Math.random() * 5;
      square.style.animationDelay = `${delay}s`;
      
      container.appendChild(square);
      
      setTimeout(() => {
        square.remove();
      }, (duration + delay) * 1000);
    };

    // Create initial squares
    for (let i = 0; i < 20; i++) {
      createSquare();
    }

    // Add new squares periodically
    const interval = setInterval(createSquare, 1000);

    return () => {
      clearInterval(interval);
      if (container) {
        // Clean up all squares
        const squares = container.querySelectorAll(".squares-item");
        squares.forEach(square => square.remove());
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <style jsx global>{`
        .squares-item {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          animation: squares-float linear forwards;
          opacity: 0;
          transform: translateY(0) rotate(0);
        }

        @keyframes squares-float {
          0% {
            opacity: 0;
            transform: translateY(50px) rotate(0deg);
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
