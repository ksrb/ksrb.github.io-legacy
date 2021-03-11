import {
  Build,
  Code,
  Storage,
  SvgIconComponent,
  Web,
} from "@material-ui/icons";
import gsap from "gsap";
import { cache } from "src/graphql";
import uses from "src/graphql/data/uses";
import typenames from "src/graphql/typenames";
import theme from "src/theme";

type TweenVars = gsap.TweenVars;

export const meterSkillTweenVars: TweenVars = {
  height: 0,
  paddingBottom: 0,
  duration: 0.3,
  ease: "power1",
};
export const meterNodeTweenVars: TweenVars = {
  height: 0,
  width: 0,
  duration: 0.3,
  ease: "power1",
};
export const meterEdgeTweenVars = {
  flexBasis: 0,
  duration: 0.1,
  ease: "power1",
};
export const autoCompleteTweenVars = {
  flexBasis: 0,
  duration: 0.5,
  ease: "power1",
  overflow: "hidden",
};
type ToggleType = {
  logo: SvgIconComponent;
  title: string;
  value: any;
  className: string;
  color: string;
};

export const usesFrontendIdentity = cache.identify(uses.Frontend)!;
export const usesBackendIdentity = cache.identify(uses.Backend)!;
export const usesBuildIdentity = cache.identify(uses.Build)!;

const { primaryColor, trinaryColor, secondaryColor, languagesColor } = theme;

export const toggleMap: { [key: string]: ToggleType } = {
  [typenames.Language]: {
    logo: Code,
    title: "Languages",
    value: typenames.Language,
    className: "meterRootContent__languages",
    color: languagesColor,
  },
  [usesFrontendIdentity]: {
    logo: Web,
    title: "Frontend",
    value: usesFrontendIdentity,
    className: "meterRootContent__frontend",
    color: primaryColor,
  },
  [usesBackendIdentity]: {
    logo: Storage,
    title: "Backend",
    value: usesBackendIdentity,
    className: "meterRootContent__backend",
    color: secondaryColor,
  },
  [usesBuildIdentity]: {
    logo: Build,
    title: "Build",
    value: usesBuildIdentity,
    className: "meterRootContent__build",
    color: trinaryColor,
  },
};

export const toggleMapValues = Object.values(toggleMap);
