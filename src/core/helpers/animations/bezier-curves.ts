export type BezierCurve = [number, number, number, number];

const BEZIER_CURVES = {
  EASE: [0.25, 0.1, 0.25, 1] as BezierCurve,
  EASE_IN: [0.42, 0, 1, 1] as BezierCurve,
  EASE_OUT: [0, 0, 0.58, 1] as BezierCurve,
  EASE_IN_OUT: [0.42, 0, 0.58, 1] as BezierCurve,
  LINEAR: [0, 0, 1, 1] as BezierCurve,
  DEFAULT: [0.33, 0.04, 0.67, 0.37] as BezierCurve,
  CUSTOM: [0.17, 0.67, 0.83, 0.67] as BezierCurve,
  JUMP: [0.97, 0.67, 0.83, 1.27] as BezierCurve,
  BEZIERONE: [0.215, 0.61, 0.355, 1] as BezierCurve,
  BEZIERTWO: [0.215, 0.61, 0.355, 1] as BezierCurve,
} as const;

export default BEZIER_CURVES;

export const BezierShowcaseDuration = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000,
  2500, 3000,
];

export const ShowcaseCubicBeziers = [
  { name: "in-quad", bezier: [0.55, 0.085, 0.68, 0.53] },
  { name: "in-cubic", bezier: [0.55, 0.055, 0.675, 0.19] },
  { name: "in-quart", bezier: [0.895, 0.03, 0.685, 0.22] },
  { name: "in-quint", bezier: [0.755, 0.05, 0.855, 0.06] },
  { name: "in-expo", bezier: [0.95, 0.05, 0.795, 0.035] },
  { name: "in-circ", bezier: [0.6, 0.04, 0.98, 0.335] },
  { name: "out-quad", bezier: [0.25, 0.46, 0.45, 0.94] },
  { name: "out-cubic", bezier: [0.215, 0.61, 0.355, 1] },
  { name: "out-quart", bezier: [0.165, 0.84, 0.44, 1] },
  { name: "out-quint", bezier: [0.23, 1, 0.32, 1] },
  { name: "out-expo", bezier: [0.19, 1, 0.22, 1] },
  { name: "out-circ", bezier: [0.075, 0.82, 0.165, 1] },
  { name: "in-out-quad", bezier: [0.455, 0.03, 0.515, 0.955] },
  { name: "in-out-cubic", bezier: [0.645, 0.045, 0.355, 1] },
  { name: "in-out-quart", bezier: [0.77, 0, 0.175, 1] },
  { name: "in-out-quint", bezier: [0.86, 0, 0.07, 1] },
  { name: "in-out-expo", bezier: [1, 0, 0, 1] },
  { name: "in-out-circ", bezier: [0.785, 0.135, 0.15, 0.86] },
];
