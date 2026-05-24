import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneLabel } from "../components/SceneLabel";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const cx = width / 2;
  const cy = height * 0.55;
  const radius = 280;

  const ringEnter = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 40,
  });
  const ringScale = interpolate(ringEnter, [0, 1], [0.6, 1]);

  const titleEnter = spring({
    fps,
    frame: frame - 70,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  const titleY = interpolate(titleEnter, [0, 1], [30, 0]);

  const tagEnter = spring({
    fps,
    frame: frame - 110,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const failoverPulse = (frame % 90) / 90;

  return (
    <AbsoluteFill>
      <SceneLabel
        number="05"
        title="Rede em Anel · Failover"
        subtitle="Caminho redundante com proteção contra falhas"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        <g transform={`translate(${cx},${cy}) scale(${ringScale})`}>
          <circle
            r={radius + 20}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.15"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            r={radius}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="3"
            style={{ filter: "drop-shadow(0 0 14px #22d3ee)" }}
          />
          <circle
            r={radius - 30}
            fill="none"
            stroke="#a855f7"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="6 14"
          />

          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(a) * radius;
            const py = Math.sin(a) * radius;
            const labels = ["NOC", "POP-N", "POP-S", "POP-L", "POP-O", "DC"];
            return (
              <g key={i} transform={`translate(${px},${py})`}>
                <circle
                  r="14"
                  fill="#0f172a"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }}
                />
                <circle r="5" fill="#67e8f9" />
                <text
                  x="0"
                  y="-22"
                  textAnchor="middle"
                  fill="#a5f3fc"
                  fontSize="12"
                  fontFamily="monospace"
                  letterSpacing="2"
                >
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {Array.from({ length: 24 }).map((_, i) => {
            const t = ((frame * 1.5 + i * 15) % 360) / 360;
            const a = t * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(a) * radius;
            const py = Math.sin(a) * radius;
            return (
              <circle
                key={`particle-${i}`}
                cx={px}
                cy={py}
                r="4"
                fill="#67e8f9"
                opacity={0.7}
                style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
              />
            );
          })}

          {Array.from({ length: 18 }).map((_, i) => {
            const t = ((frame * 1.1 + i * 20 + 180) % 360) / 360;
            const a = -t * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(a) * (radius - 30);
            const py = Math.sin(a) * (radius - 30);
            return (
              <circle
                key={`particle-r-${i}`}
                cx={px}
                cy={py}
                r="3"
                fill="#f0abfc"
                opacity={0.55}
                style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
              />
            );
          })}

          <circle
            r={20 + failoverPulse * 240}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            opacity={1 - failoverPulse}
          />
        </g>
      </svg>

      <div
        className="absolute left-0 right-0 flex flex-col items-center"
        style={{
          top: height * 0.78,
          opacity: titleEnter,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div className="font-mono text-sm tracking-[0.5em] uppercase text-fuchsia-400">
          5gnet · Rio Verde
        </div>
        <div className="mt-3 text-6xl font-semibold text-white drop-shadow-[0_0_24px_rgba(34,211,238,0.7)]">
          Conexão de verdade.
        </div>
        <div
          className="mt-4 text-xl text-cyan-200/80"
          style={{ opacity: tagEnter }}
        >
          Não vendemos só velocidade. Construímos infraestrutura.
        </div>
      </div>
    </AbsoluteFill>
  );
};
