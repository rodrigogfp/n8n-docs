import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneLabel } from "../components/SceneLabel";
import { Caption } from "../components/Caption";

const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: string;
  delay?: number;
}> = ({ x, y, w, h, label, accent = "#22d3ee", delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  const scale = interpolate(enter, [0, 1], [0.7, 1]);

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        opacity: enter,
        transform: `scale(${scale})`,
      }}
    >
      <div
        className="absolute inset-0 rounded-lg border bg-slate-900/70 backdrop-blur-sm"
        style={{
          borderColor: `${accent}80`,
          boxShadow: `0 0 24px ${accent}50, inset 0 0 16px ${accent}20`,
        }}
      />
      <div
        className="relative font-mono text-xs tracking-[0.25em] uppercase"
        style={{ color: accent, textShadow: `0 0 8px ${accent}` }}
      >
        {label}
      </div>
    </div>
  );
};

export const SceneDistribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const draw = spring({
    fps,
    frame: frame - 18,
    config: { damping: 200 },
    durationInFrames: 50,
  });
  const drawSplit = spring({
    fps,
    frame: frame - 50,
    config: { damping: 200 },
    durationInFrames: 50,
  });

  const oltX = width * 0.18;
  const oltY = height * 0.55;
  const splitterX = width * 0.5;
  const splitterY = height * 0.55;

  const homes: { x: number; y: number; delay: number }[] = [
    { x: width * 0.82, y: height * 0.18, delay: 80 },
    { x: width * 0.86, y: height * 0.36, delay: 86 },
    { x: width * 0.88, y: height * 0.55, delay: 92 },
    { x: width * 0.86, y: height * 0.74, delay: 98 },
    { x: width * 0.82, y: height * 0.9, delay: 104 },
  ];

  const trunkLen = 1500;
  const trunkOffset = interpolate(draw, [0, 1], [trunkLen, 0]);

  return (
    <AbsoluteFill>
      <SceneLabel
        number="03"
        title="Distribuição Óptica"
        subtitle="OLT → splitters → última milha"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="branch" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <path
          d={`M ${oltX + 80} ${oltY} L ${splitterX - 40} ${splitterY}`}
          stroke="url(#trunk)"
          strokeWidth="4"
          fill="none"
          strokeDasharray={trunkLen}
          strokeDashoffset={trunkOffset}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
        />

        {homes.map((h, i) => {
          const path = `M ${splitterX + 40} ${splitterY} C ${splitterX + 200} ${splitterY}, ${h.x - 200} ${h.y}, ${h.x - 30} ${h.y}`;
          const len = 900;
          const off = interpolate(drawSplit, [0, 1], [len, 0]);
          return (
            <path
              key={i}
              d={path}
              stroke="url(#branch)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={len}
              strokeDashoffset={off}
              strokeLinecap="round"
              opacity="0.9"
              style={{ filter: "drop-shadow(0 0 4px #a855f7)" }}
            />
          );
        })}

        <g>
          {Array.from({ length: 14 }).map((_, i) => {
            const t = ((frame * 4 + i * 28) % 280) / 280;
            const x = interpolate(t, [0, 1], [oltX + 80, splitterX - 40]);
            const y = oltY + Math.sin(t * Math.PI * 2 + i) * 1.5;
            return (
              <circle
                key={`p-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="#67e8f9"
                opacity={Math.sin(t * Math.PI)}
                style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}
              />
            );
          })}
        </g>

        {homes.map((h, i) => {
          const t = ((frame * 3 + i * 50) % 240) / 240;
          const startX = splitterX + 40;
          const startY = splitterY;
          const endX = h.x - 30;
          const endY = h.y;
          const cpx1 = splitterX + 200;
          const cpx2 = h.x - 200;
          const px =
            Math.pow(1 - t, 3) * startX +
            3 * Math.pow(1 - t, 2) * t * cpx1 +
            3 * (1 - t) * Math.pow(t, 2) * cpx2 +
            Math.pow(t, 3) * endX;
          const py =
            Math.pow(1 - t, 3) * startY +
            3 * Math.pow(1 - t, 2) * t * startY +
            3 * (1 - t) * Math.pow(t, 2) * endY +
            Math.pow(t, 3) * endY;
          return (
            <circle
              key={`bp-${i}`}
              cx={px}
              cy={py}
              r="3"
              fill="#f0abfc"
              opacity={Math.sin(t * Math.PI)}
              style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
            />
          );
        })}
      </svg>

      <Box
        x={oltX}
        y={oltY}
        w={160}
        h={80}
        label="OLT"
        accent="#22d3ee"
        delay={5}
      />

      <Box
        x={splitterX}
        y={splitterY}
        w={120}
        h={80}
        label="1×8 Splitter"
        accent="#a855f7"
        delay={45}
      />

      {homes.map((h, i) => (
        <Box
          key={i}
          x={h.x}
          y={h.y}
          w={70}
          h={50}
          label={`ONU ${String(i + 1).padStart(2, "0")}`}
          accent="#22d3ee"
          delay={h.delay}
        />
      ))}

      <Caption text="A OLT dispara feixes de luz que se ramificam pela cidade até cada cliente." />
    </AbsoluteFill>
  );
};
