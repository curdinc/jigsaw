import Image from "next/image";
import { Grid, GridItem } from "@chakra-ui/react";
import { useTransform, type MotionValue } from "framer-motion";

import IphoneImage from "../../../public/homepage/phone.svg";
import { MotionBox } from "../motion/MotionBox";
import { MotionHeading } from "../motion/MotionHeading";

export function HomePageTwo({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);

  return (
    <Grid
      h="full"
      p={{ base: 6, lg: "16" }}
      templateColumns={{ base: "1", xl: "repeat(5, 1fr)" }}
      templateRows={{ base: "auto", xl: "1fr" }}
    >
      <GridItem colSpan={{ base: 1, xl: 2 }} alignSelf={"center"}>
        <MotionHeading
          textAlign={{ base: "center", xl: "left" }}
          lineHeight={{ base: "10", lg: "1.2em", xl: "1.5em" }}
          fontSize={{ base: "4xl", lg: "6xl", xl: "5xl" }}
          fontWeight={"bold"}
          style={{
            opacity,
          }}
          mt={{ base: 2, lg: "unset" }}
        >
          Eliminate planning anxiety once and for all
        </MotionHeading>
      </GridItem>
      <GridItem
        alignSelf={"center"}
        justifySelf={"center"}
        colSpan={{ base: 1, xl: 3 }}
      >
        <MotionBox
          mt={{ base: 14, xl: 0 }}
          w={{ base: "64", lg: 80, xl: "full" }}
          borderRadius={"xl"}
          overflow={"hidden"}
          style={{
            opacity,
          }}
        >
          <Image src={IphoneImage} alt="phone app" />
        </MotionBox>
      </GridItem>
    </Grid>
  );
}
