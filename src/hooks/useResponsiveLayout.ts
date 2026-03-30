// src/hooks/useResponsiveLayout.ts
import { useEffect, type RefObject } from 'react';

interface LayoutRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  layoutRef: RefObject<HTMLDivElement | null>;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

export const useResponsiveLayout = ({ containerRef, layoutRef }: LayoutRefs) => {
  useEffect(() => {
    console.log("KeqingShowcase mounted!");

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Set body styles
      document.body.style.setProperty("width", `${windowWidth}px`);
      document.body.style.setProperty("height", `${windowHeight}px`);
      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("margin", "0");
      document.body.style.setProperty("position", "fixed");
      document.body.style.setProperty("transform-origin", "center center");
      document.body.style.setProperty("transform", "rotate(0deg)");
      document.body.style.setProperty("background", "#8A38F5");

      // Check if refs are ready
      if (!containerRef.current || !layoutRef.current) {
        console.warn("Refs not ready yet. Skipping layout transform.");
        return;
      }

      const windowRatio = windowWidth / windowHeight;

      let containerWidth;
      let containerHeight;
      let left = 0;
      let top = 0;

      if (windowRatio > DESIGN_RATIO) {
        // Window is WIDER - fit to height
        containerHeight = windowHeight;
        containerWidth = containerHeight * DESIGN_RATIO;
        left = (windowWidth - containerWidth) / 2;
        top = 0;
      } else {
        // Window is TALLER - fit to width
        containerWidth = windowWidth;
        containerHeight = containerWidth / DESIGN_RATIO;
        left = 0;
        top = (windowHeight - containerHeight) / 2;
      }

      const scale = containerWidth / DESIGN_WIDTH;

      // Apply to container
      containerRef.current.style.width = `${windowWidth}px`;
      containerRef.current.style.height = `${windowHeight}px`;
      containerRef.current.style.left = `0px`;
      containerRef.current.style.top = `0px`;

      // Apply to layout
      layoutRef.current.style.width = `${windowWidth}px`;
      layoutRef.current.style.height = `${containerHeight}px`;
      layoutRef.current.style.top = `${top}px`;
      layoutRef.current.style.left = `0px`;

      console.log('Flexible Fullscreen:', {
        bodySize: `${windowWidth}x${windowHeight}`,
        containerSize: `${containerWidth}x${containerHeight}`,
        scale: scale.toFixed(3),
        position: `left: ${left}px, top: ${top}px`
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      document.body.style.position = '';
      document.body.style.overflow = '';
      document.body.style.transform = '';
      document.body.style.transformOrigin = '';
      document.body.style.background = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, layoutRef]);
};