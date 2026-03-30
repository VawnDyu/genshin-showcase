export interface AnimationConfig {
  initial: {
    x: number;
    y: number;
    scale: number;
    opacity?: number;
    rotate?: number;
  };
  step1: {
    x: number;
    y: number;
    scale?: number;
    opacity?: number;
    rotate?: number;
  };
  step2: {
    x: number;
    y: number;
    scale?: number;
    opacity?: number;
    rotate?: number;
  };
  delays?: {
    step1?: number;
    step2?: number;
  };
  durations?: {
    step1?: number;
    step2?: number;
  };
  transformOrigin?: string;
}

export interface CharacterAnimations {
  background: AnimationConfig;
  character: AnimationConfig;
  header: AnimationConfig;
  subheader: AnimationConfig;
  backtext1: AnimationConfig;
  backtext2: AnimationConfig;
}

export const animationConfigs: Record<string, CharacterAnimations> = {
  keqing: {
    background: {
      initial: { x: -720, y: -405, scale: 1.75 },
      step1: { x: 720, y: 405 },
      step2: { x: 0, y: 0, scale: 1 },
      delays: { step2: 0.5 },
      durations: { step1: 1, step2: 0.6 },
      transformOrigin: "center center",
    },
    character: {
      initial: { x: 0, y: 0, scale: 1.02 },
      step1: { x: 0, y: -1153, scale: 1.33 },
      step2: { x: 0, y: -1080, scale: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    header: {
      initial: { x: 600, y: -700, scale: 0.1, opacity: 0 },
      step1: { x: 600, y: -700, scale: 0.1, opacity: 0 },
      step2: { x: -300, y: -720, scale: 0.31, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    subheader: {
      initial: { x: -600, y: -700, scale: 0.35, opacity: 0 },
      step1: { x: -600, y: -700, scale: 0.35, opacity: 0 },
      step2: { x: 360, y: -800, scale: 0.24, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext1: {
      initial: { x: -325, y: -2160, scale: 0.54, opacity: 1 },
      step1: { x: -325, y: 0, scale: 0.54, opacity: 0 },
      step2: { x: -325, y: -1080, scale: 0.54, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext2: {
      initial: { x: 325, y: 0, scale: 0.54, opacity: 1 },
      step1: { x: 325, y: -2160, scale: 0.54, opacity: 0 },
      step2: { x: 325, y: -1080, scale: 0.54, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
  },

  citlali: {
    background: {
      initial: { x: 720, y: 405, scale: 1.75 },
      step1: { x: -720, y: -405 },
      step2: { x: 0, y: 0, scale: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 1 },
      transformOrigin: "center center",
    },
    character: {
      initial: { x: 60, y: -1080, scale: 1.05, opacity: 0 },
      step1: { x: 60, y: -1080, scale: 1.5, opacity: 1 },
      step2: { x: 60, y: -1080, scale: 1.05, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    header: {
      initial: { x: -240, y: -825, scale: 0.3, opacity: 0 },
      step1: { x: -240, y: -825, scale: 0.35, opacity: 0 },
      step2: { x: -240, y: -825, scale: 0.3, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    subheader: {
      initial: { x: -240, y: -705, scale: 0.25, opacity: 0 },
      step1: { x: -240, y: -705, scale: 0.30, opacity: 0 },
      step2: { x: -240, y: -705, scale: 0.25, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext1: {
      initial: { x: -350, y: -1080, scale: 0.35, opacity: 0 },
      step1: { x: -350, y: -1080, scale: 0.40, opacity: 0 },
      step2: { x: -350, y: -1080, scale: 0.35, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext2: {
      initial: { x: 350, y: -1080, scale: 0.35, opacity: 0 },
      step1: { x: 350, y: -1080, scale: 0.40, opacity: 0 },
      step2: { x: 350, y: -1080, scale: 0.35, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
  },

  chiori: {
    background: {
      initial: { x: -720, y: -405, scale: 1.75 },
      step1: { x: 720, y: 405 },
      step2: { x: 0, y: 0, scale: 1 },
      delays: { step2: 0.5 },
      durations: { step1: 1, step2: 0.6 },
      transformOrigin: "center center",
    },
    character: {
      initial: { x: 0, y: 0, scale: 1.02 },
      step1: { x: 0, y: -1153, scale: 1.33 },
      step2: { x: 0, y: -1080, scale: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    header: {
      initial: { x: 600, y: -700, scale: 0.1, opacity: 0 },
      step1: { x: 600, y: -700, scale: 0.1, opacity: 0 },
      step2: { x: -300, y: -720, scale: 0.31, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    subheader: {
      initial: { x: -600, y: -700, scale: 0.35, opacity: 0 },
      step1: { x: -600, y: -700, scale: 0.35, opacity: 0 },
      step2: { x: 360, y: -800, scale: 0.24, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext1: {
      initial: { x: -325, y: -2160, scale: 0.54, opacity: 1 },
      step1: { x: -325, y: 0, scale: 0.54, opacity: 0 },
      step2: { x: -325, y: -1080, scale: 0.54, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext2: {
      initial: { x: 325, y: 0, scale: 0.54, opacity: 1 },
      step1: { x: 325, y: -2160, scale: 0.54, opacity: 0 },
      step2: { x: 325, y: -1080, scale: 0.54, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
  },

  skirk: {
    background: {
      initial: { x: 720, y: 405, scale: 1.75 },
      step1: { x: -720, y: -405 },
      step2: { x: 0, y: 0, scale: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 1 },
      transformOrigin: "center center",
    },
    character: {
      initial: { x: 60, y: -1080, scale: 1.05, opacity: 0 },
      step1: { x: 60, y: -1080, scale: 1.5, opacity: 1 },
      step2: { x: 60, y: -1080, scale: 1.05, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    header: {
      initial: { x: -240, y: -825, scale: 0.3, opacity: 0 },
      step1: { x: -240, y: -825, scale: 0.35, opacity: 0 },
      step2: { x: -240, y: -825, scale: 0.2, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    subheader: {
      initial: { x: -240, y: -705, scale: 0.25, opacity: 0 },
      step1: { x: -240, y: -705, scale: 0.30, opacity: 0 },
      step2: { x: -240, y: -705, scale: 0.15, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext1: {
      initial: { x: -350, y: -1080, scale: 0.35, opacity: 0 },
      step1: { x: -350, y: -1080, scale: 0.40, opacity: 0 },
      step2: { x: -350, y: -1080, scale: 0.35, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
    backtext2: {
      initial: { x: 350, y: -1080, scale: 0.35, opacity: 0 },
      step1: { x: 350, y: -1080, scale: 0.40, opacity: 0 },
      step2: { x: 350, y: -1080, scale: 0.35, opacity: 1 },
      delays: { step1: 0.1, step2: 0.3 },
      durations: { step1: 1, step2: 0.8 },
      transformOrigin: "center center",
    },
  },

  // To add a new character, just copy this template and fill in values:
  // chiori: {
  //   background: { ... },
  //   character: { ... },
  //   header: { ... },
  //   subheader: { ... },
  //   backtext1: { ... },
  //   backtext2: { ... },
  // },
};