import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("src/index.ts");

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});
