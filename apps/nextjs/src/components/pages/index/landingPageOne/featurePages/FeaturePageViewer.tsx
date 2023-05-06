import { useRef } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import { useScroll } from "framer-motion";

import { FeaturePageOne } from "./FeaturePageOne";
import { FeaturePageThree } from "./FeaturePageThree";
import { FeaturePageTwo } from "./FeaturePageTwo";
import { ScrollMore } from "./ScrollMore";

export const FeaturePageViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollMoreRef = useRef<HTMLDivElement>(null);
  const featurePageOneRef = useRef<HTMLDivElement>(null);
  const featurePageTwoRef = useRef<HTMLDivElement>(null);
  const featurePageThreeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollMoreProgress } = useScroll({
    target: scrollMoreRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageOneProgress } = useScroll({
    target: featurePageOneRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageTwoProgress } = useScroll({
    target: featurePageTwoRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageThreeProgress } = useScroll({
    target: featurePageThreeRef,
    offset: ["start end", "center start"],
  });

  return (
    <GridItem
      h="full"
      colSpan={{ base: "auto", lg: 5 }}
      bg="brandPrimary"
      ref={containerRef}
    >
      <Box
        h="100vh"
        position={"fixed"}
        top={"0"}
        w="42%"
        display={{
          base: "none",
          lg: "block",
        }}
      >
        <ScrollMore progress={scrollMoreProgress} />
      </Box>
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
      <Box h={{ base: "100vh", lg: "150vh" }} ref={scrollMoreRef} />
      <Box h="200vh" ref={featurePageOneRef} />
      <Box h="200vh" ref={featurePageTwoRef} />
      <Box h="200vh" ref={featurePageThreeRef} />
    </GridItem>
  );
};
