import Head from "next/head";
import Image from "next/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import MailingList from "~/components/MailingList";
import IphoneImage from "~/../public/homepage/jigsaw-phone.svg";

export const LandingPageTwo = () => {
  return (
    <>
      <Head>
        <title>PieceWise Planner</title>
        <meta
          name="description"
          content="Piecewise Planner. Schedule everything. Don't miss a task"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        p={10}
        direction={{ base: "column", md: "row" }}
        spacing={20}
        minH={"100vh"}
        w="full"
        h="full"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Box>
            <Heading fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}>
              Schedule{" "}
              <Box as="span" color="brandPrimary">
                everything.
              </Box>
            </Heading>
            <Heading
              fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              mt={{ base: 2, lg: 2 }}
            >
              <Box as="span" color="brandPrimary">
                Never miss
              </Box>{" "}
              a task.
            </Heading>
            <Text
              mt={{ base: 4, lg: 8 }}
              maxW={{ base: "md", lg: "lg" }}
              fontSize={{ base: "medium", lg: "xl" }}
            >
              We developed Eva, your personal scheduling agent to handle the
              logistics of your day-to-day tasks.
            </Text>
          </Box>
          <Box mt={{ base: 20, md: 24, lg: 32 }}>
            <MailingList />
          </Box>
        </Box>
        <Box>
          <Image
            priority
            src={IphoneImage}
            alt="jigsaw phone"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </Box>
      </Stack>
    </>
  );
};
