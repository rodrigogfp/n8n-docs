import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 22,
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = enter * (1 - exit);
  const translateY = interpolate(enter, [0, 1], [16, 0]);

  return (
    <div
      className="absolute left-1/2 bottom-20 -translate-x-1/2"
      style={{ opacity, transform: `translate(-50%, ${translateY}px)` }}
    >
      <div className="px-8 py-4 rounded-2xl border border-cyan-400/30 bg-slate-900/70 backdrop-blur-sm shadow-[0_0_40px_rgba(34,211,238,0.15)]">
        <p className="text-center text-2xl text-cyan-50 leading-relaxed max-w-4xl">
          {text}
        </p>
      </div>
    </div>
  );
};
