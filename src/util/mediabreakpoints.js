import { useMediaPredicate } from "react-media-hook";

export const use960Breakpoint = () => {
  return useMediaPredicate("(min-width:960px)");
};
