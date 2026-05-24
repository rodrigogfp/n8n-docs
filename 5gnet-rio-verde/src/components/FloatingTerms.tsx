import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

const TERMS: { text: string; x: number; y: number; size: number }[] = [
  { text: "BGP", x: 8, y: 14, size: 18 },
  { text: "VLAN", x: 86, y: 22, size: 16 },
  { text: "Sinal Óptico", x: 75, y: 88, size: 17 },
  { text: "Failover", x: 6, y: 78, size: 16 },
  { text: "MPLS", x: 50, y: 6, size: 14 },
  { text: "GPON", x: 90, y: 55, size: 15 },
  { text: "λ 1490 nm", x: 12, y: 46, size: 14 },
  { text: "Anel Óptico", x: 60, y: 92, size: 14 },
];

export const FloatingTerms: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill className="pointer-events-none select-none">
      {TERMS.map((t, i) => {
        const phase = (frame + i * 60) * 0.012;
        const driftY = Math.sin(phase) * 12;
        const driftX = Math.cos(phase * 0.6) * 10;
        const glow = 0.45 + Math.sin(phase * 1.4) * 0.15;
        return (
          <div
            key={t.text}
            className="absolute font-mono tracking-[0.3em] uppercase"
            style={{
              left: (t.x / 100) * width + driftX,
              top: (t.y / 100) * height + driftY,
              fontSize: t.size,
              color: i % 2 === 0 ? "#67e8f9" : "#e9d5ff",
              opacity: glow,
              textShadow: `0 0 12px ${i % 2 === 0 ? "#22d3ee" : "#a855f7"}`,
            }}
          >
            {t.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
