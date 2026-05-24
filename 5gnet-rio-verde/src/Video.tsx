import { AbsoluteFill, Sequence } from "remotion";
import { SceneGlobal } from "./scenes/SceneGlobal";
import { SceneProvider } from "./scenes/SceneProvider";
import { SceneDistribution } from "./scenes/SceneDistribution";
import { SceneHome } from "./scenes/SceneHome";
import { SceneOutro } from "./scenes/SceneOutro";
import { GridBackdrop } from "./components/GridBackdrop";
import { FloatingTerms } from "./components/FloatingTerms";
import { SceneTransition } from "./components/SceneTransition";

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

export const FivegnetVideo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-950 font-sans overflow-hidden">
      <GridBackdrop />
      <FloatingTerms />

      <Sequence from={s(0)} durationInFrames={s(7)} name="01-Global">
        <SceneTransition direction="zoom-in">
          <SceneGlobal />
        </SceneTransition>
      </Sequence>

      <Sequence from={s(7)} durationInFrames={s(8)} name="02-Provider">
        <SceneTransition direction="slide-left">
          <SceneProvider />
        </SceneTransition>
      </Sequence>

      <Sequence from={s(15)} durationInFrames={s(9)} name="03-Distribution">
        <SceneTransition direction="slide-left">
          <SceneDistribution />
        </SceneTransition>
      </Sequence>

      <Sequence from={s(24)} durationInFrames={s(10)} name="04-Home">
        <SceneTransition direction="slide-up">
          <SceneHome />
        </SceneTransition>
      </Sequence>

      <Sequence from={s(34)} durationInFrames={s(11)} name="05-Outro">
        <SceneTransition direction="zoom-out">
          <SceneOutro />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
