import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SceneLabel: React.FC<{
  number: string;
  title: string;
  subtitle?: string;
}> = ({ number, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 20,
  });

  const lineWidth = interpolate(appear, [0, 1], [0, 220]);

  return (
    <div
      className="absolute left-16 top-16 text-cyan-300"
      style={{ opacity: appear }}
    >
      <div className="flex items-center gap-3 font-mono text-sm tracking-[0.4em] uppercase text-fuchsia-400">
        <span>// {number}</span>
        <div
          className="h-px bg-fuchsia-400"
          style={{ width: lineWidth, boxShadow: "0 0 10px #d946ef" }}
        />
      </div>
      <div className="mt-3 text-3xl font-semibold text-white drop-shadow-[0_0_18px_rgba(34,211,238,0.6)]">
        {title}
      </div>
      {subtitle ? (
        <div className="mt-1 text-base text-cyan-200/80 max-w-2xl">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
