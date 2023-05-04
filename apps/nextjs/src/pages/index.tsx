import { useEffect, useState } from "react";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { HiPuzzlePiece } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { z } from "zod";

import { HomePageViewer } from "~/components/home/HomePageViewer";
import CheckoutForm from "~/components/stripe/CheckoutForm";
import { env } from "~/env.mjs";
import BottomLeftBlob from "../../public/homepage/blob-bottom-left.svg";
import TopRightBlob from "../../public/homepage/blob-top-right.svg";

const Home: NextPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const {
    isOpen: isOpenPaymentModal,
    onOpen: onOpenPaymentModal,
    onClose: onClosePaymentModal,
  } = useDisclosure();

  const createPaymentIntent = async () => {
    console.log("clicked");
    const stripePromise = await loadStripe(
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (stripePromise === null) {
      throw new Error("Invalid stripe promise.");
    }
    setStripePromise(stripePromise);

    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = z
      .object({ clientSecret: z.string() })
      .parse(await response.json());

    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    if (clientSecret !== "") {
      onOpenPaymentModal();
    }
  }, [clientSecret, onOpenPaymentModal]);

  const [pageNumber, setPageNumber] = useState(1);

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
                mx={{ base: "auto", lg: "0" }}
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
              <Button
                disabled={true}
                onClick={() => {
                  createPaymentIntent()
                    .then(() => {
                      // handle successful completion of asynchronous operation
                    })
                    .catch(() => {
                      // handle error from asynchronous operation
                    });
                }}
                mt={"12"}
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
                Pages {pageNumber}/4
              </Heading>
            </Flex>
          </Box>
        </GridItem>

        <HomePageViewer setPageNumber={setPageNumber} />
      </Grid>
      {clientSecret !== "" ? (
        <Modal isOpen={isOpenPaymentModal} onClose={onClosePaymentModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Checkout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Elements
                options={{ clientSecret, appearance: { theme: "stripe" } }}
                stripe={stripePromise}
              >
                <CheckoutForm />
              </Elements>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
