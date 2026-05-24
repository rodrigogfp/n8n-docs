import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneLabel } from "../components/SceneLabel";
import { Caption } from "../components/Caption";

const NODES: { x: number; y: number }[] = [
  { x: 50, y: 50 },
  { x: 22, y: 28 },
  { x: 78, y: 26 },
  { x: 18, y: 70 },
  { x: 82, y: 72 },
  { x: 36, y: 14 },
  { x: 64, y: 14 },
  { x: 12, y: 50 },
  { x: 88, y: 50 },
  { x: 36, y: 86 },
  { x: 64, y: 86 },
];

export const SceneGlobal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const radius = 360;
  const cx = width / 2;
  const cy = height / 2 + 40;

  const ringSpin = (frame / fps) * 18;

  const drawIn = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 50,
  });

  return (
    <AbsoluteFill>
      <SceneLabel
        number="01"
        title="Rede Global"
        subtitle="Onde a internet começa: backbones de fibra cruzando continentes"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="globe-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#164e63" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="meridian" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx={cx} cy={cy} r={radius * 1.4} fill="url(#globe-core)" />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.7}
          fill="none"
          stroke="#a855f7"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI + (ringSpin * Math.PI) / 180;
          const rx = radius;
          const ry = radius * Math.abs(Math.cos(angle));
          return (
            <ellipse
              key={`mer-${i}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="url(#meridian)"
              strokeWidth="1"
              opacity={0.55}
              transform={`rotate(${(i * 22.5).toFixed(2)} ${cx} ${cy})`}
            />
          );
        })}

        {Array.from({ length: 4 }).map((_, i) => {
          const ry = radius * (0.25 + i * 0.2);
          return (
            <ellipse
              key={`par-${i}`}
              cx={cx}
              cy={cy}
              rx={radius}
              ry={ry}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              strokeDasharray="2 6"
            />
          );
        })}

        {NODES.map((a, i) =>
          NODES.slice(i + 1).map((b, j) => {
            const distSquared =
              Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
            if (distSquared > 1800) return null;
            const x1 = (a.x / 100) * width;
            const y1 = (a.y / 100) * height;
            const x2 = (b.x / 100) * width;
            const y2 = (b.y / 100) * height;
            const dashLen = Math.hypot(x2 - x1, y2 - y1);
            const offset = interpolate(drawIn, [0, 1], [dashLen, 0]);
            return (
              <line
                key={`l-${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#67e8f9"
                strokeOpacity="0.5"
                strokeWidth="1.2"
                strokeDasharray={dashLen}
                strokeDashoffset={offset}
              />
            );
          }),
        )}

        {NODES.map((n, i) => {
          const x = (n.x / 100) * width;
          const y = (n.y / 100) * height;
          const pulse = 0.5 + Math.sin((frame + i * 8) * 0.12) * 0.5;
          return (
            <g key={`n-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={10 + pulse * 12}
                fill="#22d3ee"
                opacity={0.15 + pulse * 0.15}
              />
              <circle
                cx={x}
                cy={y}
                r={5}
                fill="#67e8f9"
                style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
              />
            </g>
          );
        })}
      </svg>

      <Caption text="Tudo começa na rede global de fibra óptica que conecta o mundo." />
    </AbsoluteFill>
  );
};
