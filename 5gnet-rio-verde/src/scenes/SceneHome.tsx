import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneLabel } from "../components/SceneLabel";
import { Caption } from "../components/Caption";

const TVIcon: React.FC<{ x: number; y: number; delay: number }> = ({
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  return (
    <g opacity={enter} transform={`translate(${x},${y}) scale(${enter})`}>
      <rect
        x="-60"
        y="-40"
        width="120"
        height="80"
        rx="8"
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 12px #22d3ee)" }}
      />
      <rect
        x="-52"
        y="-32"
        width="104"
        height="64"
        rx="4"
        fill="url(#tv-glow)"
      />
      <rect x="-15" y="42" width="30" height="4" rx="2" fill="#22d3ee" />
    </g>
  );
};

const PhoneIcon: React.FC<{ x: number; y: number; delay: number }> = ({
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  return (
    <g opacity={enter} transform={`translate(${x},${y}) scale(${enter})`}>
      <rect
        x="-26"
        y="-50"
        width="52"
        height="100"
        rx="10"
        fill="#0f172a"
        stroke="#a855f7"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 12px #a855f7)" }}
      />
      <rect
        x="-20"
        y="-40"
        width="40"
        height="74"
        rx="3"
        fill="url(#phone-glow)"
      />
      <circle cx="0" cy="42" r="4" fill="#a855f7" />
    </g>
  );
};

const LaptopIcon: React.FC<{ x: number; y: number; delay: number }> = ({
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  return (
    <g opacity={enter} transform={`translate(${x},${y}) scale(${enter})`}>
      <path
        d="M -55 -32 L 55 -32 L 55 28 L -55 28 Z"
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }}
      />
      <rect
        x="-48"
        y="-26"
        width="96"
        height="48"
        rx="2"
        fill="url(#tv-glow)"
      />
      <rect x="-70" y="28" width="140" height="6" rx="2" fill="#1e293b" />
    </g>
  );
};

const RouterIcon: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 22,
  });
  const blink = Math.sin(frame * 0.25) > 0;
  return (
    <g opacity={enter} transform={`translate(${x},${y}) scale(${enter})`}>
      <rect
        x="-90"
        y="-30"
        width="180"
        height="60"
        rx="10"
        fill="#0f172a"
        stroke="#a855f7"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 18px #a855f7)" }}
      />
      <rect x="-80" y="-22" width="160" height="44" rx="6" fill="#1e1b4b" />
      <line
        x1="-30"
        y1="-30"
        x2="-30"
        y2="-58"
        stroke="#22d3ee"
        strokeWidth="3"
      />
      <line
        x1="0"
        y1="-30"
        x2="0"
        y2="-66"
        stroke="#22d3ee"
        strokeWidth="3"
      />
      <line
        x1="30"
        y1="-30"
        x2="30"
        y2="-58"
        stroke="#22d3ee"
        strokeWidth="3"
      />
      <circle cx="-30" cy="-62" r="4" fill="#22d3ee" />
      <circle cx="0" cy="-70" r="4" fill="#22d3ee" />
      <circle cx="30" cy="-62" r="4" fill="#22d3ee" />
      {Array.from({ length: 5 }).map((_, i) => (
        <circle
          key={i}
          cx={-50 + i * 25}
          cy="0"
          r="3"
          fill={blink && i % 2 === 0 ? "#22d3ee" : "#67e8f9"}
          opacity="0.9"
          style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }}
        />
      ))}
    </g>
  );
};

export const SceneHome: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const routerX = width * 0.5;
  const routerY = height * 0.62;

  return (
    <AbsoluteFill>
      <SceneLabel
        number="04"
        title="Casa do Cliente"
        subtitle="ONU + Wi-Fi de alta performance para todos os dispositivos"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="tv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="phone-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        <path
          d={`M ${width * 0.22} ${routerY} L ${routerX - 95} ${routerY}`}
          stroke="#22d3ee"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 6"
          opacity="0.6"
        />
        <text
          x={width * 0.18}
          y={routerY + 30}
          fill="#67e8f9"
          fontSize="13"
          fontFamily="monospace"
          letterSpacing="2"
        >
          ONU → Wi-Fi
        </text>

        <g>
          <rect
            x={width * 0.18}
            y={routerY - 40}
            width="80"
            height="80"
            rx="10"
            fill="#0f172a"
            stroke="#22d3ee"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 12px #22d3ee)" }}
          />
          <text
            x={width * 0.18 + 40}
            y={routerY + 5}
            textAnchor="middle"
            fill="#67e8f9"
            fontSize="14"
            fontFamily="monospace"
            letterSpacing="2"
          >
            ONU
          </text>
          <circle
            cx={width * 0.18 + 14}
            cy={routerY - 22}
            r="3"
            fill="#22d3ee"
            style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}
          />
        </g>

        {[1, 2, 3, 4].map((i) => {
          const period = 90;
          const t = ((frame + i * 22) % period) / period;
          const r = interpolate(t, [0, 1], [40, 380]);
          const op = interpolate(t, [0, 1], [0.6, 0]);
          return (
            <circle
              key={i}
              cx={routerX}
              cy={routerY}
              r={r}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              opacity={op}
            />
          );
        })}
        {[1, 2, 3].map((i) => {
          const period = 90;
          const t = ((frame + i * 30 + 45) % period) / period;
          const r = interpolate(t, [0, 1], [40, 380]);
          const op = interpolate(t, [0, 1], [0.5, 0]);
          return (
            <circle
              key={`p-${i}`}
              cx={routerX}
              cy={routerY}
              r={r}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              opacity={op}
            />
          );
        })}

        <RouterIcon x={routerX} y={routerY} />
        <TVIcon x={width * 0.32} y={height * 0.32} delay={20} />
        <PhoneIcon x={width * 0.68} y={height * 0.3} delay={28} />
        <LaptopIcon x={width * 0.76} y={height * 0.6} delay={36} />
      </svg>

      <Caption text="A ONU converte luz em dados; o roteador entrega Wi-Fi perfeito em toda a casa." />
    </AbsoluteFill>
  );
};
