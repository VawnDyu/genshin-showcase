import { gsap } from 'gsap';
import { animationConfigs, type AnimationConfig } from '../config/characterAnimations';

export const BASE_WIDTH = 1920;
export const BASE_HEIGHT = 1080;
export const BASE_ASPECT = BASE_WIDTH / BASE_HEIGHT;

/**
 * Get uniform scale factor for responsive animations
 */
const getUniformScale = (): number => {
  const scaleX = window.innerWidth / BASE_WIDTH;
  const scaleY = window.innerHeight / BASE_HEIGHT;
  return Math.min(scaleX, scaleY);
};

/**
 * Generic animation function that works for all elements
 */
export const createAnimation = (
  element: HTMLElement,
  config: AnimationConfig
) => {
  const scale = getUniformScale();

  // Helper to scale position values
  const scaleValue = (val: number) => val * scale;

  // Set initial state
  gsap.set(element, {
    x: scaleValue(config.initial.x),
    y: scaleValue(config.initial.y),
    scale: config.initial.scale,
    opacity: config.initial.opacity ?? 1,
    rotate: config.initial.rotate ?? 0,
    transformOrigin: config.transformOrigin ?? "center center",
  });

  const tl = gsap.timeline();

  // Step 1 animation
  tl.to(element, {
    delay: config.delays?.step1 ?? 0,
    x: scaleValue(config.step1.x),
    y: scaleValue(config.step1.y),
    scale: config.step1.scale ?? config.initial.scale,
    opacity: config.step1.opacity ?? 1,
    rotate: config.step1.rotate ?? config.initial.rotate ?? 0,
    duration: config.durations?.step1 ?? 1,
    ease: "power2.inOut",
  });

  // Step 2 animation
  tl.to(element, {
    delay: config.delays?.step2 ?? 0,
    x: scaleValue(config.step2.x),
    y: scaleValue(config.step2.y),
    scale: config.step2.scale ?? config.initial.scale,
    opacity: config.step2.opacity ?? 1,
    rotate: config.step2.rotate ?? config.initial.rotate ?? 0,
    duration: config.durations?.step2 ?? 0.8,
    ease: "power2.inOut",
  });

  return tl;
};

// Wrapper functions for each animation type
export const animateBackground = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.background;
  if (!config) {
    console.error(`No background animation config for character: ${characterId}`);
    return gsap.timeline(); // Return empty timeline
  }
  return createAnimation(element, config);
};

export const animateCharacter = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.character;
  if (!config) {
    console.error(`No character animation config for character: ${characterId}`);
    return gsap.timeline();
  }
  return createAnimation(element, config);
};

export const animateHeader = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.header;
  if (!config) {
    console.error(`No header animation config for character: ${characterId}`);
    return gsap.timeline();
  }
  return createAnimation(element, config);
};

export const animateSubheader = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.subheader;
  if (!config) {
    console.error(`No subheader animation config for character: ${characterId}`);
    return gsap.timeline();
  }
  return createAnimation(element, config);
};

export const animateBacktext1 = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.backtext1;
  if (!config) {
    console.error(`No backtext1 animation config for character: ${characterId}`);
    return gsap.timeline();
  }
  return createAnimation(element, config);
};

export const animateBacktext2 = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.backtext2;
  if (!config) {
    console.error(`No backtext2 animation config for character: ${characterId}`);
    return gsap.timeline();
  }
  return createAnimation(element, config);
};

// Initial state setters
export const setBackgroundInitialState = (element: HTMLElement, characterId: string) => {
  const config = animationConfigs[characterId]?.background;
  if (!config) return;

  const scale = getUniformScale();
  gsap.set(element, {
    scale: config.initial.scale,
    x: config.initial.x * scale,
    y: config.initial.y * scale,
    transformOrigin: config.transformOrigin ?? "center center",
  });
};

// Sidebar and TopBar animations (unchanged)
export const setSidebarInitialState = (sidebarElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = -200 * scale;
  gsap.set(sidebarElement, { x: slideDistance, opacity: 0 });
};

export const setTopBarInitialState = (topBarElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = -200 * scale;
  gsap.set(topBarElement, { y: slideDistance, opacity: 0 });
};

export const setDetailsButtonInitialState = (buttonElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = 200 * scale;

  gsap.set(buttonElement, {
    x: slideDistance,
    opacity: 0,
  });
};

export const animateDetailsButton = (buttonElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = 200 * scale;

  const tl = gsap.timeline();
  tl.to(buttonElement, {
    delay: 0.1,
    x: slideDistance,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  }).to(buttonElement, {
    delay: 0.5,
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  console.log('DetailsButton animation timeline created');

  return tl;
};

export const animateSidebarContainer = (sidebarElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = -200 * scale;

  const tl = gsap.timeline();
  tl.to(sidebarElement, {
    delay: 0.1,
    x: slideDistance,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  }).to(sidebarElement, {
    delay: 0.5,
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  return tl;
};

export const animateTopBarContainer = (topBarElement: HTMLElement) => {
  const scale = getUniformScale();
  const slideDistance = -200 * scale;

  const tl = gsap.timeline();
  tl.to(topBarElement, {
    delay: 0.1,
    y: slideDistance,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  }).to(topBarElement, {
    delay: 0.5,
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  return tl;
};