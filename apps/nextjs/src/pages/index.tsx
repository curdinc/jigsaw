import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import { HiPuzzlePiece } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";

import { api } from "~/utils/api";
import BottomLeftBlob from "../../public/homepage/blob-bottom-left.svg";
import TopRightBlob from "../../public/homepage/blob-top-right.svg";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PieceWise Planner</title>
        <meta name="description" content="Piecewise planner landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        as={"main"}
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(10, 1fr)" }}
        templateRows={"1"}
        minH="100vh"
      >
        <GridItem
          colSpan={{ base: "auto", lg: 6 }}
          h="full"
          position={"relative"}
          py={5}
          px={10}
        >
          <Image
            priority
            src={TopRightBlob}
            alt="decorative background blob top right"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
          <Image
            priority
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

          <Box textAlign={{ base: "center", lg: "start" }}>
            <Heading
              pt={{ base: "24", sm: "32", lg: "48" }}
              fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
            >
              Don&apos;t Waste Time.
            </Heading>
            <Heading fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}>
              Plan Your day{" "}
              <Box as="span" color="brandPrimary">
                Effortlessly.
              </Box>
            </Heading>
            <Text
              mt={"8"}
              maxW={{ base: "md", lg: "lg" }}
              mx={{ base: "auto", lg: "0" }}
              fontSize={{ base: "medium", lg: "xl" }}
            >
              We provide you the assistant you need to plan your day. Stay on
              track and be realistic with your time. No more going over time and
              stressing out. Get 3 hours back every single week.
            </Text>
            <Button
              mt={"8"}
              w="fit-content"
              rounded="full"
              leftIcon={<IoTimeOutline />}
              colorScheme={"brand"}
              size={{ base: "md", lg: "lg" }}
              p={6}
            >
              10x your productivity
            </Button>
            <Heading
              display={{ base: "none", lg: "block" }}
              position={"absolute"}
              color={"brandPrimary"}
              opacity={0.1}
              right={-210}
              top={"calc(60%)"}
              p={0}
              m={0}
              fontSize={"8xl"}
              transform={"rotate(-90deg)"}
              letterSpacing={"widest"}
              textTransform={"uppercase"}
            >
              Pages 1/4
            </Heading>
          </Box>
        </GridItem>
        <GridItem
          h="full"
          colSpan={{ base: "auto", lg: 4 }}
          bg="brandPrimary"
        />
      </Grid>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: session } = api.auth.getSession.useQuery();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: !!session?.user },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-white">
          {session && <span>Logged in as {session?.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => void signOut() : () => void signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
