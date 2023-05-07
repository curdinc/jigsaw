import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { HiPuzzlePiece } from "react-icons/hi2";

import MailingList from "~/components/MailingList";
import BottomLeftBlob from "~/../public/homepage/blob-bottom-left.svg";
import TopRightBlob from "~/../public/homepage/blob-top-right.svg";
import { FeaturePageViewer } from "./featurePages/FeaturePageViewer";

const LandingPageOne: NextPage = () => {
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
      <Grid
        as={"main"}
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(12, 1fr)" }}
      >
        {/* This is a filler for desktop view so that we can have fix sidebar */}
        <GridItem
          colSpan={{ base: "auto", lg: 7 }}
          h={{ base: "full", lg: "100vh" }}
          maxH={{ base: "inherit", lg: "100vh" }}
        >
          <Box
            position={{ base: "inherit", lg: "fixed" }}
            top={0}
            left={0}
            right={"42%"}
            // position={{ base: "relative", lg: "fixed" }}
            w="inherit"
            py={8}
            px={{ base: 8, lg: 14 }}
            h="full"
            maxH="100vh"
          >
            <Image
              src={TopRightBlob}
              alt="decorative background blob top right"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
            <Image
              src={BottomLeftBlob}
              alt="decorative background blob bottom left"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            />
            <Flex as="nav" justify={"space-between"} alignItems="center">
              <Flex alignItems={"center"}>
                <HiPuzzlePiece size={30} />
                <Heading
                  letterSpacing={"widest"}
                  fontWeight={"normal"}
                  fontSize={"xl"}
                  ml={2}
                >
                  Piecewise Planner
                </Heading>
              </Flex>
            </Flex>

            <Flex
              direction={"column"}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Heading
                pt={{ base: "20", sm: "32", lg: "48" }}
                fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              >
                Schedule{" "}
                <Box as="span" color="brandPrimary">
                  everything.
                </Box>
              </Heading>
              <Heading
                fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
                mt={{ base: 3, lg: 5 }}
              >
                <Box as="span" color="brandPrimary">
                  Never miss
                </Box>{" "}
                a task.
              </Heading>
              <Text
                mt={{ base: 12, lg: 14 }}
                maxW={{ base: "md", lg: "lg" }}
                fontSize={{ base: "medium", lg: "xl" }}
              >
                We developed Eva, your personal scheduling agent to handle the
                logistics of your day-to-day tasks.
              </Text>
              <Text
                mt={"5"}
                maxW={{ base: "md", lg: "lg" }}
                mx={{ base: "auto", lg: "0" }}
                fontSize={{ base: "medium", lg: "xl" }}
              >
                Navigate your day stress-free while Eva helps you stay on track.
                No more missed deadlines and no more running late. Eva adapts to
                your schedule .
              </Text>
              <Box mt={20} w="full" maxW="lg">
                <MailingList />
              </Box>
            </Flex>
          </Box>
        </GridItem>

        <FeaturePageViewer />
      </Grid>
    </>
  );
};

export default LandingPageOne;
