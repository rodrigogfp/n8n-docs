import { Composition } from "remotion";
import { FivegnetVideo } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FivegnetVideo"
      component={FivegnetVideo}
      durationInFrames={1350}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
