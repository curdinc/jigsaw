import Image from "next/image";
import { Stack } from "@chakra-ui/react";
import { useTransform, type MotionValue } from "framer-motion";

import { MotionBox } from "~/components/motion/MotionBox";
import { MotionHeading } from "~/components/motion/MotionHeading";
import IphoneImage from "~/../public/homepage/phone.svg";

export function FeaturePageTwo({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

  return (
    <>
      <Stack
        p={{ base: 8, xl: 12 }}
        direction={{ base: "column", xl: "row" }}
        h="full"
        w="full"
        alignItems={"center"}
        gap={"8"}
      >
        <MotionHeading
          textAlign={{ base: "center", xl: "left" }}
          lineHeight={{ base: "10", lg: "1.2em", xl: "1.5em" }}
          fontSize={{ base: "4xl", lg: "6xl", xl: "5xl" }}
          fontWeight={"bold"}
          style={{
            opacity,
          }}
          mt={{ base: 2, lg: "unset" }}
          w={{ base: "full", xl: "64" }}
          maxW={{ base: "96", xl: "64" }}
        >
          Eliminate planning anxiety once and for all
        </MotionHeading>
        <MotionBox
          mt={{ base: 14, xl: 0 }}
          borderRadius={"xl"}
          overflow={"hidden"}
          style={{
            opacity,
          }}
          maxH={"800"}
        >
          <Image
            src={IphoneImage}
            alt="phone app"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </MotionBox>
      </Stack>
    </>
  );
}
