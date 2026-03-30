// src/hooks/useShowcaseAnimations.ts
import { useEffect, type RefObject } from 'react';
import {
  setBackgroundInitialState,
  animateBackground,
  animateCharacter,
  animateHeader,
  animateSubheader,
  animateBacktext1,
  animateBacktext2,
} from '../utils/animations';

interface AnimationRefs {
  bgRef: RefObject<HTMLImageElement | null>;
  keqingRef: RefObject<HTMLImageElement | null>;
  headerRef: RefObject<HTMLImageElement | null>;
  subheaderRef: RefObject<HTMLImageElement | null>;
  backtextRef1: RefObject<HTMLImageElement | null>;
  backtextRef2: RefObject<HTMLImageElement | null>;
  layoutRef: RefObject<HTMLDivElement | null>;
}

// Define animation configuration
const animationConfig = [
  {
    name: 'background',
    refKey: 'bgRef',
    setInitial: setBackgroundInitialState,
    animate: animateBackground,
    requiresLayout: true,
    alwaysSetInitial: true,
  },
  {
    name: 'character',
    refKey: 'keqingRef',
    animate: animateCharacter,
    requiresLayout: true,
  },
  {
    name: 'header',
    refKey: 'headerRef',
    animate: animateHeader,
    requiresLayout: true,
  },
  {
    name: 'subheader',
    refKey: 'subheaderRef',
    animate: animateSubheader,
    requiresLayout: true,
  },
  {
    name: 'backtext1',
    refKey: 'backtextRef1',
    animate: animateBacktext1,
    requiresLayout: true,
  },
  {
    name: 'backtext2',
    refKey: 'backtextRef2',
    animate: animateBacktext2,
    requiresLayout: true,
  },
];

export const useShowcaseAnimations = (
  refs: AnimationRefs,
  characterId: string,
  shouldStart: boolean = true
) => {
  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];

    animationConfig.forEach((config) => {
      const ref = refs[config.refKey as keyof AnimationRefs];
      if (!ref?.current) return;
      if (config.requiresLayout && !refs.layoutRef?.current) return;

      // Set initial state if needed (always for background)
      if (config.alwaysSetInitial && config.setInitial) {
        config.setInitial(ref.current as HTMLElement, characterId);
      }

      // Only animate if shouldStart is true
      if (!shouldStart) return;

      const tl = config.animate(ref.current as HTMLElement, characterId);
      timelines.push(tl);

      console.log(`${characterId} ${config.name} animation started`);
    });

    // Cleanup all timelines
    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, [characterId, shouldStart, refs]);
};