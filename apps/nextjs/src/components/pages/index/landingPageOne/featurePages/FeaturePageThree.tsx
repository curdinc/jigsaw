import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useTransform, type MotionValue } from "framer-motion";

import { MotionBox } from "~/components/motion/MotionBox";
import { MotionHeading } from "~/components/motion/MotionHeading";
import Calendar from "~/../public/homepage/calendar.svg";

export function FeaturePageThree({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.4, 0.7, 1], [0, 1, 1, 1]);

  return (
    <Box p={{ base: 8, lg: 16 }}>
      <MotionHeading
        lineHeight={{ base: "10", lg: "1.1em" }}
        fontSize={{ base: "4xl", lg: "6xl" }}
        fontWeight={"bold"}
        style={{
          opacity,
        }}
      >
        Powered By Google Calendar. Expect nothing less.
      </MotionHeading>
      <MotionBox
        mt={14}
        borderRadius={"xl"}
        overflow={"hidden"}
        style={{
          opacity,
        }}
      >
        <Image src={Calendar} alt="calendar" />
      </MotionBox>
    </Box>
  );
}
