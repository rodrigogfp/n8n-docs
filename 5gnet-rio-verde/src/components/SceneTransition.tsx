import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Direction = "zoom-in" | "zoom-out" | "slide-left" | "slide-up";

export const SceneTransition: React.FC<{
  direction?: Direction;
  children: React.ReactNode;
}> = ({ direction = "zoom-in", children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    fps,
    frame,
    config: { damping: 200, mass: 0.8 },
    durationInFrames: 25,
  });

  const exitWindow = 18;
  const exit = interpolate(
    frame,
    [durationInFrames - exitWindow, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  let translateX = 0;
  let translateY = 0;
  let scale = 1;
  let opacity = 1;

  if (direction === "zoom-in") {
    scale = interpolate(enter, [0, 1], [1.18, 1]);
    opacity = enter;
    scale *= interpolate(exit, [0, 1], [1, 0.92]);
    opacity *= 1 - exit;
  } else if (direction === "zoom-out") {
    scale = interpolate(enter, [0, 1], [0.86, 1]);
    opacity = enter;
    scale *= interpolate(exit, [0, 1], [1, 1.08]);
    opacity *= 1 - exit;
  } else if (direction === "slide-left") {
    translateX = interpolate(enter, [0, 1], [120, 0]);
    opacity = enter;
    translateX += interpolate(exit, [0, 1], [0, -120]);
    opacity *= 1 - exit;
  } else if (direction === "slide-up") {
    translateY = interpolate(enter, [0, 1], [80, 0]);
    opacity = enter;
    translateY += interpolate(exit, [0, 1], [0, -60]);
    opacity *= 1 - exit;
  }

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
