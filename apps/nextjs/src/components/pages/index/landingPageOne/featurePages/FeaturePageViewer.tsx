import { useRef } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import { useScroll } from "framer-motion";

import { FeaturePageOne } from "./FeaturePageOne";
import { FeaturePageThree } from "./FeaturePageThree";
import { FeaturePageTwo } from "./FeaturePageTwo";

export const FeaturePageViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const homePageOneRef = useRef<HTMLDivElement>(null);
  const homePageTwoRef = useRef<HTMLDivElement>(null);
  const homePageThreeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: pageOneProgress } = useScroll({
    target: homePageOneRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageTwoProgress } = useScroll({
    target: homePageTwoRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageThreeProgress } = useScroll({
    target: homePageThreeRef,
    offset: ["start end", "center start"],
  });

  return (
    <GridItem
      h="full"
      colSpan={{ base: "auto", lg: 5 }}
      bg="brandPrimary"
      ref={containerRef}
    >
      {/* Filler offset  */}
      <Box h="100vh" position={"fixed"} top={"0"}>
        <FeaturePageOne progress={pageOneProgress} />
      </Box>
      <Box
        h="100vh"
        position={"fixed"}
        top={"0"}
        w={{ base: "full", lg: "unset" }}
      >
        <FeaturePageTwo progress={pageTwoProgress} />
      </Box>
      <Box h="100vh" position={"fixed"} top={"0"}>
        <FeaturePageThree progress={pageThreeProgress} />
      </Box>
      <Box h="100vh" />
      <Box h="200vh" ref={homePageOneRef} />
      <Box h="200vh" ref={homePageTwoRef} />
      <Box h="200vh" ref={homePageThreeRef} />]
    </GridItem>
  );
};
