import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { useTransform, type MotionValue } from "framer-motion";

import { MotionBox } from "~/components/motion/MotionBox";
import { MotionHeading } from "~/components/motion/MotionHeading";
import SpeakerImage from "~/../public/homepage/speaker.webp";

export function FeaturePageOne({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent={{ base: "flex-end", lg: "space-between" }}
      h="full"
    >
      <MotionHeading
        pt={{ base: 24, lg: "36" }}
        px={{ base: 6, lg: 16 }}
        lineHeight={{ base: "10", lg: "1.3em" }}
        textAlign={"center"}
        fontSize={{ base: "4xl", lg: "6xl" }}
        fontWeight={"bold"}
        style={{
          opacity,
        }}
      >
        Focus on the things you want to do most
      </MotionHeading>
      <MotionBox
        mt={{ base: 20, lg: 24 }}
        borderRadius={"xl"}
        overflow={"hidden"}
        style={{
          opacity,
        }}
      >
        <Image src={SpeakerImage} alt="Speakers" />
      </MotionBox>
    </Flex>
  );
}
