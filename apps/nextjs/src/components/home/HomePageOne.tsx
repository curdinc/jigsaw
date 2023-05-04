import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { useTransform, type MotionValue } from "framer-motion";

import SpeakerImage from "../../../public/homepage/speaker.webp";
import { MotionBox } from "../motion/MotionBox";
import { MotionHeading } from "../motion/MotionHeading";

export function HomePageOne({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);

  return (
    <Flex direction="column" alignItems="center" h="full">
      <MotionHeading
        pt={"36"}
        px={16}
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
        mt={{ base: 14, lg: 24 }}
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
