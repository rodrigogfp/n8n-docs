import { AbsoluteFill, useCurrentFrame } from "remotion";

export const GridBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.3) % 80;

  return (
    <AbsoluteFill className="pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `${drift}px ${drift}px`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,23,42,0) 0%, rgba(2,6,23,0.85) 70%, rgba(2,6,23,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.35), transparent 45%)",
        }}
      />
    </AbsoluteFill>
  );
};
