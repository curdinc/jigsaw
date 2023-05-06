import { useTransform, type MotionValue } from "framer-motion";
import { IoChevronDownOutline } from "react-icons/io5";

import { MotionBox } from "~/components/motion/MotionBox";
import { MotionHeading } from "~/components/motion/MotionHeading";

export const ScrollMore = ({ progress }: { progress: MotionValue<number> }) => {
  const bgOpacity = useTransform(progress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    [0, 0.7, 0.7, 0],
  );

  return (
    <MotionBox
      h="full"
      w="full"
      bg="black"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        opacity: bgOpacity,
        flexDirection: "column",
      }}
    >
      <MotionHeading
        textAlign={"center"}
        mb={5}
        fontSize={{ lg: "3xl" }}
        color={"brandPrimary"}
        style={{
          opacity: textOpacity,
        }}
      >
        Find out more{" "}
      </MotionHeading>
      <MotionBox
        style={{
          opacity: textOpacity,
        }}
      >
        <IoChevronDownOutline size={50} opacity={0.5} />
      </MotionBox>
    </MotionBox>
  );
};
