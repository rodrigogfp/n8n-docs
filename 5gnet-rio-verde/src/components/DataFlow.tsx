import { interpolate, useCurrentFrame } from "remotion";

type Orientation = "horizontal" | "vertical";

export const DataFlow: React.FC<{
  x: number;
  y: number;
  length: number;
  orientation?: Orientation;
  color?: string;
  particles?: number;
  speed?: number;
  thickness?: number;
  particleSize?: number;
}> = ({
  x,
  y,
  length,
  orientation = "horizontal",
  color = "#22d3ee",
  particles = 4,
  speed = 90,
  thickness = 2,
  particleSize = 8,
}) => {
  const frame = useCurrentFrame();

  const isH = orientation === "horizontal";
  const trackStyle: React.CSSProperties = isH
    ? {
        left: x,
        top: y,
        width: length,
        height: thickness,
      }
    : {
        left: x,
        top: y,
        width: thickness,
        height: length,
      };

  return (
    <div
      className="absolute"
      style={{
        ...trackStyle,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(${isH ? "90deg" : "180deg"}, ${color}30, ${color}, ${color}30)`,
          boxShadow: `0 0 14px ${color}cc`,
          opacity: 0.6,
        }}
      />
      {Array.from({ length: particles }).map((_, i) => {
        const offset = (i / particles) * speed;
        const progress = ((frame + offset) % speed) / speed;
        const pos = interpolate(progress, [0, 1], [0, length]);
        const fade = Math.sin(progress * Math.PI);
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particleSize,
              height: particleSize,
              background: color,
              boxShadow: `0 0 18px ${color}, 0 0 30px ${color}`,
              opacity: fade,
              ...(isH
                ? {
                    left: pos - particleSize / 2,
                    top: thickness / 2 - particleSize / 2,
                  }
                : {
                    top: pos - particleSize / 2,
                    left: thickness / 2 - particleSize / 2,
                  }),
            }}
          />
        );
      })}
    </div>
  );
};
