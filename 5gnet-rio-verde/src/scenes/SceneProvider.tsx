import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneLabel } from "../components/SceneLabel";
import { Caption } from "../components/Caption";
import { DataFlow } from "../components/DataFlow";

const Rack: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sub?: string;
  units?: number;
  delay?: number;
  accent?: string;
}> = ({
  x,
  y,
  width,
  height,
  label,
  sub,
  units = 6,
  delay = 0,
  accent = "#22d3ee",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  const ty = interpolate(enter, [0, 1], [22, 0]);

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width,
        height,
        opacity: enter,
        transform: `translateY(${ty}px)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl border bg-slate-900/60 backdrop-blur-sm"
        style={{
          borderColor: `${accent}55`,
          boxShadow: `0 0 30px ${accent}30, inset 0 0 20px ${accent}15`,
        }}
      />
      <div
        className="absolute -top-7 left-3 font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: accent, textShadow: `0 0 10px ${accent}` }}
      >
        {label}
      </div>
      <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
        {Array.from({ length: units }).map((_, i) => {
          const blink = Math.sin((frame + i * 17 + delay) * 0.18) > 0.6;
          return (
            <div
              key={i}
              className="flex-1 rounded-md border flex items-center px-3 gap-2"
              style={{
                borderColor: `${accent}30`,
                background: "rgba(15,23,42,0.65)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: blink ? accent : "#1e293b",
                  boxShadow: blink ? `0 0 8px ${accent}` : "none",
                }}
              />
              <div
                className="h-1 flex-1 rounded-full"
                style={{ background: `${accent}25` }}
              />
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  background: `${accent}40`,
                  border: `1px solid ${accent}60`,
                }}
              />
            </div>
          );
        })}
      </div>
      {sub ? (
        <div
          className="absolute -bottom-6 left-3 right-3 font-mono text-[11px] tracking-widest uppercase text-cyan-200/70"
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

export const SceneProvider: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const drawCables = spring({
    fps,
    frame: frame - 20,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const totalLen = 2400;
  const offset = interpolate(drawCables, [0, 1], [totalLen, 0]);

  return (
    <AbsoluteFill>
      <SceneLabel
        number="02"
        title="Provedor 5gnet — NOC"
        subtitle="Roteador de borda + switches de distribuição"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="cable" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        <path
          d={`M ${width * 0.07} ${height * 0.5} L ${width * 0.27} ${height * 0.5}`}
          stroke="url(#cable)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={totalLen}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}
        />
        <path
          d={`M ${width * 0.41} ${height * 0.5} L ${width * 0.55} ${height * 0.5}`}
          stroke="url(#cable)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={totalLen}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
        />
        <path
          d={`M ${width * 0.69} ${height * 0.5} C ${width * 0.78} ${height * 0.5}, ${width * 0.78} ${height * 0.3}, ${width * 0.86} ${height * 0.3}`}
          stroke="url(#cable)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={totalLen}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <path
          d={`M ${width * 0.69} ${height * 0.5} C ${width * 0.78} ${height * 0.5}, ${width * 0.78} ${height * 0.7}, ${width * 0.86} ${height * 0.7}`}
          stroke="url(#cable)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={totalLen}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />

        <text
          x={width * 0.04}
          y={height * 0.48}
          fill="#67e8f9"
          fontSize="14"
          fontFamily="monospace"
          letterSpacing="2"
        >
          UPLINK
        </text>
      </svg>

      <DataFlow
        x={width * 0.07}
        y={height * 0.5 - 1}
        length={width * 0.2}
        color="#22d3ee"
        particles={3}
        speed={70}
      />
      <DataFlow
        x={width * 0.41}
        y={height * 0.5 - 1}
        length={width * 0.14}
        color="#a855f7"
        particles={3}
        speed={60}
      />

      <Rack
        x={width * 0.27}
        y={height * 0.32}
        width={width * 0.14}
        height={height * 0.36}
        label="Roteador de Borda"
        sub="BGP · Peering"
        units={6}
        delay={6}
        accent="#22d3ee"
      />

      <Rack
        x={width * 0.55}
        y={height * 0.32}
        width={width * 0.14}
        height={height * 0.36}
        label="Switch Core"
        sub="VLAN · QoS"
        units={6}
        delay={18}
        accent="#a855f7"
      />

      <Rack
        x={width * 0.86 - 60}
        y={height * 0.3 - 50}
        width={140}
        height={100}
        label="Distrib. A"
        units={3}
        delay={32}
        accent="#22d3ee"
      />

      <Rack
        x={width * 0.86 - 60}
        y={height * 0.7 - 50}
        width={140}
        height={100}
        label="Distrib. B"
        units={3}
        delay={36}
        accent="#a855f7"
      />

      <Caption text="Aqui o sinal entra na 5gnet: roteamento de borda e distribuição em altíssima velocidade." />
    </AbsoluteFill>
  );
};
